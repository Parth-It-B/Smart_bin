import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import RouteOptimization from './pages/RouteOptimization';
import DustbinForm from './components/DustbinForm';
import './App.css';

/**
 * Main App Component
 * Navigation and routing between Dashboard, Route Optimization, and Dustbin Registration
 */

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRegistrationSuccess = () => {
    // Trigger dashboard refresh when a new bin is registered
    setRefreshTrigger(prev => prev + 1);
    setCurrentPage('dashboard');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <span className="brand-icon">🏕️</span>
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
              className={`nav-link ${currentPage === 'register' ? 'active' : ''}`}
              onClick={() => setCurrentPage('register')}
            >
              🗑️ Register Bin
            </button>
            <button
              className={`nav-link ${currentPage === 'route' ? 'active' : ''}`}
              onClick={() => setCurrentPage('route')}
            >
              🗺️ Route Optimization
            </button>
          </div>
        </div>
      </nav>

      <div className="app-content">
        {currentPage === 'dashboard' && <Dashboard key={refreshTrigger} />}
        {currentPage === 'register' && <DustbinForm onRegistrationSuccess={handleRegistrationSuccess} />}
        {currentPage === 'route' && <RouteOptimization />}
      </div>

      <footer className="app-footer">
        <p>
            &copy; | Developed by Parth | Japleen | Shruti | Aryan
        </p>
        
      </footer>
    </div>
  );
}

export default App;
