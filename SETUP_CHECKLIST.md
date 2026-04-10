# 🎯 Project Checklist & Setup Guide

Complete checklist and setup verification for Smart Waste Management System.

## ✅ Pre-Installation Checklist

Before you start, verify all prerequisites:

- [ ] **Node.js** is installed (v16+)
  ```bash
  node --version  # Should be v16.0.0 or higher
  npm --version   # Should be v7.0.0 or higher
  ```

- [ ] **MongoDB** is installed and running
  ```bash
  mongosh  # or mongo
  > db.version()  # Should return version
  ```

- [ ] **Git** is installed (optional but recommended)
  ```bash
  git --version
  ```

- [ ] You have admin access to install packages

- [ ] Ports 5000 and 3000 are available
  ```bash
  netstat -ano | findstr :5000
  netstat -ano | findstr :3000
  # Should return nothing if ports are free
  ```

## 📦 Installation Checklist

Follow these steps in order:

### Step 1: Prepare Directories
- [ ] Navigate to project root:
  ```bash
  cd c:\Users\STUDENT.INFT505-15\Documents\d10b-58\fieldproject
  ```

- [ ] Verify the structure exists:
  ```bash
  ls -la  # Should show: backend, frontend, README.md, etc.
  ```

### Step 2: Backend Setup
- [ ] Navigate to backend:
  ```bash
  cd backend
  ```

- [ ] Verify `.env` file exists and contains:
  ```
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/smart-waste-management
  NODE_ENV=development
  ```

- [ ] Install dependencies:
  ```bash
  npm install
  ```

- [ ] Verify packages installed:
  ```bash
  ls -la node_modules/  # Should have express, mongoose, cors, dotenv
  ```

### Step 3: Frontend Setup
- [ ] Navigate to frontend:
  ```bash
  cd ../frontend
  ```

- [ ] Install dependencies:
  ```bash
  npm install
  ```

- [ ] Verify packages installed:
  ```bash
  ls -la node_modules/  # Should have react, axios, vite
  ```

## 🚀 Pre-Launch Checklist

Before starting the application:

### MongoDB Setup
- [ ] Start MongoDB service:
  ```bash
  mongod  # or in Windows Services, ensure MongoDB is running
  ```

- [ ] Verify MongoDB is responding:
  ```bash
  mongosh
  > use admin
  > db.runCommand("ping")
  # Should return { ok: 1 }
  ```

### Backend Pre-Check
- [ ] Verify all files exist:
  ```bash
  backend/
  ├── server.js           ✓
  ├── package.json        ✓
  ├── .env                ✓
  ├── models/Bin.js       ✓
  ├── controllers/        ✓
  ├── routes/             ✓
  └── utils/              ✓
  ```

- [ ] Verify no node_modules issues:
  ```bash
  npm list  # in backend directory
  ```

### Frontend Pre-Check
- [ ] Verify all files exist:
  ```bash
  frontend/
  ├── vite.config.js      ✓
  ├── index.html          ✓
  ├── src/App.jsx         ✓
  ├── src/main.jsx        ✓
  ├── src/pages/          ✓
  ├── src/components/     ✓
  └── src/utils/          ✓
  ```

- [ ] Verify no node_modules issues:
  ```bash
  npm list  # in frontend directory
  ```

## ▶️ Launch Checklist

Ready to start the application:

### Terminal 1: Backend
- [ ] Navigate to backend:
  ```bash
  cd backend
  ```

- [ ] Start development server:
  ```bash
  npm run dev
  ```

- [ ] Expected output:
  ```
  ✅ MongoDB Connected Successfully
  🚀 Server running on: http://localhost:5000
  📊 Database: mongodb://localhost:27017/smart-waste-management
  ```

- [ ] Test backend is responding:
  ```bash
  curl http://localhost:5000/api/health
  # Should return JSON with status "Server is running"
  ```

### Terminal 2: Frontend
- [ ] Navigate to frontend:
  ```bash
  cd frontend
  ```

- [ ] Start development server:
  ```bash
  npm run dev
  ```

- [ ] Expected output:
  ```
  VITE v4.x.x  ready in xxx ms
  ➜  Local:   http://localhost:3000
  ```

### Browser
- [ ] Open http://localhost:3000
- [ ] Should see the Smart Waste Management dashboard
- [ ] Navigation bar is visible at top
- [ ] Dashboard page is loaded

## ✨ Feature Checklist

### Dashboard Features
- [ ] Dashboard page displays correctly
- [ ] Statistics cards show (Total, Full, Half-Full, Empty, Avg Fill)
- [ ] "Initialize Demo Data" button is visible and clickable
- [ ] Click button to create sample data
- [ ] Bins list appears after initialization
- [ ] Map visualization shows bin locations
- [ ] Each bin card shows fill level with color indicator
- [ ] Red highlighting for full bins (>80%)

### Route Optimization Features
- [ ] Route Optimization tab is accessible
- [ ] "Optimize Route" button is visible
- [ ] Click button to generate route
- [ ] Route summary shows (Bins, Distance, Time)
- [ ] Route steps are listed with order numbers
- [ ] Map shows route visualization
- [ ] Algorithm explanation is visible

### Data Features
- [ ] Sample bins are created with realistic data
- [ ] Fill levels are randomly varied
- [ ] Coordinates are within Mumbai area
- [ ] Timestamps are current
- [ ] Status badges display correctly

### API Features
- [ ] Backend returns data correctly
- [ ] CORS is working (no console errors)
- [ ] Real-time auto-refresh works (5 second interval)
- [ ] Loading states appear during fetch

## 🧪 Testing Checklist

### Manual Testing
- [ ] Add custom bin data via API:
  ```bash
  curl -X POST http://localhost:5000/api/bins \
    -H "Content-Type: application/json" \
    -d '{"bin_id":"TEST-001","fill_level":95,"lat":19.0760,"lng":72.8777}'
  ```

- [ ] Frontend immediately shows the new bin
- [ ] Route optimization includes the new full bin
- [ ] Statistics update correctly

### Browser Console
- [ ] No JavaScript errors
- [ ] No CORS errors
- [ ] API requests show in Network tab
- [ ] Response status is 200 OK

### Database Verification
- [ ] Connect to MongoDB:
  ```bash
  mongosh
  > use smart-waste-management
  > db.bins.find()  # Should show collections
  > db.bins.count()  # Should show count > 0
  ```

## 📊 Performance Checklist

- [ ] Dashboard loads in < 2 seconds
- [ ] Route optimization completes in < 1 second
- [ ] No console warnings or errors
- [ ] API responses < 100ms
- [ ] Memory usage is reasonable (~150MB for Node, ~300MB for React)

## 🐛 Troubleshooting Checklist

If something doesn't work:

### MongoDB Issues
- [ ] Is MongoDB running? (Check Services or run `mongod`)
- [ ] Is port 27017 available?
- [ ] Check connection string in `.env`
- [ ] Can you connect with mongosh?

### Backend Issues
- [ ] Is Node running? (Check terminal for errors)
- [ ] Are all dependencies installed? (`npm list`)
- [ ] Is port 5000 available?
- [ ] Check backend console for error messages
- [ ] Try: `npm install` again

### Frontend Issues
- [ ] Is Node running? (Check terminal for errors)
- [ ] Are all dependencies installed? (`npm list`)
- [ ] Is port 3000 available?
- [ ] Check browser console (F12)
- [ ] Try: Hard refresh (Ctrl+Shift+R)
- [ ] Try: `npm install` again

### API Connection Issues
- [ ] Backend is running on localhost:5000?
- [ ] Frontend API URL points to correct backend?
- [ ] CORS is enabled on backend?
- [ ] Check Network tab in DevTools

## 📚 Documentation Checklist

Review these files for more information:

- [ ] [README.md](./README.md) - Complete documentation
- [ ] [QUICKSTART.md](./QUICKSTART.md) - 5-minute setup
- [ ] [API_REFERENCE.md](./API_REFERENCE.md) - All endpoints
- [ ] Backend code comments for business logic
- [ ] Frontend code comments for UI components

## 🎓 Learning Path

After setup, explore in this order:

1. [ ] Understand project structure (README.md)
2. [ ] Test all API endpoints (API_REFERENCE.md)
3. [ ] Explore backend code:
   - [ ] `server.js` - Server setup
   - [ ] `models/Bin.js` - Database schema
   - [ ] `controllers/binController.js` - Business logic
   - [ ] `utils/routeOptimizer.js` - Algorithm

4. [ ] Explore frontend code:
   - [ ] `App.jsx` - Main component
   - [ ] `pages/Dashboard.jsx` - Dashboard logic
   - [ ] `pages/RouteOptimization.jsx` - Route logic
   - [ ] `components/` - Reusable components

5. [ ] Try modifying:
   - [ ] Change dummy data locations
   - [ ] Add new fields to bin schema
   - [ ] Modify UI styling
   - [ ] Experiment with route algorithm

## ✅ Final Verification

System is ready when:

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] MongoDB connected and responding
- [ ] Dashboard shows sample data
- [ ] Route optimization works
- [ ] No errors in console
- [ ] All pages are responsive
- [ ] Data updates in real-time

## 🎉 Deployment Checklist

When ready for production:

- [ ] Review [Security Notes](./README.md#security-notes)
- [ ] Use environment variables for secrets
- [ ] Add authentication (JWT tokens)
- [ ] Enable HTTPS/SSL
- [ ] Set up proper error logging
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Use helmet.js for headers
- [ ] Deploy backend (Heroku, AWS, etc.)
- [ ] Deploy frontend (Netlify, Vercel, etc.)
- [ ] Update API URLs for production

---

**✓ All systems go! Ready to manage waste smartly! 🚮**
