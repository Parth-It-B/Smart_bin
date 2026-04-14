import axios from 'axios';

/**
 * API Client Configuration
 * Handles all communication with the backend server
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Dustbin Registration API Endpoints
 * Note: Dustbin registration is handled through bins API
 */

export const dustbinAPI = {
  // Register a new dustbin (using bins endpoint)
  registerDustbin: (ward, area, lat, lng) =>
    apiClient.post('/dustbins', { ward, area, lat, lng }),

  // Get all dustbins (using bins endpoint)
  getAllDustbins: () =>
    apiClient.get('/bins'),

  // Get specific dustbin (using bins endpoint)
  getDustbinById: (bin_id) =>
    apiClient.get(`/bins/${bin_id}`),

  // Delete dustbin (using bins endpoint)
  deleteDustbin: (bin_id) =>
    apiClient.delete(`/bins/${bin_id}`),
};

/**
 * Bins Update API Endpoints
 * For real-time sensor data updates
 */

export const binsAPI = {
  // Update bin data with device authentication
  updateBin: (bin_id, device_key, fill_level) =>
    apiClient.post('/bins', { bin_id, device_key, fill_level }),

  // Get all bins
  getAllBins: () =>
    apiClient.get('/bins'),

  // Get full bins (fill_level > 80)
  getFullBins: () =>
    apiClient.get('/bins/full'),

  // Get bin statistics
  getStats: () =>
    apiClient.get('/bins/stats'),

  // Clear a bin
  clearBin: (bin_id) =>
    apiClient.delete(`/bins/${bin_id}`),
};

/**
 * Route API Endpoints
 */

export const routeAPI = {
  // Get optimized route
  getOptimizedRoute: () =>
    apiClient.get('/route'),
};

/**
 * Initialization Endpoints
 */

export const initAPI = {
  // Initialize database with dummy data
  initDummyData: () =>
    apiClient.post('/init'),

  // Health check
  healthCheck: () =>
    apiClient.get('/health'),
};

/**
 * Error handling helper
 */

export const handleError = (error) => {
  if (error.response) {
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    return 'No response from server. Make sure backend is running.';
  } else {
    return error.message;
  }
};

export default apiClient;
