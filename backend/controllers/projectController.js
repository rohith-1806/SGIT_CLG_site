const Project = require('../models/Project');

// @desc Get all projects
exports.getProjects = async (req, res, next) => {
  try {
    const { type, department } = req.query;
    let query = {};
    if (type) query.type = type;
    if (department) query.department = department;

    const projects = await Project.find(query).sort({ stars: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
};

// @desc Create project submission
exports.createProject = async (req, res, next) => {
  try {
    const projectData = {
      ...req.body,
      authorName: req.user ? req.user.name : req.body.authorName || 'Student Developer',
      authorId: req.user ? req.user.id : null
    };

    const project = await Project.create(projectData);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc Star / Like Project
exports.starProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { stars: 1 } },
      { new: true }
    );
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};
