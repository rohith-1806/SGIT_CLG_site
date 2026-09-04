const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    // Disable Mongoose command buffering so queries fail-fast when offline
    mongoose.set('bufferCommands', false);
    const conn = await mongoose.connect(config.MONGO_URI, {
      serverSelectionTimeoutMS: 2500
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Warning] Connection failed: ${error.message}`);
    console.log('[Database Info] Server operating with high-speed in-memory demo authentication fallback.');
  }
};

module.exports = connectDB;
