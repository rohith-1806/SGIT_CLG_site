const YouTubeResource = require('../models/YouTubeResource');

// @desc Get YouTube Learning Resources
// @route GET /api/youtube
// @access Public / Student
exports.getYouTubeResources = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const resources = await YouTubeResource.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (err) {
    next(err);
  }
};

// @desc Create YouTube Resource
// @route POST /api/youtube
// @access Private (Admin / SuperAdmin)
exports.createYouTubeResource = async (req, res, next) => {
  try {
    const { title, category, youtubeUrl, channel, duration, level, description } = req.body;
    
    // Extract YouTube Video ID
    let youtubeId = '';
    if (youtubeUrl.includes('v=')) {
      youtubeId = youtubeUrl.split('v=')[1].split('&')[0];
    } else if (youtubeUrl.includes('youtu.be/')) {
      youtubeId = youtubeUrl.split('youtu.be/')[1].split('?')[0];
    } else {
      youtubeId = youtubeUrl;
    }

    const resource = await YouTubeResource.create({
      title,
      category,
      youtubeUrl,
      youtubeId,
      channel: channel || 'SGIT Learning Cell',
      duration: duration || '1h 00m',
      level: level || 'Beginner',
      description: description || ''
    });

    res.status(201).json({ success: true, data: resource });
  } catch (err) {
    next(err);
  }
};

// @desc Update YouTube Resource
// @route PUT /api/youtube/:id
// @access Private (Admin / SuperAdmin)
exports.updateYouTubeResource = async (req, res, next) => {
  try {
    const resource = await YouTubeResource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }
    res.status(200).json({ success: true, data: resource });
  } catch (err) {
    next(err);
  }
};

// @desc Delete YouTube Resource
// @route DELETE /api/youtube/:id
// @access Private (Admin / SuperAdmin)
exports.deleteYouTubeResource = async (req, res, next) => {
  try {
    const resource = await YouTubeResource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }
    res.status(200).json({ success: true, message: 'YouTube resource removed successfully' });
  } catch (err) {
    next(err);
  }
};
