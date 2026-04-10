import React from 'react';
import './SimpleMap.css';

/**
 * SimpleMap Component
 * Displays bins on a simple coordinate grid (without actual Google Maps)
 * Useful for visualization and demo purposes
 */

const SimpleMap = ({ bins = [], highlightFull = false, routes = [] }) => {
  if (!bins || bins.length === 0) {
    return (
      <div className="simple-map">
        <div className="map-placeholder">
          <p>📍 No bins to display</p>
        </div>
      </div>
    );
  }

  // Find bounds for better visualization
  const lats = [...bins.map(b => b.lat), 19.0760];
  const lngs = [...bins.map(b => b.lng), 72.8777];
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const mapWidth = 600;
  const mapHeight = 400;

  // Calculate scaling factors
  const latRange = maxLat - minLat || 0.01;
  const lngRange = maxLng - minLng || 0.01;

  const scaleX = (mapWidth - 40) / lngRange;
  const scaleY = (mapHeight - 40) / latRange;

  // Convert lat/lng to pixel coordinates
  const getPixelCoords = (lat, lng) => {
    const x = ((lng - minLng) * scaleX) + 20;
    const y = ((maxLat - lat) * scaleY) + 20;
    return { x, y };
  };

  // Depot coordinates (fixed)
  const depotCoords = getPixelCoords(19.0760, 72.8777);

  // For route visualization
  let routePath = 'M ';
  if (routes && routes.length > 0) {
    routes.forEach((location, index) => {
      const coords = getPixelCoords(location.lat, location.lng);
      if (index === 0) {
        routePath += `${coords.x},${coords.y} `;
      } else {
        routePath += `L ${coords.x},${coords.y} `;
      }
    });
  }

  return (
    <div className="simple-map">
      <svg width={mapWidth} height={mapHeight} className="map-svg">
        <rect width={mapWidth} height={mapHeight} fill="#f8f9fa" />
        <grid className="map-grid" />

        {/* Draw route if provided */}
        {routes && routes.length > 0 && (
          <path d={routePath} stroke="#667eea" strokeWidth="2" fill="none" />
        )}

        {/* Draw bins */}
        {bins.map((bin, index) => {
          const coords = getPixelCoords(bin.lat, bin.lng);
          const isFull = bin.fill_level > 80;
          const fillColor = isFull ? '#e74c3c' : (bin.fill_level > 40 ? '#f39c12' : '#27ae60');

          return (
            <g key={bin._id || index}>
              <circle
                cx={coords.x}
                cy={coords.y}
                r="8"
                fill={fillColor}
                opacity="0.8"
                className="bin-marker"
              />
              {isFull && highlightFull && (
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="12"
                  fill="none"
                  stroke="#e74c3c"
                  strokeWidth="2"
                  opacity="0.5"
                  className="bin-highlight"
                />
              )}
              <title>{`${bin.bin_id}: ${bin.fill_level}%`}</title>
            </g>
          );
        })}

        {/* Draw depot */}
        <g>
          <rect
            x={depotCoords.x - 10}
            y={depotCoords.y - 10}
            width="20"
            height="20"
            fill="#3498db"
            opacity="0.8"
          />
          <text
            x={depotCoords.x}
            y={depotCoords.y + 25}
            textAnchor="middle"
            fontSize="12"
            fill="#2c3e50"
          >
            Depot
          </text>
          <title>Depot: 19.0760, 72.8777</title>
        </g>
      </svg>

      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#27ae60' }}></span>
          <span>Empty (&lt; 40%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#f39c12' }}></span>
          <span>Half-Full (40-80%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#e74c3c' }}></span>
          <span>Full (&gt; 80%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#3498db' }}></span>
          <span>Depot</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;
