# 🚮 Smart Waste Management System - MERN Stack

Complete IoT-based Smart Waste Management System with AI Route Optimization using MongoDB, Express, React, and Node.js.

![System Architecture](https://img.shields.io/badge/MERN%20Stack-MongoDB%20Express%20React%20Node-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Table of Contents

- [Features](#-features)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [Route Optimization Algorithm](#route-optimization-algorithm)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Backend Features
- ✅ Real-time IoT bin data collection and monitoring
- ✅ MongoDB integration for data persistence
- ✅ RESTful API endpoints for all operations
- ✅ Automated alerts for full bins (fill_level > 80%)
- ✅ AI-based route optimization using Nearest Neighbor algorithm
- ✅ CORS enabled for frontend integration
- ✅ Environment-based configuration
- ✅ Clean MVC architecture (Models, Controllers, Routes)

### Frontend Features
- ✅ Modern, responsive React dashboard
- ✅ Real-time bin status monitoring
- ✅ Visual fill-level indicators
- ✅ Interactive route optimization visualization
- ✅ SVG-based map display
- ✅ Live statistics and metrics
- ✅ Loading states and error handling
- ✅ Clean UI with gradient backgrounds
- ✅ Mobile-responsive design

### IoT & Monitoring
- ✅ Simulate IoT sensor data
- ✅ Track bin location (latitude, longitude)
- ✅ Monitor fill levels (0-100%)
- ✅ Timestamp tracking for all updates
- ✅ Status categorization (empty, half-full, full)
- ✅ Last-emptied timestamp

### Route Optimization
- ✅ Nearest Neighbor algorithm implementation
- ✅ Haversine distance calculation
- ✅ Multi-stop route optimization
- ✅ Estimated time and distance calculation
- ✅ Maximum efficiency for waste collection

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Port 3000)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  Dashboard   │  │    Route     │  │  Simple Map      │ │
│  │   Page       │  │  Optimization│  │  Visualization   │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP / Axios
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Express Backend (Port 5000)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │   Routes     │  │  Controllers │  │   Models         │ │
│  │   /api/bins  │  │  binCtrl     │  │   Mongoose       │ │
│  │   /api/route │  │  functions   │  │   Schema         │ │
│  └──────────────┘  └──────────────┘  └──────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │        Utils                                         │ │
│  │  ┌──────────────────┐  ┌──────────────────────────┐ │
│  │  │ routeOptimizer   │  │  dummyData              │ │
│  │  │ (Nearest Neighbor)
│  │  │ (Haversine)      │  │  (Sample data generator) │ │
│  │  └──────────────────┘  └──────────────────────────┘ │
│  └──────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│          MongoDB Database (localhost:27017)                │
│        Database: smart-waste-management                    │
│        Collections: bins                                   │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

Before starting, ensure you have installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** (comes with Node.js)
- **Git** (optional) - [Download](https://git-scm.com/)

### Verify Installation

```bash
# Check Node.js and npm
node --version
npm --version

# Check MongoDB (must be running)
mongosh # or mongo
```

## Installation

### Step 1: Clone the Repository

```bash
cd c:\Users\STUDENT.INFT505-15\Documents\d10b-58\fieldproject
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Dependencies installed:
# - express: Web framework
# - mongoose: MongoDB ORM
# - cors: Cross-Origin Resource Sharing
# - dotenv: Environment variables
# - nodemon: Development server with auto-reload
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install

# Dependencies installed:
# - react: UI library
# - react-dom: React DOM rendering
# - axios: HTTP client
# - vite: Build tool
```

## Configuration

### Backend Configuration

Edit `backend/.env`:

```env
# Port for the backend server
PORT=5000

# MongoDB connection string
# Local MongoDB:
MONGO_URI=mongodb://localhost:27017/smart-waste-management

# Optional: Remote MongoDB (Atlas)
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-waste-management

# Environment
NODE_ENV=development
```

### Frontend Configuration

The frontend is configured to connect to `http://localhost:5000/api` by default.

To change the API base URL, edit `frontend/src/utils/apiClient.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api'; // Change this
```

## Running the Application

### Prerequisites: Start MongoDB

**Windows (if installed as service):**
```bash
# MongoDB should auto-start as a service
# Verify it's running: check Services in Task Manager
```

**Or manually start MongoDB:**
```bash
# Find MongoDB installation directory and run:
mongod
```

### Method 1: Run Both Backend and Frontend (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Access the application:**
- Frontend: `http://localhost:3000` 🌐
- Backend API: `http://localhost:5000/api` 🔌
- Health Check: `http://localhost:5000/api/health` ✅

### Method 2: Using Batch Scripts (Windows)

Create `start-backend.bat`:
```batch
@echo off
cd backend
npm install
npm start
pause
```

Create `start-frontend.bat`:
```batch
@echo off
cd frontend
npm install
npm run dev
pause
```

Run both batch files in separate windows.

### Initial Setup: Create Dummy Data

Once both backend and frontend are running:

1. Open `http://localhost:3000` in your browser
2. Click the **"🔄 Initialize Demo Data"** button on the Dashboard
3. This creates 15 sample bins around Mumbai with random fill levels

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. **Add Bin Data**
```http
POST /api/bins
Content-Type: application/json

{
  "bin_id": "BIN-001",
  "fill_level": 75,
  "lat": 19.0760,
  "lng": 72.8777
}

Response: 201 Created
{
  "success": true,
  "message": "Bin added successfully",
  "data": { ... }
}
```

#### 2. **Get All Bins**
```http
GET /api/bins

Response: 200 OK
{
  "success": true,
  "count": 15,
  "data": [ { ... }, { ... } ]
}
```

#### 3. **Get Full Bins (fill_level > 80)**
```http
GET /api/bins/full

Response: 200 OK
{
  "success": true,
  "count": 3,
  "data": [ { bin_id: "BIN-003", fill_level: 85 }, ... ]
}
```

#### 4. **Get Dashboard Statistics**
```http
GET /api/bins/stats

Response: 200 OK
{
  "success": true,
  "stats": {
    "totalBins": 15,
    "fullBins": 3,
    "halfFullBins": 6,
    "emptyBins": 6,
    "averageFillLevel": 45.2
  }
}
```

#### 5. **Get Optimized Route**
```http
GET /api/route

Response: 200 OK
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
      ...
    ],
    "summary": {
      "total_bins": 3,
      "total_distance_km": 18.45,
      "estimated_time_minutes": 55,
      "depot": { "lat": 19.0760, "lng": 72.8777 }
    }
  }
}
```

#### 6. **Clear a Bin**
```http
DELETE /api/bins/:bin_id

Response: 200 OK
{
  "success": true,
  "message": "Bin cleared successfully",
  "data": { bin_id: "BIN-001", fill_level: 0, status: "empty" }
}
```

#### 7. **Initialize Dummy Data**
```http
POST /api/init

Response: 200 OK
{
  "success": true,
  "message": "Database initialized with dummy data"
}
```

#### 8. **Health Check**
```http
GET /api/health

Response: 200 OK
{
  "status": "Server is running",
  "timestamp": "2024-04-10T12:00:00.000Z",
  "environment": "development"
}
```

## Frontend Features

### Dashboard Page (`/`)

**Displays:**
- 📊 Total bins count
- 🚨 Full bins count (fill_level > 80)
- ⚠️ Half-full bins count (40-80%)
- ✅ Empty bins count
- 📈 Average fill level percentage

**Components:**
- StatCard: Shows key metrics
- SimpleMap: SVG visualization of bin locations
- BinList: Scrollable list of all bins
- BinCard: Individual bin information with fill-level bar

**Features:**
- Auto-refresh every 5 seconds
- Color-coded status badges (🚨 Red for full, ⚠️ Orange for half-full, ✅ Green for empty)
- Initialize demo data button
- Error handling and loading states

### Route Optimization Page (`/route`)

**Displays:**
- 🚗 Optimized collection route
- 📍 Map with route path visualization
- 📋 Step-by-step collection order
- 📊 Route summary (distance, time, stops)
- 🤖 Algorithm explanation

**Components:**
- SimpleMap: Displays full bins and route path
- RouteCard: Individual stop information
- Summary stats: Distance, time, number of stops

**Features:**
- Click "Optimize Route" to generate collection path
- Visual route line on map
- Distance between each stop
- Numbered stop order
- Estimated collection time

## Backend Features

### Models

#### Bin Schema (MongoDB)
```javascript
{
  bin_id: String (unique),
  fill_level: Number (0-100),
  lat: Number,
  lng: Number,
  status: String (enum: 'empty', 'half-full', 'full'),
  last_emptied: Date (optional),
  timestamp: Date (default: now),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Controllers

#### binController.js
- `addBin()`: Add or update bin data
- `getAllBins()`: Fetch all bins
- `getFullBins()`: Fetch bins with fill_level > 80
- `getOptimizedRoute()`: Generate optimized collection route
- `getDashboardStats()`: Get aggregated statistics
- `clearBin()`: Mark bin as emptied

### Routes

#### routes/bins.js
- POST `/api/bins` - Add bin
- GET `/api/bins` - Get all bins
- GET `/api/bins/stats` - Get statistics
- GET `/api/bins/full` - Get full bins
- GET `/api/bins/:bin_id` - Get specific bin
- DELETE `/api/bins/:bin_id` - Clear bin

#### routes/routes.js
- GET `/api/route` - Get optimized route

## Route Optimization Algorithm

### Algorithm: Nearest Neighbor (Greedy Algorithm)

**Time Complexity:** O(n²)
**Space Complexity:** O(n)

**How It Works:**

1. **Start Point:** Fixed depot at Mumbai coordinates (19.0760°N, 72.8777°E)
2. **Bin Selection:** Only bins with fill_level > 80% are considered
3. **Distance Calculation:** Uses Haversine formula for great-circle distance
4. **Iteration:**
   - Start at depot
   - Find the nearest unvisited full bin
   - Add it to the route
   - Mark as visited
   - Move to that bin's location
   - Repeat until all full bins visited
5. **End Point:** Return to depot

**Haversine Formula:**
```
d = 2 * R * asin(√(sin²(Δlat/2) + cos(lat1) * cos(lat2) * sin²(Δlng/2)))

Where:
- R = 6371 km (Earth's radius)
- Δlat = lat2 - lat1
- Δlng = lng2 - lng1
```

**Example Route:**
```
Depot → BIN-005 (4.23 km) → BIN-012 (3.15 km) → BIN-008 (5.67 km) → Depot (6.40 km)
Total Distance: 19.45 km
Estimated Time: 58 minutes (at 20 km/h)
```

## Project Structure

```
fieldproject/
├── backend/
│   ├── models/
│   │   └── Bin.js               # MongoDB Bin schema
│   ├── routes/
│   │   ├── bins.js              # Bin endpoints
│   │   └── routes.js            # Route optimization endpoint
│   ├── controllers/
│   │   └── binController.js     # Business logic
│   ├── utils/
│   │   ├── routeOptimizer.js    # Nearest Neighbor algorithm
│   │   └── dummyData.js         # Sample data generator
│   ├── server.js                # Express app entry point
│   ├── package.json
│   └── .env                     # Configuration
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BinCard.jsx      # Individual bin display
│   │   │   ├── BinCard.css
│   │   │   ├── BinList.jsx      # Bin list container
│   │   │   ├── BinList.css
│   │   │   ├── SimpleMap.jsx    # SVG map visualization
│   │   │   ├── SimpleMap.css
│   │   │   ├── StatCard.jsx     # Metric card
│   │   │   ├── stats-card.css
│   │   │   ├── RouteCard.jsx    # Route stop card
│   │   │   └── RouteCard.css
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   ├── Dashboard.css
│   │   │   ├── RouteOptimization.jsx  # Route page
│   │   │   └── RouteOptimization.css
│   │   ├── utils/
│   │   │   └── apiClient.js     # Axios configuration
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
└── README.md                    # This file
```

## Sample Data

### Dummy Bins Created

The system creates 15 bins around Mumbai with realistic locations:

| Bin ID | Area | Coordinates |
|--------|------|-------------|
| BIN-001 | Central Mumbai | 19.0760, 72.8777 |
| BIN-002 | Fort | 19.0826, 72.8756 |
| BIN-003 | Bandra | 19.0836, 72.8193 |
| BIN-004 | Dadar | 19.1136, 72.8697 |
| BIN-005 | Chembur | 19.1356, 72.8477 |
| ... | ... | ... |

Fill levels are randomly generated with realistic distribution:
- 50% chance: 0-40% (empty)
- 30% chance: 40-80% (half-full)
- 20% chance: 80-100% (full)

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running
```bash
# Windows:
mongo # or mongod
# macOS:
brew services start mongodb-community
```

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:** Change the port in `.env` or kill the process:
```bash
# Find process on port 5000:
netstat -ano | findstr :5000
# Kill process:
taskkill /PID <PID> /F
```

### CORS Error
If frontend can't reach backend, ensure CORS is enabled in `server.js`:
```javascript
app.use(cors());
```

### Dependencies Not Installed
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### API Not Responding
1. Check if backend is running: `http://localhost:5000/api/health`
2. Check console for errors
3. Verify MongoDB is connected
4. Check firewall settings

## Performance Tips

1. **MongoDB Indexing:** Indexes are automatically created on fill_level and timestamp
2. **Route Optimization:** Suitable for up to 100 bins; for more, consider TSP optimization
3. **Frontend Refresh:** Dashboard auto-refreshes every 5 seconds; adjust if needed
4. **API Response Time:** Typically < 100ms for all queries

## Future Enhancements

- 🗺️ Integration with Google Maps API
- 📱 Mobile app using React Native
- 🔔 Real-time notifications with Socket.io
- 📈 Advanced analytics and reporting
- 🚀 ML-based route optimization (Genetic Algorithm)
- 🔐 User authentication and authorization
- 📊 Dashboard metrics export (PDF, CSV)
- 🌍 Multi-language support

## Security Notes

⚠️ **For Development Only**

This is a demonstration project. For production:
- Use environment variables for all secrets
- Implement authentication (JWT)
- Validate all user inputs
- Use HTTPS/SSL
- Implement rate limiting
- Add request validation middleware
- Use API key authentication
- Enable helmet.js for security headers

## License

MIT License - Feel free to use this project for learning and development.

## Support

For issues or questions:
1. Check this README thoroughly
2. Review the code comments
3. Check backend console for errors
4. Check browser console for frontend errors
5. Verify all prerequisites are installed

---

**Happy Coding! 🚀**

Built with ❤️ using MERN Stack
