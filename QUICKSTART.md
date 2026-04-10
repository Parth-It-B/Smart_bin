# 🚀 Quick Start Guide

This guide will get you up and running in **5 minutes**.

## ✅ Prerequisites

- Node.js v16+ installed
- MongoDB running
- Windows machine

## 🎯 Step 1: Check MongoDB

```bash
# Start MongoDB (if not already running)
mongod
```

In a new terminal, verify MongoDB is running:
```bash
mongosh
> use admin
> db.runCommand("ping")
# Should return { ok: 1 }
```

## 📦 Step 2: Install Backend Dependencies

```bash
# Navigate to backend
cd backend

# Install packages
npm install

# This installs:
# ✓ express (web server)
# ✓ mongoose (database)
# ✓ cors (cross-origin)
# ✓ dotenv (config)
```

## 🎨 Step 3: Install Frontend Dependencies

```bash
# Navigate to frontend (from project root)
cd ../frontend

# Install packages
npm install

# This installs:
# ✓ react
# ✓ axios (HTTP client)
# ✓ vite (build tool)
```

## ▶️ Step 4: Start Backend

```bash
cd backend
npm run dev
# Expected output:
# ✅ MongoDB Connected Successfully
# 🚀 Server running on: http://localhost:5000
```

## ▶️ Step 5: Start Frontend (in NEW TERMINAL)

```bash
cd frontend
npm run dev
# Expected output:
# VITE v4.x.x  ready in xxx ms
# ➜  Local:   http://localhost:3000
```

## 🌐 Step 6: Open in Browser

Go to: **http://localhost:3000**

## 📊 Step 7: Initialize Demo Data

Click "🔄 Initialize Demo Data" button

This creates 15 sample bins with random fill levels.

## 🎉 Done!

You should now see:
- ✅ Dashboard with bin statistics
- ✅ Real-time bin monitoring
- ✅ Map visualization
- ✅ Route optimization

## 🧪 Test the System

### Dashboard
1. View total bins, full bins, statistics
2. See all bins in list and on map
3. Auto-refresh every 5 seconds

### Route Optimization
1. Click "🚗 Route Optimization" tab
2. Click "🎯 Optimize Route" button
3. See optimized collection route
4. View distance and time estimates

## 📝 API Testing

Test backend directly:

```bash
# Get all bins
curl http://localhost:5000/api/bins

# Get full bins
curl http://localhost:5000/api/bins/full

# Get route
curl http://localhost:5000/api/route

# Health check
curl http://localhost:5000/api/health
```

## ⚡ Common Commands

**Backend:**
```bash
cd backend
npm run dev      # Development mode with auto-reload
npm start        # Production mode
```

**Frontend:**
```bash
cd frontend
npm run dev      # Development with Vite hot reload
npm run build    # Production build
npm run preview  # Preview build
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB not found | Start MongoDB: `mongod` |
| Port 5000 in use | Change PORT in `.env` |
| Port 3000 in use | Vite will use next available port |
| CORS error | Backend CORS is enabled by default |
| Blank screen | Check browser console for errors |

## 📚 Next Steps

1. Read [README.md](./README.md) for full documentation
2. Explore the code structure
3. Modify dummy data in `backend/utils/dummyData.js`
4. Customize API in `backend/routes/`
5. Customize UI in `frontend/src/`

## 🎓 Learn More

- **Backend Routes:** `backend/routes/` and `backend/controllers/`
- **Frontend Pages:** `frontend/src/pages/`
- **Styling:** `frontend/src/components/*.css`
- **API Client:** `frontend/src/utils/apiClient.js`
- **Route Algorithm:** `backend/utils/routeOptimizer.js`

---

**You're all set! Happy coding! 🚀**
