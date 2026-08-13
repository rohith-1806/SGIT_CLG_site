const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'In Progress', 'Resolved'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('ContactRequest', contactRequestSchema);
