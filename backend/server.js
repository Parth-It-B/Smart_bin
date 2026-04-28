import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import axios from 'axios';

import Bin from './models/Bin.js';
import { createDummyBins } from './utils/dummyData.js';

// Import routes
import binsRoutes from './routes/bins.js';
import routesRoutes from './routes/routes.js';
import dustbinsRoutes from './routes/dustbins.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://localhost:27017/smart-waste-management';

// Blynk Config
const BLYNK_TOKEN = 'VZ77pbgtJ7GEe10ljvgHWy9k5dOekDUD';
const BIN_ID = 'NWY3MXHR0';
const BLYNK_PIN = 'v0';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * MongoDB Connection
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

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Main Routes
app.use('/api/bins', binsRoutes);
app.use('/api/dustbins', dustbinsRoutes);
app.use('/api/route', routesRoutes);

/**
 * Demo Initialization
 */
app.post('/api/init', async (req, res) => {
  try {
    if (
      process.env.NODE_ENV === 'production' &&
      process.env.ENABLE_DEMO_INIT !== 'true'
    ) {
      return res.status(403).json({
        success: false,
        message:
          'Demo initialization disabled in production.',
      });
    }

    const existingCount = await Bin.countDocuments();

    if (existingCount > 0) {
      return res.status(200).json({
        success: true,
        message: 'Database already has data.',
        existingBins: existingCount,
      });
    }

    await createDummyBins();

    res.json({
      success: true,
      message: 'Dummy data inserted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Initialization failed',
      error: error.message,
    });
  }
});

/**
 * BLYNK LIVE DATA SYNC
 */
async function syncBlynkData() {
  try {
    const url =
      `https://blynk.cloud/external/api/get?token=${BLYNK_TOKEN}&${BLYNK_PIN}`;

    const response = await axios.get(url);

    const fillLevel = Number(response.data);

    console.log('📡 Blynk Reading:', fillLevel);

    await Bin.findOneAndUpdate(
      { bin_id: BIN_ID },
      {
        bin_id: BIN_ID,
        fill_level: fillLevel,
        area: 'Chembur',
        lat: 19.0522,
        lng: 72.9005,
        updatedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
      }
    );
  } catch (error) {
    console.log('❌ Blynk Error:', error.message);
  }
}

// Fetch Blynk every 5 sec
setInterval(syncBlynkData, 5000);

/**
 * ERROR HANDLING
 */

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.path,
  });
});

// Global Error
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
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('📊 MongoDB Connected');
  console.log('📡 Blynk Sync Active (5 sec)');
  console.log('\n');
});

export default app;