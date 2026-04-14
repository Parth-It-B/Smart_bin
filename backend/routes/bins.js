import express from 'express';
import {
  updateBin,
  getAllBins,
  getFullBins,
  getOptimizedRoute,
  getDashboardStats,
  clearBin,
} from '../controllers/binController.js';

const router = express.Router();

/**
 * Bin Update Routes
 * For real-time sensor data updates and bin management
 */

// POST /api/bins - Update bin with device_key authentication
router.post('/', updateBin);

// GET /api/bins - Get all bins
router.get('/', getAllBins);

// GET /api/bins/stats - Get dashboard statistics
router.get('/stats', getDashboardStats);

// GET /api/bins/full - Get full bins (fill_level > 80)
router.get('/full', getFullBins);

// GET /api/route - Get optimized collection route
router.get('/route', getOptimizedRoute);

// DELETE /api/bins/:bin_id - Clear a bin
router.delete('/:bin_id', clearBin);

export default router;
