const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    // In demo / fallback mode, log warning so app can continue with memory mock DB if mongo is offline
    console.log('[Database Warning] Continuing server initialization with memory fallback mode if MongoDB unavailable.');
  }
};

module.exports = connectDB;
