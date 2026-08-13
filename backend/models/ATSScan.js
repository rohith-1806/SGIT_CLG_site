const mongoose = require('mongoose');

const atsScanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetRole: { type: String, required: true },
  overallScore: { type: Number, required: true }, // 0 to 100
  matchedKeywords: [{ type: String }],
  missingSkills: [{ type: String }],
  formattingScore: { type: Number, default: 85 },
  readabilityScore: { type: Number, default: 90 },
  suggestions: [{ type: String }],
  resumeText: { type: String, default: '' },
  jobDescriptionText: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('ATSScan', atsScanSchema);
