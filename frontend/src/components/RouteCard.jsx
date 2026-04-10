import React from 'react';
import './RouteCard.css';

/**
 * RouteCard Component
 * Displays a single stop in the optimized route
 */

const RouteCard = ({ route, index, totalStops }) => {
  const isDepot = route.type === 'depot';

  return (
    <div className={`route-card ${isDepot ? 'depot' : 'bin'}`}>
      <div className="route-step">
        <div className="step-number">{route.order}</div>
      </div>

      <div className="route-details">
        <div className="route-header">
          <h4>{route.bin_id}</h4>
          <span className={`route-type ${route.type}`}>
            {isDepot ? 'DEPOT' : 'BIN'}
          </span>
        </div>

        <div className="route-info">
          {!isDepot && (
            <>
              <div className="info-row">
                <span className="info-label">Fill Level:</span>
                <span className="info-value">{route.fill_level}%</span>
              </div>
              <div className="progress-bar-small">
                <div
                  className="fill"
                  style={{
                    width: `${route.fill_level}%`,
                    backgroundColor:
                      route.fill_level > 80
                        ? '#e74c3c'
                        : route.fill_level > 40
                        ? '#f39c12'
                        : '#27ae60',
                  }}
                />
              </div>
            </>
          )}

          <div className="info-row">
            <span className="info-label">Coordinates:</span>
            <span className="info-value">
              {route.lat.toFixed(4)}, {route.lng.toFixed(4)}
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Distance from Previous:</span>
            <span className="info-value">{route.distance_from_previous} km</span>
          </div>
        </div>
      </div>

      {index < totalStops - 1 && <div className="route-arrow">↓</div>}
    </div>
  );
};

export default RouteCard;
