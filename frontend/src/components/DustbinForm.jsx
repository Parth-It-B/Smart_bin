import React, { useState } from 'react';
import { dustbinAPI, handleError } from '../utils/apiClient';
import './DustbinForm.css';

/**
 * Dustbin Registration Form
 * Register new IoT dustbins with automatic ID and key generation
 */

const DustbinForm = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    ward: '',
    area: '',
    lat: '',
    lng: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [registeredBin, setRegisteredBin] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    setRegisteredBin(null);

    try {
      const { ward, area, lat, lng } = formData;

      // Validate inputs
      if (!ward || !area || !lat || !lng) {
        throw new Error('All fields are required');
      }

      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);

      if (isNaN(latNum) || isNaN(lngNum)) {
        throw new Error('Latitude and Longitude must be valid numbers');
      }

      // Register dustbin
      const response = await dustbinAPI.registerDustbin(ward, area, latNum, lngNum);
      const registeredData = response.data.data;

      setSuccess(`✅ Dustbin registered successfully!`);
      setRegisteredBin(registeredData);

      // Reset form
      setFormData({ ward: '', area: '', lat: '', lng: '' });

      // Notify parent component
      if (onRegistrationSuccess) {
        onRegistrationSuccess(registeredData);
      }
    } catch (err) {
      setError('❌ ' + handleError(err));
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <div className="dustbin-form-container">
      <div className="form-card">
        <h2>🗑️ Register New Dustbin</h2>
        <p className="form-subtitle">IoT Device Registration</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="ward">Ward *</label>
            <input
              type="text"
              id="ward"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              placeholder="e.g., Ward-01"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="area">Area *</label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="e.g., Downtown"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lat">Latitude *</label>
              <input
                type="number"
                id="lat"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                placeholder="28.5355"
                step="0.0001"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lng">Longitude *</label>
              <input
                type="number"
                id="lng"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                placeholder="77.3910"
                step="0.0001"
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? '⏳ Registering...' : '✨ Register Dustbin'}
          </button>
        </form>

        {registeredBin && (
          <div className="registration-success">
            <h3>📋 Registration Details</h3>
            <div className="info-card">
              <div className="info-item">
                <label>Bin ID:</label>
                <div className="info-value">
                  <code>{registeredBin.bin_id}</code>
                  <button
                    className="btn-copy"
                    onClick={() => copyToClipboard(registeredBin.bin_id)}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
              </div>
              <div className="info-item">
                <label>Device Key:</label>
                <div className="info-value">
                  <code>{registeredBin.device_key}</code>
                  <button
                    className="btn-copy"
                    onClick={() => copyToClipboard(registeredBin.device_key)}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
              </div>
              <div className="info-item">
                <label>Location:</label>
                <div className="info-value">
                  ({registeredBin.lat}, {registeredBin.lng})
                </div>
              </div>
              <div className="info-note">
                <p>⚠️ <strong>Save these credentials securely!</strong> Use the Bin ID and Device Key to authenticate sensor updates.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DustbinForm;
