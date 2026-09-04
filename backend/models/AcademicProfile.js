const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true, trim: true },
  credits: { type: Number, required: true, min: 0 },
  marks: { type: mongoose.Schema.Types.Mixed, default: 0 }, // Number or 'Ab'
  grade: { type: String, default: 'F' },
  gradePoint: { type: Number, default: 0 },
  creditPoints: { type: Number, default: 0 }
});

const semesterSchema = new mongoose.Schema({
  semesterNumber: { type: Number, required: true, min: 1, max: 8 },
  subjects: [subjectSchema],
  semesterCredits: { type: Number, default: 0 },
  semesterSGPA: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

const academicProfileSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  semesters: [semesterSchema],
  cgpa: { type: Number, default: 0 },
  degreeClass: { type: String, default: 'Pass Class' },
  completedCredits: { type: Number, default: 0 },
  academicStanding: { type: String, default: 'Good Standing' }
}, { timestamps: true });

module.exports = mongoose.model('AcademicProfile', academicProfileSchema);
