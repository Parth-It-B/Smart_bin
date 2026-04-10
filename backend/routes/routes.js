import express from 'express';
import { getOptimizedRoute } from '../controllers/binController.js';

const router = express.Router();

/**
 * AI Route Optimization
 */

// GET /api/route - Get optimized collection route
router.get('/', getOptimizedRoute);

export default router;
