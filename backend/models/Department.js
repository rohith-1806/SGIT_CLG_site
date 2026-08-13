const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  description: { type: String, default: '' },
  headOfDepartment: { type: String, default: 'Dr. Robert Harrison' },
  studentCount: { type: Number, default: 0 },
  facultyCount: { type: Number, default: 0 },
  placementRate: { type: Number, default: 92 },
  icon: { type: String, default: 'Cpu' }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
