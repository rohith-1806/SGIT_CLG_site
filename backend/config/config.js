const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college_career_lms',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_key_enterprise_college_2026',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '1d',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_jwt_key_2026',
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
