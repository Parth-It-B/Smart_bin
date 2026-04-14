import Bin from '../models/Bin.js';
import crypto from 'crypto';

/**
 * Dustbin Registration Controller
 * Handles IoT dustbin registration with unique ID and device key generation
 */

// Utility function to generate random device key
const generateDeviceKey = () => {
  return crypto.randomBytes(16).toString('hex').toUpperCase();
};

// Utility function to generate bin_id
const generateBinId = async (ward, area) => {
  // Format: MUM-{WARD}-{AREA}-BIN-{count}
  const prefix = `MUM-${ward.toUpperCase()}-${area.toUpperCase()}-BIN-`;
  
  // Count existing bins with this prefix
  const existingBins = await Bin.countDocuments({ bin_id: { $regex: `^${prefix}` } });
  const count = existingBins + 1;
  
  return `${prefix}${String(count).padStart(4, '0')}`;
};

/**
 * POST /api/dustbins
 * Register a new dustbin with automatic bin_id and device_key generation
 */
export const registerDustbin = async (req, res) => {
  try {
    const { ward, area, lat, lng } = req.body;

    // Validate required fields
    if (!ward || !area || lat === undefined || lng === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: ward, area, lat, lng',
      });
    }

    // Generate unique bin_id
    const bin_id = await generateBinId(ward, area);
    
    // Generate device_key for authentication
    const device_key = generateDeviceKey();

    // Create new bin
    const newBin = new Bin({
      bin_id,
      device_key,
      ward,
      area,
      fill_level: 0,
      lat,
      lng,
      last_updated: new Date(),
    });

    await newBin.save();

    console.log(`✅ New dustbin registered: ${bin_id}`);

    return res.status(201).json({
      success: true,
      message: 'Dustbin registered successfully',
      data: {
        bin_id,
        device_key,
        ward,
        area,
        lat,
        lng,
        fill_level: 0,
        created_at: newBin.last_updated,
      },
    });
  } catch (error) {
    console.error('Error registering dustbin:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

/**
 * GET /api/dustbins
 * Fetch all registered dustbins
 */
export const getAllDustbins = async (req, res) => {
  try {
    const bins = await Bin.find({}, '-device_key').sort({ last_updated: -1 });

    return res.status(200).json({
      success: true,
      count: bins.length,
      data: bins,
    });
  } catch (error) {
    console.error('Error fetching dustbins:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

/**
 * GET /api/dustbins/:bin_id
 * Fetch a specific dustbin by bin_id
 */
export const getDustbinById = async (req, res) => {
  try {
    const { bin_id } = req.params;

    const bin = await Bin.findOne({ bin_id }, '-device_key');

    if (!bin) {
      return res.status(404).json({
        success: false,
        message: 'Dustbin not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: bin,
    });
  } catch (error) {
    console.error('Error fetching dustbin:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

/**
 * DELETE /api/dustbins/:bin_id
 * Delete a dustbin registration
 */
export const deleteDustbin = async (req, res) => {
  try {
    const { bin_id } = req.params;

    const deletedBin = await Bin.findOneAndDelete({ bin_id });

    if (!deletedBin) {
      return res.status(404).json({
        success: false,
        message: 'Dustbin not found',
      });
    }

    console.log(`🗑️ Dustbin ${bin_id} deleted successfully`);

    return res.status(200).json({
      success: true,
      message: 'Dustbin deleted successfully',
      data: deletedBin,
    });
  } catch (error) {
    console.error('Error deleting dustbin:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
