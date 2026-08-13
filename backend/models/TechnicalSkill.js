const mongoose = require('mongoose');

const technicalSkillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // Full Stack, AI & ML, Cloud, DevOps, Cyber Security
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  description: { type: String, required: true },
  icon: { type: String, default: 'Code' },
  roadmapSteps: [{
    stepNumber: Number,
    title: String,
    details: String
  }],
  youtubeVideos: [{
    title: String,
    url: String,
    channel: String,
    duration: String,
    thumbnail: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('TechnicalSkill', technicalSkillSchema);
