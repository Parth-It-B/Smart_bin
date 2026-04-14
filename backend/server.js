import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createDummyBins } from './utils/dummyData.js';

// Import routes
import binsRoutes from './routes/bins.js';
import dustbinsRoutes from './routes/dustbins.js';
import routesRoutes from './routes/routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/smart-waste-management';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * MONGODB CONNECTION
 */
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  });

/**
 * API ROUTES
 */

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Bins endpoints
app.use('/api/bins', binsRoutes);

// Dustbin registration endpoints
app.use('/api/dustbins', dustbinsRoutes);

// Route optimization endpoint
app.use('/api/route', routesRoutes);

/**
 * INITIALIZATION ROUTE
 */

// POST /api/init - Initialize database with dummy data
app.post('/api/init', async (req, res) => {
  try {
    await createDummyBins();
    res.json({
      success: true,
      message: 'Database initialized with dummy data',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error initializing database',
      error: error.message,
    });
  }
});

/**
 * ERROR HANDLING
 */

// 404 Not Found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.path,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message,
  });
});

/**
 * START SERVER
 */
app.listen(PORT, () => {
  console.log('\n');
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  Smart Waste Management System - Backend  ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('\n');
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📊 Database: ${MONGO_URI}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('\n');
  console.log('📚 Available Endpoints:');
  console.log('   GET  /api/health              - Health check');
  console.log('   POST /api/bins                - Add bin data');
  console.log('   GET  /api/bins                - Get all bins');
  console.log('   GET  /api/bins/stats          - Get dashboard stats');
  console.log('   GET  /api/bins/full           - Get full bins');
  console.log('   GET  /api/route               - Get optimized route');
  console.log('   POST /api/init                - Initialize with dummy data');
  console.log('\n');
});

export default app;
