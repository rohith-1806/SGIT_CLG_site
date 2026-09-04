/**
 * SGIT Autonomous Grading System Utility
 * Implements SGIT grade point mapping, SGPA calculation, CGPA credit-weighting, and Degree Class determination.
 */

// Default SGIT Grading System Rules
const DEFAULT_GRADING_RULES = [
  { minMarks: 90, maxMarks: 100, grade: 'S', gradePoint: 10, label: 'Superior' },
  { minMarks: 80, maxMarks: 89.99, grade: 'A', gradePoint: 9, label: 'Excellent' },
  { minMarks: 70, maxMarks: 79.99, grade: 'B', gradePoint: 8, label: 'Very Good' },
  { minMarks: 60, maxMarks: 69.99, grade: 'C', gradePoint: 7, label: 'Good' },
  { minMarks: 50, maxMarks: 59.99, grade: 'D', gradePoint: 6, label: 'Average' },
  { minMarks: 40, maxMarks: 49.99, grade: 'E', gradePoint: 5, label: 'Pass' },
  { minMarks: 0,  maxMarks: 39.99, grade: 'F', gradePoint: 0, label: 'Fail' }
];

// Default SGIT Degree Class Thresholds
const DEFAULT_CLASS_THRESHOLDS = {
  distinction: 7.5,
  firstClass: 6.5,
  secondClass: 5.5,
  passClass: 5.0
};

/**
 * Determine Grade and Grade Point for a given score/marks
 */
const calculateGrade = (marksInput, customRules = null) => {
  if (marksInput === 'Ab' || marksInput === 'absent' || marksInput === 'ABSENT' || marksInput === null || marksInput === undefined) {
    return { grade: 'Ab', gradePoint: 0, label: 'Absent' };
  }

  const numMarks = parseFloat(marksInput);
  if (isNaN(numMarks)) {
    return { grade: 'Ab', gradePoint: 0, label: 'Absent' };
  }

  const rules = customRules || DEFAULT_GRADING_RULES;

  for (const rule of rules) {
    if (numMarks >= rule.minMarks && numMarks <= rule.maxMarks) {
      return { grade: rule.grade, gradePoint: rule.gradePoint, label: rule.label };
    }
  }

  if (numMarks >= 90) return { grade: 'S', gradePoint: 10, label: 'Superior' };
  return { grade: 'F', gradePoint: 0, label: 'Fail' };
};

/**
 * Calculate SGPA for a list of subjects
 * SGPA = Σ(Credit × Grade Point) / Σ(Credits)
 */
const calculateSGPA = (subjects = [], customRules = null) => {
  if (!Array.isArray(subjects) || subjects.length === 0) {
    return { sgpa: 0, totalCredits: 0, totalCreditPoints: 0, processedSubjects: [] };
  }

  let totalCredits = 0;
  let totalCreditPoints = 0;

  const processedSubjects = subjects.map(sub => {
    const credits = parseFloat(sub.credits) || 0;
    const { grade, gradePoint } = calculateGrade(sub.marks, customRules);
    const creditPoints = credits * gradePoint;

    totalCredits += credits;
    totalCreditPoints += creditPoints;

    return {
      ...sub,
      credits,
      grade,
      gradePoint,
      creditPoints: parseFloat(creditPoints.toFixed(2))
    };
  });

  const sgpa = totalCredits > 0 ? parseFloat((totalCreditPoints / totalCredits).toFixed(2)) : 0;

  return {
    sgpa,
    totalCredits,
    totalCreditPoints: parseFloat(totalCreditPoints.toFixed(2)),
    processedSubjects
  };
};

/**
 * Calculate CGPA across all completed semesters
 * CGPA = Σ(Semester Credits × Semester SGPA) / Σ(Semester Credits)
 * OR equivalently Σ(Credit × Grade Point) / Σ(Credits)
 */
const calculateCGPA = (semesters = [], customRules = null) => {
  if (!Array.isArray(semesters) || semesters.length === 0) {
    return { cgpa: 0, completedCredits: 0, degreeClass: 'Below Pass Class Threshold', academicStanding: 'Needs Improvement' };
  }

  let totalSemesterWeightedPoints = 0;
  let totalCompletedCredits = 0;

  const updatedSemesters = semesters.map(sem => {
    const { sgpa, totalCredits, processedSubjects } = calculateSGPA(sem.subjects, customRules);
    const semesterCredits = sem.semesterCredits > 0 ? sem.semesterCredits : totalCredits;
    const semesterSGPA = sem.semesterSGPA !== undefined && sem.semesterSGPA !== null ? sem.semesterSGPA : sgpa;

    totalCompletedCredits += semesterCredits;
    totalSemesterWeightedPoints += (semesterCredits * semesterSGPA);

    return {
      ...sem,
      semesterCredits,
      semesterSGPA,
      subjects: processedSubjects
    };
  });

  const cgpa = totalCompletedCredits > 0 
    ? parseFloat((totalSemesterWeightedPoints / totalCompletedCredits).toFixed(2)) 
    : 0;

  const degreeClass = getDegreeClass(cgpa);
  const academicStanding = getAcademicStanding(cgpa);

  return {
    cgpa,
    completedCredits: totalCompletedCredits,
    degreeClass,
    academicStanding,
    semesters: updatedSemesters
  };
};

/**
 * Determine Degree Class Award based on SGIT CGPA thresholds
 */
const getDegreeClass = (cgpa, customThresholds = null) => {
  const t = customThresholds || DEFAULT_CLASS_THRESHOLDS;
  const numCgpa = parseFloat(cgpa) || 0;

  if (numCgpa >= t.distinction) {
    return 'First Class with Distinction';
  } else if (numCgpa >= t.firstClass) {
    return 'First Class';
  } else if (numCgpa >= t.secondClass) {
    return 'Second Class';
  } else if (numCgpa >= t.passClass) {
    return 'Pass Class';
  } else {
    return 'Below Pass Class Threshold';
  }
};

/**
 * Determine Academic Standing Label
 */
const getAcademicStanding = (cgpa) => {
  const numCgpa = parseFloat(cgpa) || 0;
  if (numCgpa >= 8.5) return 'Outstanding';
  if (numCgpa >= 7.5) return 'Excellent';
  if (numCgpa >= 6.5) return 'Very Good';
  if (numCgpa >= 5.5) return 'Good';
  if (numCgpa >= 5.0) return 'Satisfactory';
  return 'Academic Warning';
};

module.exports = {
  DEFAULT_GRADING_RULES,
  DEFAULT_CLASS_THRESHOLDS,
  calculateGrade,
  calculateSGPA,
  calculateCGPA,
  getDegreeClass,
  getAcademicStanding
};
