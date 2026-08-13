const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speaker: { type: String, required: true },
  speakerRole: { type: String, default: 'Senior Staff Engineer' },
  category: { type: String, default: 'Web Development' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, default: 'Main Auditorium & Live Stream' },
  description: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80' },
  capacity: { type: Number, default: 200 },
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('Workshop', workshopSchema);
