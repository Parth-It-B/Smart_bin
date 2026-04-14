# 🚀 Quick Start - After Upgrade

## Backend Changes Summary

| Change                 | Location                                   | Description                                              |
| ---------------------- | ------------------------------------------ | -------------------------------------------------------- |
| New Dustbin Controller | `backend/controllers/dustbinController.js` | Handles bin registration with auto-generated credentials |
| Updated Bin Controller | `backend/controllers/binController.js`     | Now validates device_key + only updates existing bins    |
| New Dustbin Routes     | `backend/routes/dustbins.js`               | POST/GET/DELETE endpoints for bin management             |
| Updated Routes         | `backend/routes/bins.js`                   | Changed addBin → updateBin with authentication           |
| Updated Server         | `backend/server.js`                        | Added dustbins route mounting                            |

## Frontend Changes Summary

| Change                    | Location                                  | Description                                        |
| ------------------------- | ----------------------------------------- | -------------------------------------------------- |
| New DustbinForm Component | `frontend/src/components/DustbinForm.jsx` | Registration form with auto-display of credentials |
| Updated BinCard           | `frontend/src/components/BinCard.jsx`     | Shows device_key with toggle visibility            |
| Updated App               | `frontend/src/App.jsx`                    | Added "Register Bin" navigation page               |
| Updated API Client        | `frontend/src/utils/apiClient.js`         | Added dustbinAPI endpoints + uses .env             |

---

## 🚀 Deployment Steps

### Step 1: Test Locally

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Should see: ✅ MongoDB Connected Successfully
#            🚀 Server running on: http://localhost:5000
```

```bash
# Terminal 2 - Frontend
cd frontend
npm install
npm run dev

# Should see: ➜ Local: http://localhost:3000
```

### Step 2: Register Test Bin

1. Open http://localhost:3000
2. Click "🗑️ Register Bin"
3. Fill form:
   - Ward: Test-Ward
   - Area: Test-Area
   - Lat: 28.5355
   - Lng: 77.3910
4. Copy the displayed bin_id and device_key

### Step 3: Test Update Endpoint

```bash
curl -X POST http://localhost:5000/api/bins \
  -H "Content-Type: application/json" \
  -d '{
    "bin_id": "MUM-TEST-WARD-TEST-AREA-BIN-0001",
    "device_key": "YOUR_COPIED_KEY",
    "fill_level": 65
  }'
```

### Step 4: Deploy to Production

```bash
# Push changes
git add .
git commit -m "Upgrade to production system with device auth"
git push origin main

# Render auto-deploys backend
# Vercel/Netlify auto-deploys frontend

# Update frontend .env for production URL
VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
```

---

## ✅ Key Features

✅ **Auto-Generated Credentials**

- bin_id: `MUM-{WARD}-{AREA}-BIN-{count}`
- device_key: Random 32-byte hex string

✅ **Device Authentication**

- Only devices with correct device_key can update bins
- Prevents unauthorized sensor spoofing

✅ **No Duplicate Bins**

- One record per bin_id
- Updates only (no creates on /api/bins)

✅ **Real-Time Dashboard**

- Auto-refresh every 5 seconds
- Live bin status updates

✅ **Route Optimization**

- Nearest-neighbor algorithm
- Only for bins with fill_level > 80%

---

## 🔌 ESP8266 JSON Format

Devices should send:

```json
{
  "bin_id": "MUM-WARD-01-AREA-BIN-0001",
  "device_key": "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6",
  "fill_level": 65
}
```

To: `POST https://your-backend.onrender.com/api/bins`

---

## 📱 Frontend Navigation

```
Dashboard
  ├─ View all bins
  ├─ See statistics
  ├─ Auto-refresh (5 sec)
  └─ Display bin_id + device_key

Register Bin
  ├─ Input: ward, area, lat, lng
  ├─ Auto-generates: bin_id, device_key
  └─ Copy credentials for deployment

Route Optimization
  ├─ Shows bins with fill_level > 80%
  ├─ Calculates optimized route
  └─ Starting point: Mumbai HQ (19.0760, 72.8777)
```

---

## 🐛 Common Issues & Fixes

| Issue                       | Solution                                              |
| --------------------------- | ----------------------------------------------------- |
| device_key validation fails | Verify exact match (case-sensitive), check bin exists |
| Bins not updating           | Check network, verify POST to correct endpoint        |
| New bins not showing        | Refresh page or wait 5 seconds for auto-refresh       |
| Route empty                 | Register bin with fill_level > 80                     |
| Backend won't start         | Check MongoDB connection string in .env               |

---

## 📊 API Endpoints Reference

| Method | Endpoint                | Purpose                 |
| ------ | ----------------------- | ----------------------- |
| POST   | `/api/dustbins`         | Register new bin        |
| GET    | `/api/dustbins`         | List all bins           |
| GET    | `/api/dustbins/:bin_id` | Get specific bin        |
| DELETE | `/api/dustbins/:bin_id` | Delete bin              |
| POST   | `/api/bins`             | Update bin with auth ⚡ |
| GET    | `/api/bins`             | Get all bins            |
| GET    | `/api/bins/full`        | Get full bins (>80%)    |
| GET    | `/api/bins/stats`       | Get statistics          |
| GET    | `/api/bins/route`       | Get optimized route     |

⚡ = Requires device_key authentication

---

**Read [PRODUCTION_UPGRADE_GUIDE.md](./PRODUCTION_UPGRADE_GUIDE.md) for detailed setup!**
