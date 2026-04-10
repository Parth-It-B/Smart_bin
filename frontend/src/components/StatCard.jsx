import React from 'react';
import './stats-card.css';

/**
 * StatCard Component
 * Displays a single statistic in a card format
 */

const StatCard = ({ icon, label, value, color = '#667eea' }) => {
  return (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-icon" style={{ backgroundColor: `${color}20` }}>
        {icon}
      </div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
