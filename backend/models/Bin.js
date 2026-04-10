import mongoose from 'mongoose';

/**
 * Bin Schema for Smart Waste Management System
 * Represents an IoT smart dustbin with location and fill level
 */
const binSchema = new mongoose.Schema({
  bin_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fill_level: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['empty', 'half-full', 'full'],
    default: 'empty',
  },
  last_emptied: {
    type: Date,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Index for efficient real-time queries
binSchema.index({ fill_level: -1 });
binSchema.index({ timestamp: -1 });

const Bin = mongoose.model('Bin', binSchema);

export default Bin;
