import React from 'react';
import './BinList.css';
import BinCard from './BinCard';

/**
 * BinList Component
 * Displays a list of bins with loading and empty states
 */

const BinList = ({ bins = [], loading = false, error = null }) => {
  if (loading) {
    return (
      <div className="bin-list">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading bins...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bin-list">
        <div className="error-state">
          <p>❌ {error}</p>
        </div>
      </div>
    );
  }

  if (bins.length === 0) {
    return (
      <div className="bin-list">
        <div className="empty-state">
          <p>📭 No bins available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bin-list">
      <div className="list-header">
        <p className="list-count">Total: {bins.length} bin(s)</p>
      </div>
      <div className="bins-container">
        {bins.map((bin) => (
          <BinCard key={bin._id} bin={bin} />
        ))}
      </div>
    </div>
  );
};

export default BinList;
