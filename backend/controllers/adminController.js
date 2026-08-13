const User = require('../models/User');
const Project = require('../models/Project');
const Workshop = require('../models/Workshop');
const Notification = require('../models/Notification');
const AuditLog = require('../models/AuditLog');

// @desc Get Admin Dashboard Stats
exports.getAdminStats = async (req, res, next) => {
  try {
    const studentCount = await User.countDocuments({ role: 'student' });
    const blockedCount = await User.countDocuments({ role: 'student', isBlocked: true });
    const projectCount = await Project.countDocuments();
    const workshopCount = await Workshop.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalStudents: studentCount,
        blockedStudents: blockedCount,
        totalProjects: projectCount,
        totalWorkshops: workshopCount,
        activeCohorts: 12,
        pendingApprovals: 4
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc Get Students List
exports.getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: students.length, data: students });
  } catch (err) {
    next(err);
  }
};

// @desc Create Student
exports.createStudent = async (req, res, next) => {
  try {
    const { name, email, password, department, enrollmentNo } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const student = await User.create({
      name,
      email,
      password: password || 'Student@123',
      role: 'student',
      department,
      enrollmentNo
    });

    await AuditLog.create({
      actor: req.user.email,
      role: req.user.role,
      action: 'CREATE_STUDENT',
      details: `Admin created student profile for ${student.email}`
    });

    res.status(201).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// @desc Toggle Student Block Status
exports.toggleBlockStudent = async (req, res, next) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ success: false, error: 'Student record not found' });
    }

    student.isBlocked = !student.isBlocked;
    await student.save();

    await AuditLog.create({
      actor: req.user.email,
      role: req.user.role,
      action: student.isBlocked ? 'BLOCK_STUDENT' : 'UNBLOCK_STUDENT',
      details: `Admin changed status for ${student.email} to ${student.isBlocked ? 'Blocked' : 'Active'}`
    });

    res.status(200).json({ success: true, message: `Student status updated to ${student.isBlocked ? 'Blocked' : 'Active'}`, data: student });
  } catch (err) {
    next(err);
  }
};

// @desc Send Broadcast Notification
exports.broadcastNotification = async (req, res, next) => {
  try {
    const { title, message, type } = req.body;
    if (!title || !message) {
      return res.status(400).json({ success: false, error: 'Title and message are required' });
    }

    const notification = await Notification.create({
      userId: null, // Broadcast to all
      title,
      message,
      type: type || 'info'
    });

    res.status(201).json({ success: true, message: 'Notification broadcasted to all students', data: notification });
  } catch (err) {
    next(err);
  }
};
