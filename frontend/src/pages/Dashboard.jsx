import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import BinList from '../components/BinList';
import SimpleMap from '../components/SimpleMap';
import { binsAPI, handleError, initAPI } from '../utils/apiClient';
import './Dashboard.css';

/**
 * Dashboard Page
 * Displays overview of all bins, statistics, and simple map visualization
 */

const Dashboard = () => {
  const [bins, setBins] = useState([]);
  const [fullBins, setFullBins] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
    // Refresh every 5 seconds for live updates
    const interval = setInterval(fetchAllData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [binsRes, fullBinsRes, statsRes] = await Promise.all([
        binsAPI.getAllBins(),
        binsAPI.getFullBins(),
        binsAPI.getStats(),
      ]);

      setBins(binsRes.data.data || []);
      setFullBins(fullBinsRes.data.data || []);
      setStats(statsRes.data.stats || {});
      setInitialized(true);
    } catch (err) {
      setError(handleError(err));
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInitialize = async () => {
    try {
      setLoading(true);
      await initAPI.initDummyData();
      await new Promise(resolve => setTimeout(resolve, 500));
      await fetchAllData();
    } catch (err) {
      setError(handleError(err));
      console.error('Initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>📊 Smart Waste Management Dashboard</h1>
          <p>Real-time monitoring of IoT-based smart dustbins</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={handleInitialize}
          disabled={loading}
        >
          {loading ? '⏳ Loading...' : '🔄 Initialize Demo Data'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="stats-grid">
        <StatCard
          icon="📦"
          label="Total Bins"
          value={stats?.totalBins || 0}
          color="#667eea"
        />
        <StatCard
          icon="🚨"
          label="Full Bins"
          value={stats?.fullBins || 0}
          color="#e74c3c"
        />
        <StatCard
          icon="⚠️"
          label="Half-Full"
          value={stats?.halfFullBins || 0}
          color="#f39c12"
        />
        <StatCard
          icon="✅"
          label="Empty Bins"
          value={stats?.emptyBins || 0}
          color="#27ae60"
        />
        <StatCard
          icon="📈"
          label="Avg Fill Level"
          value={`${Math.round(stats?.averageFillLevel || 0)}%`}
          color="#3498db"
        />
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>🗺️ Bin Distribution Map</h2>
          <SimpleMap bins={bins} highlightFull={true} />
        </div>

        <div className="dashboard-section">
          <h2>📍 All Bins ({bins.length})</h2>
          <BinList bins={bins} loading={loading} error={error} />
        </div>
      </div>

      {fullBins.length > 0 && (
        <div className="dashboard-section full-section">
          <h2>🚨 Full Bins Requiring Collection ({fullBins.length})</h2>
          <BinList bins={fullBins} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
