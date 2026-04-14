# 🏗️ System Architecture - Production Upgrade

## End-to-End Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    IoT DUSTBIN DEPLOYMENT FLOW                  │
└─────────────────────────────────────────────────────────────────┘

STEP 1: REGISTRATION (Admin/Dashboard)
────────────────────────────────────────
Web Browser (http://3000)
    │
    ├─→ Click "🗑️ Register Bin"
    │
    ├─→ Fill Form: Ward, Area, Lat, Lng
    │
    └─→ POST /api/dustbins
           │
           ↓
    [Backend: dustbinController]
           │
           ├─→ Generate: bin_id = "MUM-WARD-AREA-BIN-0001"
           ├─→ Generate: device_key = "A1B2C3D4E5...P6"
           │
           └─→ Save to MongoDB
                   │
                   ↓
           █ Bin Record Created:
           {
             bin_id: "MUM-WARD-AREA-BIN-0001",
             device_key: "A1B2C3D4E5...P6",
             ward: "Ward-01",
             area: "Downtown",
             lat: 28.5355,
             lng: 77.3910,
             fill_level: 0,
             last_updated: 2024-04-14T10:30:00Z
           }

Response to Frontend:
    ├─→ Display bin_id
    ├─→ Display device_key
    ├─→ Show "Copy" buttons
    └─→ Ready for device deployment!


STEP 2: ESP8266 DEVICE DEPLOYMENT
────────────────────────────────────
Save Credentials from Step 1:
    BIN_ID = "MUM-WARD-AREA-BIN-0001"
    DEVICE_KEY = "A1B2C3D4E5...P6"

Configure Arduino Code:
    const char* BIN_ID = "MUM-WARD-AREA-BIN-0001";
    const char* DEVICE_KEY = "A1B2C3D4E5...P6";
    const char* SERVER = "https://backend.onrender.com/api/bins";

Power On Device:
    ├─→ Connect to WiFi
    ├─→ Read ultrasonic sensor
    ├─→ Calculate fill_level%
    └─→ Prepare update


STEP 3: REAL-TIME UPDATES (Every 60 seconds)
──────────────────────────────────────────────
ESP8266 Device Loop:
    │
    └─→ POST /api/bins
           {
             "bin_id": "MUM-WARD-AREA-BIN-0001",
             "device_key": "A1B2C3D4E5...P6",
             "fill_level": 65
           }
           │
           ↓
    [Backend: binController.updateBin()]
           │
           ├─→ Validate bin_id exists ✓
           ├─→ Validate device_key matches ✓
           ├─→ Validate fill_level 0-100 ✓
           │
           └─→ Update MongoDB Record:
               {
                 fill_level: 65,
                 last_updated: new Date()
               }
           │
           ↓
    Response to Device:
    {
      "success": true,
      "message": "Bin updated successfully"
    }


STEP 4: REAL-TIME DASHBOARD
────────────────────────────
Frontend Dashboard (Auto-refresh every 5 sec)
    │
    └─→ GET /api/bins
           │
           ↓
    [Backend: Get all bins from MongoDB]
           │
    Response:
    [{
      bin_id: "MUM-WARD-AREA-BIN-0001",
      fill_level: 65,
      ward: "Ward-01",
      area: "Downtown",
      last_updated: "2024-04-14T10:35:00Z",
      status: "HALF-FULL" (auto-calculated)
    }]
           │
           ↓
    Display on Frontend:
    ┌─────────────────────────────┐
    │ 🗑️ MUM-WARD-AREA-BIN-0001   │
    │ ⚠️ HALF-FULL (65%)          │
    │                              │
    │ ████████████░░░░ 65%        │
    │                              │
    │ Ward: Ward-01                │
    │ Area: Downtown               │
    │ Device Key: [••••••••••]     │
    │ Updated: 2024-04-14 10:35am  │
    └─────────────────────────────┘


STEP 5: COLLECTION OPTIMIZATION
────────────────────────────────
When fill_level > 80% detected:
    │
    └─→ GET /api/bins/route
           │
           ↓
    [Backend: Fetch all bins with fill_level > 80%]
           │
           ├─→ Use nearest-neighbor algorithm
           ├─→ Calculate optimal pickup route
           │
    Response:
    {
      "route": [
        {"bin_id": "BIN-001", "lat": 28.53, "lng": 77.39},
        {"bin_id": "BIN-003", "lat": 28.55, "lng": 77.40},
        {"bin_id": "BIN-005", "lat": 28.54, "lng": 77.38}
      ],
      "depot": {"lat": 19.0760, "lng": 72.8777}
    }
           │
           ↓
    Display Optimized Route on Map:
    HQ (Start) → BIN-001 → BIN-003 → BIN-005 → HQ (End)
```

---

## System Architecture Diagram

```
                        ┌─────────────────────────────────────┐
                        │    FRONTEND (React + Vite)          │
                        │  Deployed on Vercel/Netlify         │
                        ├─────────────────────────────────────┤
                        │ • Dashboard (live bin monitoring)    │
                        │ • Register Bin (auto-credentials)    │
                        │ • Route Optimization (map view)      │
                        └────────────────┬────────────────────┘
                                         │
                    HTTP/HTTPS API Calls │ (Port 3000 → 5000)
                                         │
                        ┌────────────────▼────────────────────┐
                        │   BACKEND (Node.js + Express)       │
                        │   Deployed on Render                │
                        ├─────────────────────────────────────┤
    ┌───────────────────│ Routes:                             │
    │                   │ • POST /api/dustbins (register)     │
    │                   │ • POST /api/bins (update with auth) │
    │                   │ • GET /api/bins (all bins)          │
    │                   │ • GET /api/bins/route (optimized)   │
    │                   └────────────────┬────────────────────┘
    │                                    │
    │ ┌──────────────────────────────────┼──────────────────────┐
    │ │                          MongoDB│                        │
    │ │                          Atlas  │                        │
    │ ├────────────────────────────────┼────────────────────────┤
    │ │ Bins Collection:               │                        │
    │ │ {                              │                        │
    │ │   _id,                         │                        │
    │ │   bin_id (unique),             │                        │
    │ │   device_key,                  │                        │
    │ │   ward,                        │                        │
    │ │   area,                        │                        │
    │ │   fill_level,                  │                        │
    │ │   lat, lng,                    │                        │
    │ │   last_updated                 │                        │
    │ │ }                              │                        │
    │ └────────────────────────────────┼────────────────────────┘
    │                                  │
    └──────────────────────────────────┘
                        ▲
                        │
         IoT Updates    │    HTTP POST to /api/bins
         (Device Auth)  │    with bin_id + device_key
                        │
                    ┌───┴───┐
                    │       │
            ESP8266 │     ESP8266 (etc)
            Device  │     Devices
            (BIN-1) │     (BIN-2, BIN-3...)
                    │
         Ultrasonic + GPS + WiFi Module
         Sends updates every 60 seconds
```

---

## Security Flow

```
ESP8266 Device wants to update fill_level:

        ┌─────────────────────┐
        │ Prepare JSON Payload│
        ├─────────────────────┤
        │ {                   │
        │  bin_id: "BIN-001",  │
        │  device_key: "ABC...",
        │  fill_level: 75     │
        │ }                   │
        └──────────┬──────────┘
                   │
        POST /api/bins
                   │
                   ▼
        ┌─────────────────────────┐
        │ Backend Validation      │
        ├─────────────────────────┤
        │ 1. Check bin_id exists? │
        │    └─→ No  → 404        │
        │    └─→ Yes → Continue   │
        │                         │
        │ 2. Check device_key?    │
        │    └─→ No  → 401        │
        │    └─→ Yes → Continue   │
        │                         │
        │ 3. Validate fill_level? │
        │    └─→ Invalid → 400    │
        │    └─→ Valid → Continue │
        │                         │
        │ 4. Update MongoDB       │
        │    └─→ Success ✓        │
        │                         │
        │ Response: 200 OK        │
        └─────────────────────────┘
```

---

## Database Relationships

```
MongoDB (smartbin database)
    │
    └─ Bins Collection
        │
        ├─ Document 1: MUM-WARD-01-DOWNTOWN-BIN-0001
        │   ├─ bin_id: "MUM-WARD-01-DOWNTOWN-BIN-0001" (unique index)
        │   ├─ device_key: "A1B2C3D4E5..." (secret)
        │   ├─ ward: "Ward-01"
        │   ├─ area: "Downtown"
        │   ├─ fill_level: 65 (index for sorting)
        │   ├─ lat: 28.5355
        │   ├─ lng: 77.3910
        │   └─ last_updated: 2024-04-14T10:35:00Z
        │
        ├─ Document 2: MUM-WARD-02-SUBURB-BIN-0001
        │   └─ [similar structure]
        │
        └─ Document 3: MUM-WARD-01-DOWNTOWN-BIN-0002
            └─ [similar structure]
```

---

## Deployment Environments

```
DEVELOPMENT
├─ Backend: http://localhost:5000
├─ Frontend: http://localhost:3000
├─ Database: MongoDB Atlas (shared)
└─ Quick iteration & testing

PRODUCTION
├─ Backend: https://smart-bin-0x48.onrender.com
├─ Frontend: https://your-site.vercel.app
├─ Database: MongoDB Atlas (same, production data)
└─ Live IoT devices sending data

MIGRATION:
Environment Variables:
├─ VITE_API_BASE_URL=http://localhost:5000/api (dev)
└─ VITE_API_BASE_URL=https://smart-bin-0x48.onrender.com (prod)
```

---

**System is production-ready and scalable! 🚀**
