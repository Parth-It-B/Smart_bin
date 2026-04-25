import Bin from '../models/Bin.js';

/**
 * Dummy data generator for testing and development
 * Creates sample bins with random fill levels around Mumbai area
 */

// Sample bin locations in Mumbai (lat, lng)
const binLocations = [
  { lat: 19.0760, lng: 72.8777, area: 'Central Mumbai' },
  { lat: 19.0826, lng: 72.8756, area: 'Fort' },
  { lat: 19.0836, lng: 72.8193, area: 'Bandra' },
  { lat: 19.1136, lng: 72.8697, area: 'Dadar' },
  { lat: 19.1356, lng: 72.8477, area: 'Chembur' },
  { lat: 19.0176, lng: 72.8479, area: 'Lower Parel' },
  { lat: 19.2183, lng: 72.9781, area: 'Borivali' },
  { lat: 19.1480, lng: 72.9200, area: 'Mulund' },
  { lat: 19.0980, lng: 72.7794, area: 'Andheri' },
  { lat: 19.1136, lng: 72.8838, area: 'Prabhadevi' },
  { lat: 19.0596, lng: 72.8295, area: 'Kala Ghoda' },
  { lat: 19.1833, lng: 72.9433, area: 'Powai' },
  { lat: 19.1530, lng: 72.9433, area: 'Malad' },
  { lat: 19.0606, lng: 72.8194, area: 'Worli' },
  { lat: 19.1384, lng: 72.8427, area: 'Thane' },
];

// Fixed fill levels for static demo data
const fixedFillLevels = [25, 45, 10, 85, 60, 30, 90, 15, 70, 5, 80, 40, 55, 20, 95];

/**
 * Create dummy bins in database
 */
export async function createDummyBins() {
  try {
    // Clear existing bins
    await Bin.deleteMany({});
    console.log('🗑️  Cleared existing bins');

    // Create new dummy bins
    const dummyBins = binLocations.map((location, index) => ({
      bin_id: `BIN-${String(index + 1).padStart(3, '0')}`,
      fill_level: fixedFillLevels[index],
      lat: location.lat,
      lng: location.lng,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Random time in last 24 hours
    }));

    await Bin.insertMany(dummyBins);
    console.log(`✅ Created ${dummyBins.length} dummy bins`);

    // Log statistics
    const stats = await Bin.aggregate([
      {
        $group: {
          _id: null,
          totalBins: { $sum: 1 },
          fullBins: {
            $sum: { $cond: [{ $gt: ['$fill_level', 80] }, 1, 0] },
          },
          averageFill: { $avg: '$fill_level' },
        },
      },
    ]);

    console.log('📊 Dummy Data Statistics:');
    console.log(`   Total Bins: ${stats[0].totalBins}`);
    console.log(`   Full Bins: ${stats[0].fullBins}`);
    console.log(`   Average Fill Level: ${stats[0].averageFill.toFixed(2)}%`);

    return dummyBins;
  } catch (error) {
    console.error('❌ Error creating dummy bins:', error);
    throw error;
  }
}

/**
 * Update random bin with new fill level
 */
export async function updateRandomBin() {
  try {
    const randomBin = await Bin.aggregate([{ $sample: { size: 1 } }]);

    if (randomBin.length > 0) {
      const bin = randomBin[0];
      const newFillLevel = getRandomFillLevel();

      await Bin.findByIdAndUpdate(bin._id, {
        fill_level: newFillLevel,
        timestamp: new Date(),
      });

      console.log(`📡 Updated bin ${bin.bin_id}: ${newFillLevel}%`);
      return bin;
    }
  } catch (error) {
    console.error('❌ Error updating random bin:', error);
  }
}

export default { createDummyBins, updateRandomBin };
