const TechnicalSkill = require('../models/TechnicalSkill');

// @desc Get technical skills & roadmaps
exports.getSkills = async (req, res, next) => {
  try {
    const skills = await TechnicalSkill.find().sort({ title: 1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (err) {
    next(err);
  }
};

// @desc Create Technical Skill Resource
exports.createSkill = async (req, res, next) => {
  try {
    const skill = await TechnicalSkill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    next(err);
  }
};
