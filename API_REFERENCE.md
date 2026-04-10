# API Reference

Complete API documentation for Smart Waste Management System.

## Base URL

```
http://localhost:5000/api
```

## Response Format

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Description",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error"
}
```

---

## Bin Management API

### 1. Add Bin Data

Add or update smart bin information (simulates IoT sensor input).

**Endpoint:**
```
POST /bins
```

**Request Body:**
```json
{
  "bin_id": "BIN-001",
  "fill_level": 75,
  "lat": 19.0760,
  "lng": 72.8777
}
```

**Parameters:**
| Name | Type | Required | Notes |
|------|------|----------|-------|
| bin_id | String | Yes | Unique identifier |
| fill_level | Number | Yes | 0-100 percentage |
| lat | Number | Yes | Latitude coordinate |
| lng | Number | Yes | Longitude coordinate |

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Bin added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "bin_id": "BIN-001",
    "fill_level": 75,
    "lat": 19.0760,
    "lng": 72.8777,
    "status": "half-full",
    "timestamp": "2024-04-10T12:00:00.000Z"
  }
}
```

**Status Codes:**
- `201` - Bin created/updated successfully
- `400` - Invalid input parameters
- `500` - Server error

---

### 2. Get All Bins

Retrieve all bins from the database.

**Endpoint:**
```
GET /bins
```

**Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "bin_id": "BIN-001",
      "fill_level": 75,
      "lat": 19.0760,
      "lng": 72.8777,
      "status": "half-full",
      "timestamp": "2024-04-10T12:00:00.000Z"
    },
    ...
  ]
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### 3. Get Full Bins

Retrieve only bins that need immediate collection (fill_level > 80%).

**Endpoint:**
```
GET /bins/full
```

**Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "bin_id": "BIN-005",
      "fill_level": 92,
      "lat": 19.1136,
      "lng": 72.8697,
      "status": "full",
      "timestamp": "2024-04-10T12:15:00.000Z"
    },
    ...
  ]
}
```

---

### 4. Get Dashboard Statistics

Get aggregated statistics for the dashboard.

**Endpoint:**
```
GET /bins/stats
```

**Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "stats": {
    "totalBins": 15,
    "fullBins": 3,
    "halfFullBins": 6,
    "emptyBins": 6,
    "averageFillLevel": 45.3
  }
}
```

---

### 5. Get Specific Bin

Retrieve information for a specific bin.

**Endpoint:**
```
GET /bins/:bin_id
```

**Parameters:**
| Name | Type | Required | Notes |
|------|------|----------|-------|
| bin_id | String | Yes | URL parameter |

**Example:**
```
GET /bins/BIN-001
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "bin_id": "BIN-001",
    "fill_level": 75,
    "lat": 19.0760,
    "lng": 72.8777,
    "status": "half-full",
    "timestamp": "2024-04-10T12:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Bin not found
- `500` - Server error

---

### 6. Clear Bin

Mark a bin as emptied (sets fill_level to 0).

**Endpoint:**
```
DELETE /bins/:bin_id
```

**Parameters:**
| Name | Type | Required | Notes |
|------|------|----------|-------|
| bin_id | String | Yes | URL parameter |

**Example:**
```
DELETE /bins/BIN-001
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Bin cleared successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "bin_id": "BIN-001",
    "fill_level": 0,
    "status": "empty",
    "last_emptied": "2024-04-10T12:30:00.000Z",
    "timestamp": "2024-04-10T12:30:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Bin not found
- `500` - Server error

---

## Route Optimization API

### 7. Get Optimized Route

Get AI-optimized waste collection route using Nearest Neighbor algorithm.

**Endpoint:**
```
GET /route
```

**Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Route optimized successfully",
  "route": {
    "route": [
      {
        "order": 0,
        "type": "depot",
        "bin_id": "DEPOT",
        "lat": 19.0760,
        "lng": 72.8777,
        "fill_level": null,
        "distance_from_previous": 0
      },
      {
        "order": 1,
        "type": "bin",
        "bin_id": "BIN-005",
        "lat": 19.1136,
        "lng": 72.8697,
        "fill_level": 92,
        "distance_from_previous": 4.23
      },
      {
        "order": 2,
        "type": "bin",
        "bin_id": "BIN-012",
        "lat": 19.1833,
        "lng": 72.9433,
        "fill_level": 88,
        "distance_from_previous": 3.15
      },
      {
        "order": 3,
        "type": "depot",
        "bin_id": "DEPOT",
        "lat": 19.0760,
        "lng": 72.8777,
        "fill_level": null,
        "distance_from_previous": 8.40
      }
    ],
    "summary": {
      "total_bins": 2,
      "total_distance_km": 15.78,
      "estimated_time_minutes": 47,
      "depot": {
        "lat": 19.0760,
        "lng": 72.8777
      }
    }
  },
  "totalBins": 4,
  "depot": {
    "lat": 19.0760,
    "lng": 72.8777
  }
}
```

**Response (if no full bins):**
```json
{
  "success": true,
  "message": "No full bins found",
  "route": [],
  "totalBins": 0,
  "depot": {
    "lat": 19.0760,
    "lng": 72.8777
  }
}
```

**Statistics Explanation:**
- `total_bins`: Number of full bins in route
- `total_distance_km`: Total collection distance
- `estimated_time_minutes`: Time based on 20 km/h average speed
- `depot`: Starting and ending point coordinates

---

## System API

### 8. Initialize Database

Create dummy data for testing.

**Endpoint:**
```
POST /init
```

**Request Body:** None

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Database initialized with dummy data"
}
```

**Note:** This endpoint clears existing bins and creates 15 new ones with random fill levels.

---

### 9. Health Check

Verify that the backend is running.

**Endpoint:**
```
GET /health
```

**Parameters:** None

**Response (200 OK):**
```json
{
  "status": "Server is running",
  "timestamp": "2024-04-10T12:00:00.000Z",
  "environment": "development"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Missing required fields: bin_id, fill_level, lat, lng"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Bin not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details..."
}
```

---

## Rate Limiting

⚠️ Currently no rate limiting. For production, implement:
- 100 requests per minute per IP
- 1000 requests per hour per API key

---

## CORS Headers

All endpoints return:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, DELETE
Access-Control-Allow-Headers: Content-Type
```

---

## Example Usage

### cURL

```bash
# Add bin
curl -X POST http://localhost:5000/api/bins \
  -H "Content-Type: application/json" \
  -d '{
    "bin_id": "BIN-001",
    "fill_level": 75,
    "lat": 19.0760,
    "lng": 72.8777
  }'

# Get all bins
curl http://localhost:5000/api/bins

# Get optimized route
curl http://localhost:5000/api/route

# Clear a bin
curl -X DELETE http://localhost:5000/api/bins/BIN-001
```

### JavaScript (Axios)

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add bin
await API.post('/bins', {
  bin_id: 'BIN-001',
  fill_level: 75,
  lat: 19.0760,
  lng: 72.8777
});

// Get all bins
const res = await API.get('/bins');
console.log(res.data.data);

// Get optimized route
const route = await API.get('/route');
console.log(route.data.route);

// Clear bin
await API.delete('/bins/BIN-001');
```

### Python (Requests)

```python
import requests

BASE_URL = 'http://localhost:5000/api'

# Add bin
requests.post(f'{BASE_URL}/bins', json={
    'bin_id': 'BIN-001',
    'fill_level': 75,
    'lat': 19.0760,
    'lng': 72.8777
})

# Get all bins
response = requests.get(f'{BASE_URL}/bins')
print(response.json())

# Get optimized route
route = requests.get(f'{BASE_URL}/route')
print(route.json())
```

---

**Last Updated:** April 10, 2024
