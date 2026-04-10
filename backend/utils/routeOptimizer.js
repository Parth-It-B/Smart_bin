/**
 * Route Optimization using Nearest Neighbor Algorithm
 * This is a Greedy Algorithm that selects the nearest unvisited bin from the current location
 * 
 * Depot Location: Mumbai Central (19.0760, 72.8777)
 */

// Fixed depot location (Mumbai Central)
const DEPOT = { lat: 19.0760, lng: 72.8777 };

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lng1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lng2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

/**
 * Nearest Neighbor Algorithm for route optimization
 * 
 * @param {Array} bins - Array of bin objects with {_id, bin_id, fill_level, lat, lng}
 * @returns {Array} Optimized route with distances
 */
export function optimizeRoute(bins) {
  if (!bins || bins.length === 0) {
    return [];
  }

  // Initialize route with depot as starting point
  let route = [
    {
      order: 0,
      type: 'depot',
      bin_id: 'DEPOT',
      lat: DEPOT.lat,
      lng: DEPOT.lng,
      fill_level: null,
      distance_from_previous: 0,
    },
  ];

  // Create a copy of bins to track visited bins
  let remainingBins = bins.map(bin => ({
    ...bin.toObject ? bin.toObject() : bin,
    visited: false,
  }));

  let currentLocation = DEPOT;
  let totalDistance = 0;
  let order = 1;

  // Greedy algorithm: Always go to the nearest unvisited full bin
  while (remainingBins.some(bin => !bin.visited)) {
    let nearestBin = null;
    let nearestDistance = Infinity;

    // Find the nearest unvisited bin from current location
    for (let bin of remainingBins) {
      if (!bin.visited) {
        const distance = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          bin.lat,
          bin.lng
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestBin = bin;
        }
      }
    }

    if (nearestBin) {
      // Mark bin as visited
      nearestBin.visited = true;

      // Add to route
      route.push({
        order: order++,
        type: 'bin',
        bin_id: nearestBin.bin_id,
        lat: nearestBin.lat,
        lng: nearestBin.lng,
        fill_level: nearestBin.fill_level,
        distance_from_previous: parseFloat(nearestDistance.toFixed(2)),
      });

      totalDistance += nearestDistance;
      currentLocation = { lat: nearestBin.lat, lng: nearestBin.lng };
    }
  }

  // Return to depot
  const distanceToDepot = calculateDistance(
    currentLocation.lat,
    currentLocation.lng,
    DEPOT.lat,
    DEPOT.lng
  );

  route.push({
    order: order++,
    type: 'depot',
    bin_id: 'DEPOT',
    lat: DEPOT.lat,
    lng: DEPOT.lng,
    fill_level: null,
    distance_from_previous: parseFloat(distanceToDepot.toFixed(2)),
  });

  totalDistance += distanceToDepot;

  // Add summary information
  return {
    route,
    summary: {
      total_bins: bins.length,
      total_distance_km: parseFloat(totalDistance.toFixed(2)),
      estimated_time_minutes: Math.round(totalDistance / 20), // Assuming 20 km/h average speed
      depot: DEPOT,
    },
  };
}

/**
 * Simplified function to get route as array of bins only (without depot)
 * @param {Array} bins - Array of bin objects
 * @returns {Array} Route coordinates
 */
export function getRouteCoordinates(bins) {
  const optimized = optimizeRoute(bins);
  return optimized.route.map(location => ({
    lat: location.lat,
    lng: location.lng,
    bin_id: location.bin_id,
  }));
}

export default { optimizeRoute, getRouteCoordinates };
