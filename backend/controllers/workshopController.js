const Workshop = require('../models/Workshop');

// @desc Get all workshops
exports.getWorkshops = async (req, res, next) => {
  try {
    const workshops = await Workshop.find().populate('registeredStudents', 'name email avatar').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: workshops.length, data: workshops });
  } catch (err) {
    next(err);
  }
};

// @desc Register for workshop (Student)
exports.registerWorkshop = async (req, res, next) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ success: false, error: 'Workshop not found' });
    }

    if (workshop.registeredStudents.includes(req.user.id)) {
      return res.status(400).json({ success: false, error: 'You are already registered for this workshop session' });
    }

    workshop.registeredStudents.push(req.user.id);
    await workshop.save();

    res.status(200).json({ success: true, message: 'Successfully registered for workshop', data: workshop });
  } catch (err) {
    next(err);
  }
};

// @desc Create Workshop (Admin / Super Admin)
exports.createWorkshop = async (req, res, next) => {
  try {
    const workshop = await Workshop.create(req.body);
    res.status(201).json({ success: true, data: workshop });
  } catch (err) {
    next(err);
  }
};
