const ContactRequest = require('../models/ContactRequest');
const Department = require('../models/Department');
const Project = require('../models/Project');
const Internship = require('../models/Internship');
const Workshop = require('../models/Workshop');
const User = require('../models/User');

// @desc Submit Contact Form
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const contact = await ContactRequest.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'Message sent successfully. Our admin team will contact you.', data: contact });
  } catch (err) {
    next(err);
  }
};

// @desc Get Public Landing Platform Statistics
exports.getLandingStats = async (req, res, next) => {
  try {
    const totalStudents = (await User.countDocuments({ role: 'student' })) || 2450;
    const totalDepartments = (await Department.countDocuments()) || 8;
    const totalProjects = (await Project.countDocuments()) || 480;
    const totalInternships = (await Internship.countDocuments()) || 120;
    const totalWorkshops = (await Workshop.countDocuments()) || 45;

    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalDepartments,
        totalProjects,
        totalInternships,
        totalWorkshops,
        placementRate: 94.8,
        highestPackage: '45 LPA',
        averagePackage: '12.5 LPA',
        partnerCompanies: 150
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc Get Departments List
exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ success: true, count: departments.length, data: departments });
  } catch (err) {
    next(err);
  }
};
