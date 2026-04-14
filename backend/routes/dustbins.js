import express from 'express';
import {
  registerDustbin,
  getAllDustbins,
  getDustbinById,
  deleteDustbin,
} from '../controllers/dustbinController.js';

const router = express.Router();

/**
 * Dustbin Registration Routes
 * For IoT device registration and dustbin management
 */

// POST /api/dustbins - Register new dustbin
router.post('/', registerDustbin);

// GET /api/dustbins - Get all registered dustbins
router.get('/', getAllDustbins);

// GET /api/dustbins/:bin_id - Get specific dustbin
router.get('/:bin_id', getDustbinById);

// DELETE /api/dustbins/:bin_id - Delete dustbin
router.delete('/:bin_id', deleteDustbin);

export default router;
