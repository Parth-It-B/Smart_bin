import Bin from '../models/Bin.js';

/**
 * Generate a random device key (8-12 characters)
 * @returns {string} Random alphanumeric string
 */
const generateDeviceKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = Math.floor(Math.random() * 5) + 8; // 8-12 characters
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate bin ID in format: MUM-{WARD}-{AREA}-BIN-{count+1}
 * @param {string} ward - Ward name
 * @param {string} area - Area name
 * @returns {string} Generated bin ID
 */
const generateBinId = async (ward, area) => {
  try {
    // Count existing bins for this ward and area
    const count = await Bin.countDocuments({ ward, area });
    const nextNumber = count + 1;

    // Format: MUM-WARD-AREA-BIN-{number}
    return `MUM-${ward.toUpperCase()}-${area.toUpperCase()}-BIN-${nextNumber}`;
  } catch (error) {
    console.error('Error generating bin ID:', error);
    throw new Error('Failed to generate bin ID');
  }
};

/**
 * Add a new dustbin to the system
 * POST /api/dustbins
 */
export const addDustbin = async (req, res) => {
  try {
    const { ward, area, lat, lng } = req.body;

    // Validate required fields
    if (!ward || !area || lat === undefined || lng === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: ward, area, lat, lng',
      });
    }

    // Validate coordinates
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'lat and lng must be numbers',
      });
    }

    // Generate bin_id and device_key
    const bin_id = await generateBinId(ward, area);
    const device_key = generateDeviceKey();

    // Create new bin
    const newBin = new Bin({
      bin_id,
      ward,
      area,
      device_key,
      lat,
      lng,
      fill_level: 0, // Start with empty bin
      last_updated: new Date(),
    });

    // Save to database
    await newBin.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Dustbin added successfully',
      data: {
        bin_id,
        device_key,
        ward,
        area,
        lat,
        lng,
      },
    });

  } catch (error) {
    console.error('Error adding dustbin:', error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Bin ID already exists. Please try again.',
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message,
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};