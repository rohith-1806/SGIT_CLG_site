const mongoose = require('mongoose');

const youtubeResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      'Java', 'Python', 'C', 'C++', 'JavaScript', 'React', 'Node.js', 
      'SQL', 'DSA', 'AI', 'ML', 'Data Science', 'Cloud', 'Cyber Security', 
      'GitHub', 'Placement Preparation'
    ]
  },
  youtubeUrl: { type: String, required: true },
  youtubeId: { type: String, required: true },
  channel: { type: String, default: 'SGIT Technical Cell' },
  duration: { type: String, default: '1h 30m' },
  description: { type: String, default: 'Master technical concepts with guided tutorials.' },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' }
}, { timestamps: true });

module.exports = mongoose.model('YouTubeResource', youtubeResourceSchema);
