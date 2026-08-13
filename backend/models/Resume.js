const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, default: 'Software Engineer Resume' },
  template: { type: String, default: 'modern-glass' }, // modern-glass, executive, minimalist, technical
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    title: String,
    summary: String,
    linkedin: String,
    github: String,
    website: String
  },
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: String,
    endDate: String,
    gpa: String
  }],
  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    highlights: [String]
  }],
  projects: [{
    name: String,
    description: String,
    technologies: String,
    link: String
  }],
  skills: [{
    category: String,
    items: [String]
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
