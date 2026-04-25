import React, { useState } from 'react';
import RouteCard from '../components/RouteCard';
import LiveMap from "../components/LiveMap";
import { binsAPI, routeAPI, handleError } from '../utils/apiClient';
import './RouteOptimization.css';

/**
 * RouteOptimization Page
 * Displays AI-optimized waste collection route using Nearest Neighbor algorithm
 */

const RouteOptimization = () => {
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fullBins, setFullBins] = useState([]);

  const handleOptimizeRoute = async () => {
  try {
    setLoading(true);
    setError(null);

    const isDemo = localStorage.getItem("demoMode") === "true";

    // DEMO MODE
    if (isDemo) {
      const demoBins =
        JSON.parse(localStorage.getItem("demoBins")) || [];

      const full = demoBins.filter(bin => bin.fill_level >= 80);

      setFullBins(full);

      const route = full.map((bin, index) => ({
        ...bin,
        stop_number: index + 1,
        distance_from_previous: (Math.random() * 1.5 + 0.3).toFixed(2)
      }));

      setRouteData({
        route: {
          route,
          summary: {
            total_bins: full.length,
            total_distance_km: (
              full.length * 1.4 + Math.random() * 2
            ).toFixed(2),
            estimated_time_minutes: full.length * 6
          }
        }
      });

      return;
    }

    // NORMAL REAL MODE
    const [binsRes, routeRes] = await Promise.all([
      binsAPI.getFullBins(),
      routeAPI.getOptimizedRoute(),
    ]);

    setFullBins(binsRes.data.data || []);
    setRouteData(routeRes.data);

  } catch (err) {
    setError(handleError(err));
    console.error("Error optimizing route:", err);
  } finally {
    setLoading(false);
  }
};

  const hasFullBins = fullBins.length > 0;
  const route = routeData?.route?.route || [];
  const summary = routeData?.route?.summary || {};

  return (
    <div className="route-page">
      <div className="route-header">
        <div>
          <h1>🚗 AI Route Optimization</h1>
          <p>Intelligent waste collection route using Nearest Neighbor algorithm</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleOptimizeRoute}
          disabled={loading}
        >
          {loading ? '⏳ Optimizing...' : '🎯 Optimize Route'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {!routeData ? (
        <div className="empty-state-route">
          <div className="empty-icon">🗺️</div>
          <p>Click "Optimize Route" to generate the collection route</p>
          <p>The system will analyze all full bins and create an optimized path</p>
        </div>
      ) : (
        <>
          {/* Route Summary */}
          <div className="route-summary">
            <div className="summary-stats">
              <div className="summary-stat">
                <span className="summary-label">Total Bins to Collect</span>
                <span className="summary-value">{summary.total_bins || 0}</span>
              </div>
              <div className="summary-stat">
                <span className="summary-label">Total Distance</span>
                <span className="summary-value">{summary.total_distance_km || 0} km</span>
              </div>
              <div className="summary-stat">
                <span className="summary-label">Est. Time</span>
                <span className="summary-value">{summary.estimated_time_minutes || 0} min</span>
              </div>
            </div>
          </div>

          <div className="route-grid">
            {/* Map Visualization */}
            <div className="route-section">
              <h2>📍 Route Visualization</h2>
              <LiveMap bins={fullBins} routes={route} />
            </div>  

            {/* Detailed Route Steps */}
            <div className="route-section">
              <h2>📋 Collection Route ({route.length} stops)</h2>
              <div className="route-list">
                {route.length === 0 ? (
                  <p className="no-route">No full bins to collect</p>
                ) : (
                  route.map((stop, index) => (
                    <RouteCard
                      key={index}
                      route={stop}
                      index={index}
                      totalStops={route.length}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Algorithm Info */}
          <div className="algorithm-info">
            <h3>🤖 Algorithm Details</h3>
            <div className="info-content">
              <p>
                <strong>Algorithm:</strong> Nearest Neighbor (Greedy Algorithm)
              </p>
              <p>
                <strong>Starting Point:</strong> Depot at 19.0760°N, 72.8777°E (Mumbai)
              </p>
              <p>
                <strong>Selection Criteria:</strong> Only bins with fill level &gt; 80%
              </p>
              <p>
                <strong>Distance Calculation:</strong> Haversine formula (Earth's great circle distance)
              </p>
              <p>
                <strong>How it Works:</strong>
              </p>
              <ul>
                <li>Start from the depot</li>
                <li>Find the nearest unvisited full bin</li>
                <li>Move to that bin and mark it as visited</li>
                <li>Repeat until all full bins are visited</li>
                <li>Return to depot</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RouteOptimization;