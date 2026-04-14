import Bin from '../models/Bin.js';
import { optimizeRoute } from '../utils/routeOptimizer.js';

/**
 * Controller for handling bin-related operations
 */

/**
 * POST /api/bins
 * Update bin data with device_key authentication
 * Input: bin_id, device_key, fill_level
 * Only updates existing bins - no new record creation
 */
export const updateBin = async (req, res) => {
  try {
    const { bin_id, device_key, fill_level } = req.body;

    // Validate required fields
    if (!bin_id || !device_key || fill_level === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: bin_id, device_key, fill_level',
      });
    }

    // Validate fill_level range
    if (fill_level < 0 || fill_level > 100) {
      return res.status(400).json({
        success: false,
        message: 'fill_level must be between 0 and 100',
      });
    }

    // Find bin by bin_id
    const bin = await Bin.findOne({ bin_id });

    if (!bin) {
      return res.status(404).json({
        success: false,
        message: 'Bin not found. Please register it first at POST /api/dustbins',
      });
    }

    // Validate device_key (authentication)
    if (bin.device_key !== device_key) {
      return res.status(401).json({
        success: false,
        message: 'Invalid device_key. Authentication failed.',
      });
    }

    // Update bin data
    bin.fill_level = fill_level;
    bin.last_updated = new Date();

    // Alert if bin is full
    if (fill_level > 80) {
      console.log(`🚨 ALERT: Bin ${bin_id} is FULL (${fill_level}%)`);
    }

    await bin.save();

    return res.status(200).json({
      success: true,
      message: 'Bin updated successfully',
      data: bin,
    });
  } catch (error) {
    console.error('Error updating bin:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// GET: Fetch all bins
export const getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find().sort({ timestamp: -1 });

    return res.status(200).json({
      success: true,
      count: bins.length,
      data: bins,
    });
  } catch (error) {
    console.error('Error fetching bins:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// GET: Fetch full bins (fill_level > 80)
export const getFullBins = async (req, res) => {
  try {
    const fullBins = await Bin.find({ fill_level: { $gt: 80 } }).sort({ fill_level: -1 });

    return res.status(200).json({
      success: true,
      count: fullBins.length,
      data: fullBins,
    });
  } catch (error) {
    console.error('Error fetching full bins:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// GET: Get optimized route for waste collection
export const getOptimizedRoute = async (req, res) => {
  try {
    // Fetch only full bins
    const fullBins = await Bin.find({ fill_level: { $gt: 80 } });

    if (fullBins.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No full bins found',
        route: [],
        totalBins: 0,
        depot: { lat: 19.0760, lng: 72.8777 },
      });
    }

    // Optimize route using nearest neighbor algorithm
    const optimizedRoute = optimizeRoute(fullBins);

    return res.status(200).json({
      success: true,
      message: 'Route optimized successfully',
      route: optimizedRoute,
      totalBins: optimizedRoute.length,
      depot: { lat: 19.0760, lng: 72.8777 },
    });
  } catch (error) {
    console.error('Error optimizing route:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// GET: Dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalBins = await Bin.countDocuments();
    const fullBins = await Bin.countDocuments({ fill_level: { $gt: 80 } });
    const halfFullBins = await Bin.countDocuments({ fill_level: { $gt: 40, $lte: 80 } });
    const emptyBins = await Bin.countDocuments({ fill_level: { $lte: 40 } });

    const averageFillLevel = await Bin.aggregate([
      {
        $group: {
          _id: null,
          avgFill: { $avg: '$fill_level' },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalBins,
        fullBins,
        halfFullBins,
        emptyBins,
        averageFillLevel: averageFillLevel[0]?.avgFill || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// DELETE: Clear a bin (mark as emptied)
export const clearBin = async (req, res) => {
  try {
    const { bin_id } = req.params;

    const bin = await Bin.findOneAndUpdate(
      { bin_id },
      {
        fill_level: 0,
        status: 'empty',
        last_emptied: new Date(),
        timestamp: new Date(),
      },
      { new: true }
    );

    if (!bin) {
      return res.status(404).json({
        success: false,
        message: 'Bin not found',
      });
    }

    console.log(`✅ Bin ${bin_id} cleared successfully`);

    return res.status(200).json({
      success: true,
      message: 'Bin cleared successfully',
      data: bin,
    });
  } catch (error) {
    console.error('Error clearing bin:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
