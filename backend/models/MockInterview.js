const mongoose = require('mongoose');

const mockInterviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['Technical', 'HR', 'System Design', 'Behavioral'], default: 'Technical' },
  overallScore: { type: Number, default: 0 },
  feedback: { type: String, default: '' },
  questions: [{
    questionText: String,
    userAnswer: String,
    score: Number, // 0 - 100
    aiFeedback: String,
    keyTakeaway: String
  }],
  status: { type: String, enum: ['In Progress', 'Completed'], default: 'Completed' }
}, { timestamps: true });

module.exports = mongoose.model('MockInterview', mockInterviewSchema);
