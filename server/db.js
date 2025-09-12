import mongoose from 'mongoose';
import config from './src/config/index.js';

const connectDB = async () => {
  try {
    // MongoDB 6+ doesn't need useNewUrlParser and useUnifiedTopology
    await mongoose.connect(config.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Continuing without database connection. Some features may not work.');
    // Don't exit the process, allow the server to run without DB
    // process.exit(1);
  }
};

export default connectDB;