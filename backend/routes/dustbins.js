import express from 'express';
import { addDustbin } from '../controllers/dustbinController.js';

const router = express.Router();

// POST /api/dustbins - Add a new dustbin
router.post('/', addDustbin);

export default router;