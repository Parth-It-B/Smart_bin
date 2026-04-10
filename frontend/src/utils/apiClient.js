import axios from 'axios';

/**
 * API Client Configuration
 * Handles all communication with the backend server
 */

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Bins API Endpoints
 */

export const binsAPI = {
  // Add new bin data
  addBin: (bin_id, fill_level, lat, lng) =>
    apiClient.post('/bins', { bin_id, fill_level, lat, lng }),

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
