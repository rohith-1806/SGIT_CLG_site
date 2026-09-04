const CMSContent = require('../models/CMSContent');

// @desc    Get all CMS sections or specific section
// @route   GET /api/cms/content or GET /api/cms/content/:sectionKey
// @access  Public
exports.getCMSContent = async (req, res, next) => {
  try {
    const { sectionKey } = req.params;
    if (sectionKey) {
      const content = await CMSContent.findOne({ sectionKey });
      return res.status(200).json({ success: true, content: content || {} });
    }

    const sections = await CMSContent.find({});
    const contentMap = {};
    sections.forEach(item => {
      contentMap[item.sectionKey] = item;
    });

    res.status(200).json({ success: true, sections: contentMap });
  } catch (err) {
    next(err);
  }
};

// @desc    Update CMS section content
// @route   PUT /api/cms/content/:sectionKey
// @access  Private (Super Admin Only)
exports.updateCMSContent = async (req, res, next) => {
  try {
    const { sectionKey } = req.params;
    const updateData = req.body;
    updateData.lastUpdatedBy = req.user ? req.user.email : 'Super Admin';

    const content = await CMSContent.findOneAndUpdate(
      { sectionKey },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: `CMS Section '${sectionKey}' updated successfully`,
      content
    });
  } catch (err) {
    next(err);
  }
};
