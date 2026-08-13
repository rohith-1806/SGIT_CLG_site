const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Major', 'Minor', 'Mini', 'Research'], default: 'Major' },
  department: { type: String, required: true },
  abstract: { type: String, required: true },
  techStack: [{ type: String }],
  githubUrl: { type: String, default: '' },
  liveDemoUrl: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  authorName: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  featured: { type: Boolean, default: false },
  stars: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
