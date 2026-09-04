const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { 
    type: String, 
    enum: ['superadmin', 'admin', 'student'], 
    default: 'student' 
  },
  department: { type: String, default: 'CSE' },
  enrollmentNo: { type: String, default: '' },
  enrollmentId: { type: String, default: '' },
  year: { type: String, default: '3rd Year' },
  semester: { type: String, default: '6th Semester' },
  careerGoal: { type: String, default: 'Software Developer' },
  phone: { type: String, default: '' },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  bio: { type: String, default: 'Enthusiastic Learner & Aspiring Software Engineer @ SGIT AUTONOMOUS' },
  isVerified: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  otpCode: { type: String, default: null },
  otpExpire: { type: Date, default: null },
  skills: [{ type: String }],
  completedSkills: [{ type: String }],
  completedVideos: [{ type: String }],
  bookmarks: [{ type: String }],
  certifications: [{ type: String }],
  achievements: [{ type: String }],
  nccStatus: { type: String, default: 'Active Cadet' },
  nssStatus: { type: String, default: 'Volunteer' },
  atsScore: { type: Number, default: 78 },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    portfolio: { type: String, default: '' }
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
