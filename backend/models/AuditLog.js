const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  actor: { type: String, required: true },
  role: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
  ipAddress: { type: String, default: '127.0.0.1' },
  status: { type: String, enum: ['SUCCESS', 'FAILED', 'WARNING'], default: 'SUCCESS' }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
