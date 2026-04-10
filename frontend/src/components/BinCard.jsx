import React from 'react';
import './BinCard.css';

/**
 * BinCard Component
 * Displays individual bin information with fill level indicator
 */

const BinCard = ({ bin }) => {
  const getFillPercentageColor = (fillLevel) => {
    if (fillLevel > 80) return '#e74c3c'; // Red - Full
    if (fillLevel > 40) return '#f39c12'; // Orange - Half-full
    return '#27ae60'; // Green - Empty
  };

  const getStatusLabel = (fillLevel) => {
    if (fillLevel > 80) return '🚨 FULL';
    if (fillLevel > 40) return '⚠️ HALF-FULL';
    return '✅ EMPTY';
  };

  const color = getFillPercentageColor(bin.fill_level);
  const status = getStatusLabel(bin.fill_level);

  return (
    <div className="bin-card">
      <div className="bin-header">
        <h3>{bin.bin_id}</h3>
        <span className={`status-badge status-${bin.status}`}>
          {status}
        </span>
      </div>

      <div className="bin-body">
        <div className="fill-info">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${bin.fill_level}%`,
                backgroundColor: color,
              }}
            />
          </div>
          <span className="fill-level-text">{bin.fill_level}%</span>
        </div>

        <div className="bin-details">
          <div className="detail-item">
            <span className="detail-label">📍 Location:</span>
            <span className="detail-value">
              {bin.lat.toFixed(4)}, {bin.lng.toFixed(4)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">⏰ Updated:</span>
            <span className="detail-value">
              {new Date(bin.timestamp).toLocaleString()}
            </span>
          </div>
          {bin.last_emptied && (
            <div className="detail-item">
              <span className="detail-label">🗑️ Last Emptied:</span>
              <span className="detail-value">
                {new Date(bin.last_emptied).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BinCard;
