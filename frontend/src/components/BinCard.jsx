import React, { useState } from 'react';
import './BinCard.css';

/**
 * BinCard Component
 * Displays individual bin information with fill level indicator
 */

const BinCard = ({ bin }) => {
  const [showKey, setShowKey] = useState(false);

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const color = getFillPercentageColor(bin.fill_level);
  const status = getStatusLabel(bin.fill_level);

  return (
    <div className="bin-card">
      <div className="bin-header">
        <h3>{bin.bin_id}</h3>
        <span className={`status-badge status-${bin.fill_level > 80 ? 'full' : bin.fill_level > 40 ? 'half' : 'empty'}`}>
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
          {bin.ward && (
            <div className="detail-item">
              <span className="detail-label">🏢 Ward:</span>
              <span className="detail-value">{bin.ward}</span>
            </div>
          )}
          {bin.area && (
            <div className="detail-item">
              <span className="detail-label">📍 Area:</span>
              <span className="detail-value">{bin.area}</span>
            </div>
          )}
          <div className="detail-item">
            <span className="detail-label">📌 Coordinates:</span>
            <span className="detail-value">
              {bin.lat.toFixed(4)}, {bin.lng.toFixed(4)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">⏰ Updated:</span>
            <span className="detail-value">
              {new Date(bin.last_updated).toLocaleString()}
            </span>
          </div>
          {bin.device_key && (
            <div className="detail-item device-key-item">
              <span className="detail-label">🔑 Device Key:</span>
              <div className="device-key-value">
                <code>{showKey ? bin.device_key : '••••••••••••••••'}</code>
                <button
                  className="btn-icon"
                  onClick={() => setShowKey(!showKey)}
                  title="Toggle visibility"
                >
                  {showKey ? '👁️' : '👁️‍🗨️'}
                </button>
                <button
                  className="btn-icon"
                  onClick={() => copyToClipboard(bin.device_key)}
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BinCard;
