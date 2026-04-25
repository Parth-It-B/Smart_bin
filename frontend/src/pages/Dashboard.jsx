import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import BinList from '../components/BinList';
import { binsAPI, handleError } from '../utils/apiClient';
import './Dashboard.css';
import LiveMap from "../components/LiveMap";

const Dashboard = () => {
  const [bins, setBins] = useState([]);
  const [fullBins, setFullBins] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();

    const interval = setInterval(() => {
      if (localStorage.getItem("demoMode") !== "true") {
        fetchAllData();
      }
    }, 20000);

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
    } catch (err) {
      setError(handleError(err));
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInitialize = async () => {
    const demoBins = [
  { bin_id:"MW-CHEMBUR-01", area:"Chembur",          lat:19.0522, lng:72.9005, fill_level:92 },
  { bin_id:"MW-TILAKNAGAR-02", area:"Tilak Nagar",   lat:19.0550, lng:72.8980, fill_level:76 },
  { bin_id:"MW-RCF-03", area:"RCF Colony",           lat:19.0495, lng:72.9052, fill_level:84 },
  { bin_id:"MW-GHATLA-04", area:"Ghatla",            lat:19.0581, lng:72.9070, fill_level:33 },
  { bin_id:"MW-DIAMOND-05", area:"Diamond Garden",   lat:19.0468, lng:72.8967, fill_level:61 },
  { bin_id:"MW-CAMP-06", area:"Chembur Camp",        lat:19.0511, lng:72.9100, fill_level:97 },
  { bin_id:"MW-SHELL-07", area:"Shell Colony",       lat:19.0600, lng:72.9035, fill_level:48 },
  { bin_id:"MW-PLP-08", area:"PL Lokhande Marg",     lat:19.0440, lng:72.9021, fill_level:88 },
  { bin_id:"MW-SINDHI-09", area:"Sindhi Society",    lat:19.0566, lng:72.8949, fill_level:72 },
  { bin_id:"MW-EAST-10", area:"Chembur East",        lat:19.0539, lng:72.9120, fill_level:95 }
];

    setBins(demoBins);

    const full = demoBins.filter(bin => bin.fill_level >= 80);
    setFullBins(full);

    setStats({
      totalBins: 10,
      fullBins: full.length,
      halfFullBins: demoBins.filter(
        b => b.fill_level >= 50 && b.fill_level < 80
      ).length,
      emptyBins: demoBins.filter(
        b => b.fill_level < 50
      ).length,
      averageFillLevel:
        demoBins.reduce((sum, b) => sum + b.fill_level, 0) / 10
    });

    localStorage.setItem("demoMode", "true");
    localStorage.setItem("demoBins", JSON.stringify(demoBins));
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
          {loading ? "⏳ Loading..." : "🔄 Initialize Demo Data"}
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
          {bins.length > 0 ? (
            <LiveMap bins={bins} />
          ) : (
            <p>Loading map...</p>
          )}
        </div>

        <div className="dashboard-section">
          <h2>📍 All Bins ({bins.length})</h2>
          <BinList bins={bins} loading={loading} error={error} />
        </div>
      </div>

      {fullBins.length > 0 && (
        <div className="dashboard-section full-section">
          <h2>
            🚨 Full Bins Requiring Collection ({fullBins.length})
          </h2>
          <BinList bins={fullBins} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;