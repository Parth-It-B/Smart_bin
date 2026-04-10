import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import RouteOptimization from './pages/RouteOptimization';
import './App.css';

/**
 * Main App Component
 * Navigation and routing between Dashboard and Route Optimization
 */

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <span className="brand-icon">🚮</span>
            <h1>Smart Waste Management</h1>
          </div>
          <div className="navbar-nav">
            <button
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-link ${currentPage === 'route' ? 'active' : ''}`}
              onClick={() => setCurrentPage('route')}
            >
              🚗 Route Optimization
            </button>
          </div>
        </div>
      </nav>

      <div className="app-content">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'route' && <RouteOptimization />}
      </div>

      <footer className="app-footer">
        <p>
          🌍 IoT Smart Waste Management System v1.0 | MERN Stack
        </p>
        <p>
          Built with React, Node.js, MongoDB, and Express
        </p>
      </footer>
    </div>
  );
}

export default App;
