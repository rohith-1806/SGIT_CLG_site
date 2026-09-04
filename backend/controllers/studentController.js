const User = require('../models/User');
const AcademicProfile = require('../models/AcademicProfile');
const { calculateGrade, calculateSGPA, calculateCGPA } = require('../utils/sgitGrading');

/**
 * GET /api/student/profile
 * Get authenticated student's profile information
 */
exports.getStudentProfile = async (req, res, next) => {
  try {
    const student = await User.findById(req.user._id).select('-password');
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student profile not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/student/profile
 * Update authenticated student's profile information
 */
exports.updateStudentProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = [
      'name', 'phone', 'avatar', 'bio', 'department', 'year', 'semester',
      'enrollmentNo', 'careerGoal', 'skills', 'certifications', 'socialLinks',
      'nccStatus', 'nssStatus', 'achievements'
    ];

    const updateObj = {};
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        updateObj[field] = req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateObj },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Student profile updated successfully',
      data: updatedUser
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/student/academic
 * Fetch student's academic profile & semester records
 */
exports.getAcademicProfile = async (req, res, next) => {
  try {
    let academicProfile = await AcademicProfile.findOne({ studentId: req.user._id });

    if (!academicProfile) {
      // Initialize default 8-semester profile for student if none exists
      const defaultSemesters = Array.from({ length: 8 }, (_, i) => ({
        semesterNumber: i + 1,
        subjects: [],
        semesterCredits: 0,
        semesterSGPA: 0
      }));

      academicProfile = await AcademicProfile.create({
        studentId: req.user._id,
        semesters: defaultSemesters,
        cgpa: 0,
        degreeClass: 'Pass Class',
        completedCredits: 0,
        academicStanding: 'Good Standing'
      });
    }

    res.status(200).json({
      success: true,
      data: academicProfile
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/student/academic/semester
 * Save or update a specific semester's subject & marks data
 */
exports.saveSemesterProgress = async (req, res, next) => {
  try {
    const { semesterNumber, subjects } = req.body;
    const semNum = parseInt(semesterNumber);

    if (!semNum || semNum < 1 || semNum > 8) {
      return res.status(400).json({ success: false, error: 'Invalid semester number (must be 1 to 8)' });
    }

    let profile = await AcademicProfile.findOne({ studentId: req.user._id });
    if (!profile) {
      profile = new AcademicProfile({ studentId: req.user._id, semesters: [] });
    }

    // Calculate SGPA & Processed Subjects for this semester using SGIT grading system
    const { sgpa, totalCredits, processedSubjects } = calculateSGPA(subjects);

    // Find existing semester entry or add new
    const semIndex = profile.semesters.findIndex(s => s.semesterNumber === semNum);
    const newSemData = {
      semesterNumber: semNum,
      subjects: processedSubjects,
      semesterCredits: totalCredits,
      semesterSGPA: sgpa,
      updatedAt: new Date()
    };

    if (semIndex >= 0) {
      profile.semesters[semIndex] = newSemData;
    } else {
      profile.semesters.push(newSemData);
    }

    // Sort semesters by semesterNumber
    profile.semesters.sort((a, b) => a.semesterNumber - b.semesterNumber);

    // Recalculate Overall CGPA & Degree Class
    const cgpaResult = calculateCGPA(profile.semesters);
    profile.cgpa = cgpaResult.cgpa;
    profile.completedCredits = cgpaResult.completedCredits;
    profile.degreeClass = cgpaResult.degreeClass;
    profile.academicStanding = cgpaResult.academicStanding;

    await profile.save();

    res.status(200).json({
      success: true,
      message: `Semester ${semNum} academic progress saved successfully`,
      data: profile
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/student/academic/semester/:semesterId
 * Update specific semester entry
 */
exports.updateSemesterProgress = async (req, res, next) => {
  try {
    const { semesterId } = req.params;
    const { subjects } = req.body;

    let profile = await AcademicProfile.findOne({ studentId: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, error: 'Academic profile not found' });
    }

    const sem = profile.semesters.id(semesterId);
    if (!sem) {
      return res.status(404).json({ success: false, error: 'Semester entry not found' });
    }

    const { sgpa, totalCredits, processedSubjects } = calculateSGPA(subjects);
    sem.subjects = processedSubjects;
    sem.semesterCredits = totalCredits;
    sem.semesterSGPA = sgpa;
    sem.updatedAt = new Date();

    const cgpaResult = calculateCGPA(profile.semesters);
    profile.cgpa = cgpaResult.cgpa;
    profile.completedCredits = cgpaResult.completedCredits;
    profile.degreeClass = cgpaResult.degreeClass;
    profile.academicStanding = cgpaResult.academicStanding;

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Semester updated successfully',
      data: profile
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/student/academic/subject/:subjectId
 * Delete a subject from a semester
 */
exports.deleteSubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    let profile = await AcademicProfile.findOne({ studentId: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, error: 'Academic profile not found' });
    }

    let found = false;
    profile.semesters.forEach(sem => {
      const initialLen = sem.subjects.length;
      sem.subjects = sem.subjects.filter(sub => sub._id.toString() !== subjectId);
      if (sem.subjects.length < initialLen) {
        found = true;
        const { sgpa, totalCredits, processedSubjects } = calculateSGPA(sem.subjects);
        sem.subjects = processedSubjects;
        sem.semesterCredits = totalCredits;
        sem.semesterSGPA = sgpa;
      }
    });

    if (!found) {
      return res.status(404).json({ success: false, error: 'Subject not found in any semester' });
    }

    const cgpaResult = calculateCGPA(profile.semesters);
    profile.cgpa = cgpaResult.cgpa;
    profile.completedCredits = cgpaResult.completedCredits;
    profile.degreeClass = cgpaResult.degreeClass;
    profile.academicStanding = cgpaResult.academicStanding;

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Subject removed and metrics recalculated successfully',
      data: profile
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/student/cgpa
 * Get student's computed CGPA metrics & Degree Class
 */
exports.getCGPAMetrics = async (req, res, next) => {
  try {
    let profile = await AcademicProfile.findOne({ studentId: req.user._id });
    if (!profile) {
      return res.status(200).json({
        success: true,
        data: {
          cgpa: 0,
          currentSGPA: 0,
          completedCredits: 0,
          degreeClass: 'Below Pass Class Threshold',
          academicStanding: 'Satisfactory'
        }
      });
    }

    const lastCompletedSem = profile.semesters
      .filter(s => s.subjects && s.subjects.length > 0)
      .pop();

    res.status(200).json({
      success: true,
      data: {
        cgpa: profile.cgpa,
        currentSGPA: lastCompletedSem ? lastCompletedSem.semesterSGPA : 0,
        completedCredits: profile.completedCredits,
        degreeClass: profile.degreeClass,
        academicStanding: profile.academicStanding,
        semesters: profile.semesters
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/student/cgpa/calculate
 * Calculate & persist CGPA summary
 */
exports.calculateAndSaveCGPA = async (req, res, next) => {
  try {
    let profile = await AcademicProfile.findOne({ studentId: req.user._id });
    if (!profile) {
      profile = new AcademicProfile({ studentId: req.user._id, semesters: [] });
    }

    // If payload contains semester calculations directly
    if (req.body.semesters && Array.isArray(req.body.semesters)) {
      profile.semesters = req.body.semesters;
    }

    const cgpaResult = calculateCGPA(profile.semesters);
    profile.cgpa = cgpaResult.cgpa;
    profile.completedCredits = cgpaResult.completedCredits;
    profile.degreeClass = cgpaResult.degreeClass;
    profile.academicStanding = cgpaResult.academicStanding;

    await profile.save();

    res.status(200).json({
      success: true,
      message: 'CGPA metrics recalculated and saved successfully',
      data: {
        cgpa: profile.cgpa,
        degreeClass: profile.degreeClass,
        completedCredits: profile.completedCredits,
        academicStanding: profile.academicStanding,
        semesters: profile.semesters
      }
    });
  } catch (err) {
    next(err);
  }
};
