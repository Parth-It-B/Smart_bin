import mongoose from 'mongoose';

/**
 * Bin Schema for Smart Waste Management System
 * Represents an IoT smart dustbin with location and fill level
 */
const binSchema = new mongoose.Schema({
  bin_id: {
    type: String,
    required: true,
    unique: true
  },
  ward: String,
  area: String,
  device_key: String,
  fill_level: {
    type: Number,
    default: 0
  },
  lat: Number,
  lng: Number,
  last_updated: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient real-time queries
binSchema.index({ fill_level: -1 });
binSchema.index({ timestamp: -1 });

const Bin = mongoose.model('Bin', binSchema);

export default Bin;
