import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db.js';
// Import routes directly with a different name to debug
import apiRoutes from './src/routes/auth.route.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow your client's origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes - Debug the import
console.log('API Routes type:', typeof apiRoutes);
console.log('API Routes value:', apiRoutes);

// Check if routes is a router object
if (apiRoutes && typeof apiRoutes === 'function') {
  app.use('/api', apiRoutes);
} else {
  // Create a simple router if the import failed
  const fallbackRouter = express.Router();
  fallbackRouter.get('/status', (req, res) => {
    res.json({ status: 'API is running - fallback router' });
  });
  app.use('/api', fallbackRouter);
  console.log('Using fallback router due to invalid imported routes');
}

// Add a test route as well
const testRouter = express.Router();
testRouter.get('/test', (req, res) => {
  res.json({ message: 'Test route works' });
});
app.use('/api-test', testRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  // server.close(() => process.exit(1));
});

export default app;