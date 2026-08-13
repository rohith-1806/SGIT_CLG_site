const Resume = require('../models/Resume');

// @desc    Get user resumes
// @route   GET /api/resumes
// @access  Private
exports.getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, count: resumes.length, data: resumes });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ success: false, error: 'Resume document not found' });
    }
    res.status(200).json({ success: true, data: resume });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
exports.createResume = async (req, res, next) => {
  try {
    const resumeData = { ...req.body, userId: req.user.id };
    const resume = await Resume.create(resumeData);
    res.status(201).json({ success: true, data: resume });
  } catch (err) {
    next(err);
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
exports.updateResume = async (req, res, next) => {
  try {
    let resume = await Resume.findOne({ _id: req.params.id, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ success: false, error: 'Resume document not found' });
    }

    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: resume });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!resume) {
      return res.status(404).json({ success: false, error: 'Resume document not found' });
    }
    res.status(200).json({ success: true, message: 'Resume deleted successfully' });
  } catch (err) {
    next(err);
  }
};
