const mongoose = require('mongoose');

const cmsContentSchema = new mongoose.Schema({
  sectionKey: { type: String, required: true, unique: true }, // e.g. 'hero', 'about', 'faq', 'contact', 'footer', 'announcements'
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  heading: { type: String, default: '' },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  bannerText: { type: String, default: '' },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  lastUpdatedBy: { type: String, default: 'Super Admin' }
}, { timestamps: true });

module.exports = mongoose.model('CMSContent', cmsContentSchema);
