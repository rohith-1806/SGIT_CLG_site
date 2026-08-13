const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['Remote', 'On-Site', 'Hybrid'], default: 'Remote' },
  stipend: { type: String, required: true },
  duration: { type: String, default: '3 Months' },
  eligibility: { type: String, default: 'B.Tech / MCA 3rd & 4th Year' },
  deadline: { type: String, required: true },
  applyUrl: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: [{ type: String }],
  companyLogo: { type: String, default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80' },
  status: { type: String, enum: ['Active', 'Closed'], default: 'Active' },
  applicantsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
