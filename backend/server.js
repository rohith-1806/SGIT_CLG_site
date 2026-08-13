const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const config = require('./config/config');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const seedData = require('./utils/seedData');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const atsRoutes = require('./routes/atsRoutes');
const mockInterviewRoutes = require('./routes/mockInterviewRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const workshopRoutes = require('./routes/workshopRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');

const app = express();

// Connect Database & Seed initial data
connectDB().then(() => {
  seedData();
}).catch(err => {
  console.log('[Server] Database initial seed deferred.');
});

// Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, error: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api/mock-interviews', mockInterviewRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/superadmin', superAdminRoutes);

// Base Health Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'Operational',
    uptime: process.uptime(),
    timestamp: new Date(),
    service: 'Enterprise College Career & LMS Platform Backend API'
  });
});

// Fallback Route Handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, error: 'API Endpoint not found' });
});

// Global Error Handler Middleware
app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 College Career Platform API Running on Port ${PORT}`);
  console.log(`🌍 Environment: ${config.NODE_ENV}`);
  console.log(`=======================================================`);
});
