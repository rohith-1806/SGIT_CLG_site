const Internship = require('../models/Internship');

// @desc Get all internships (Public / Protected)
exports.getInternships = async (req, res, next) => {
  try {
    const internships = await Internship.find({ status: 'Active' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: internships.length, data: internships });
  } catch (err) {
    next(err);
  }
};

// @desc Create Internship (Admin / Super Admin)
exports.createInternship = async (req, res, next) => {
  try {
    const internship = await Internship.create(req.body);
    res.status(201).json({ success: true, data: internship });
  } catch (err) {
    next(err);
  }
};

// @desc Delete Internship
exports.deleteInternship = async (req, res, next) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Internship listing removed' });
  } catch (err) {
    next(err);
  }
};
