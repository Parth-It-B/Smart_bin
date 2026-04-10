import express from 'express';
import {
  addBin,
  getAllBins,
  getFullBins,
  getOptimizedRoute,
  getDashboardStats,
  clearBin,
} from '../controllers/binController.js';

const router = express.Router();

/**
 * Bin Routes
 */

// POST /api/bins - Add new bin data
router.post('/', addBin);

// GET /api/bins - Get all bins
router.get('/', getAllBins);

// GET /api/bins/stats - Get dashboard statistics
router.get('/stats', getDashboardStats);

// GET /api/bins/full - Get full bins (fill_level > 80)
router.get('/full', getFullBins);

// GET /api/bins/:bin_id - Get specific bin (optional)
router.get('/:bin_id', async (req, res) => {
  try {
    const Bin = (await import('../models/Bin.js')).default;
    const bin = await Bin.findOne({ bin_id: req.params.bin_id });

    if (!bin) {
      return res.status(404).json({
        success: false,
        message: 'Bin not found',
      });
    }

    res.status(200).json({
      success: true,
      data: bin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// DELETE /api/bins/:bin_id - Clear a bin
router.delete('/:bin_id', clearBin);

export default router;
