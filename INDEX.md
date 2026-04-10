# 🚮 Smart Waste Management System - MERN Stack

## 🎯 Complete IoT Smart Waste Management System

Welcome! This is a **production-ready**, **fully-functional** IoT Smart Waste Management System built with the MERN stack (MongoDB, Express, React, Node.js).

### ⭐ What You Get

✅ Complete backend with Express + MongoDB  
✅ Modern React frontend with Vite  
✅ AI-powered route optimization (Nearest Neighbor)  
✅ Real-time bin monitoring dashboard  
✅ SVG-based map visualization  
✅ Dummy data generator for testing  
✅ Complete documentation & guides  
✅ Ready to run - no additional setup needed!

---

## 🚀 Quick Start (Choose Your Path)

### ⚡ **5-Minute Start**
👉 **Read:** [QUICKSTART.md](./QUICKSTART.md)  
Perfect if you just want to see it running!

### 📚 **Complete Setup**
👉 **Read:** [README.md](./README.md)  
Full documentation with architecture, features, and troubleshooting

### 🔌 **API Integration**
👉 **Read:** [API_REFERENCE.md](./API_REFERENCE.md)  
Complete API endpoint documentation with examples

### ✅ **Verification Checklist**
👉 **Read:** [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)  
Step-by-step verification of all components

### 📋 **Project Overview**
👉 **Read:** [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)  
File inventory and complete project structure

---

## 💻 System Requirements

```
✓ Node.js v16+
✓ MongoDB (running)
✓ 500MB free disk space
✓ Ports 5000 & 3000 available
```

### Pre-Setup Verification

```bash
# Check Node.js
node --version  # Should be v16+
npm --version   # Should be v7+

# Check MongoDB is running
mongosh
> db.version()  # Should return version
> exit
```

---

## ⏩ Get Started Right Now

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Step 3: Start Backend (Terminal 1)
```bash
cd backend
npm run dev
# 🟢 Should show: ✅ MongoDB Connected Successfully
# 🟢 Should show: 🚀 Server running on: http://localhost:5000
```

### Step 4: Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
# 🟢 Should show: ➜  Local:   http://localhost:3000
```

### Step 5: Open Browser
👉 Go to: **http://localhost:3000**

### Step 6: Initialize Demo Data
Click the **"🔄 Initialize Demo Data"** button

✅ **Done!** System is ready!

---

## 🎮 Using the System

### Dashboard Page
- View total bins, full bins, statistics
- See real-time bin monitoring
- Monitor average fill level
- Visual map of all bins

### Route Optimization Page
- Click "Optimize Route" button
- Get AI-optimized collection path
- See distance & time estimates
- View step-by-step route

### Features
- **Auto-refresh:** Dashboard updates every 5 seconds
- **Real-time:** See data changes instantly
- **Responsive:** Works on desktop and mobile
- **Visual:** Color-coded status indicators

---

## 📂 Project Structure

```
fieldproject/
├── 📘 README.md                    Main documentation
├── 📗 QUICKSTART.md               5-minute setup
├── 📙 API_REFERENCE.md            API documentation
├── 📕 SETUP_CHECKLIST.md          Verification guide
├── 📓 PROJECT_SUMMARY.md          File inventory
│
├── 🚀 start-backend.bat           Windows launcher
├── 🚀 start-frontend.bat          Windows launcher
│
├── backend/                        Express + MongoDB
│   ├── server.js                   Main server
│   ├── package.json                Dependencies
│   ├── .env                        Configuration
│   ├── models/                     Database schemas
│   ├── routes/                     API endpoints
│   ├── controllers/                Business logic
│   └── utils/                      Helpers (routing algorithm)
│
└── frontend/                       React + Vite
    ├── vite.config.js              Vite config
    ├── index.html                  HTML entry
    ├── package.json                Dependencies
    └── src/                        React code
        ├── components/             Reusable components
        ├── pages/                  Page components
        ├── utils/                  API client
        ├── App.jsx                 Main app
        └── main.jsx                Entry point
```

---

## 🔌 API Endpoints

### Bin Management
```
POST   /api/bins              Add bin data
GET    /api/bins              Get all bins
GET    /api/bins/full         Get full bins
GET    /api/bins/stats        Get statistics
DELETE /api/bins/:bin_id      Clear a bin
```

### Route Optimization
```
GET    /api/route             Get optimized route
```

### System
```
POST   /api/init              Initialize demo data
GET    /api/health            Health check
```

👉 **Full documentation:** [API_REFERENCE.md](./API_REFERENCE.md)

---

## 🤖 Route Optimization Algorithm

**Algorithm:** Nearest Neighbor (Greedy Algorithm)

How it works:
1. Start at depot (19.0760°N, 72.8777°E)
2. Find nearest unvisited FULL bin (>80%)
3. Add to route, mark as visited
4. Move to that bin, repeat
5. Return to depot

**Distance:** Haversine formula (great-circle)  
**Complexity:** O(n²)  
**Suitable for:** Up to 100 bins  

---

## 🧪 Test the API

### Using cURL
```bash
# Get all bins
curl http://localhost:5000/api/bins

# Get full bins
curl http://localhost:5000/api/bins/full

# Get optimized route
curl http://localhost:5000/api/route

# Add a bin
curl -X POST http://localhost:5000/api/bins \
  -H "Content-Type: application/json" \
  -d '{
    "bin_id": "TEST-001",
    "fill_level": 95,
    "lat": 19.0760,
    "lng": 72.8777
  }'
```

---

## 📊 Sample Data

The demo includes **15 bins** around Mumbai with:
- Real GPS coordinates
- Random fill levels (0-100%)
- Realistic bin IDs (BIN-001, BIN-002, etc.)
- Current timestamps

Fill distribution:
- 50% empty (0-40%)
- 30% half-full (40-80%)
- 20% full (80-100%)

---

## 🐛 Common Issues & Solutions

### MongoDB not found
```bash
# Start MongoDB
mongod  # or check Services on Windows
```

### Port 5000 in use
```bash
# Change PORT in backend/.env
PORT=5001
```

### Port 3000 in use
Vite will automatically use next available port (3001, 3002, etc.)

### CORS Error
Backend CORS is enabled by default, no changes needed

### Blank screen
Check browser console (F12) for errors

👉 **Full troubleshooting:** [README.md#troubleshooting](./README.md#troubleshooting)

---

## 📚 Documentation Roadmap

1. **First Time?** → [QUICKSTART.md](./QUICKSTART.md)
2. **Need Full Details?** → [README.md](./README.md)
3. **Integrating APIs?** → [API_REFERENCE.md](./API_REFERENCE.md)
4. **Checking Setup?** → [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
5. **File Details?** → [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

---

## ✨ Key Features

### Real-Time Monitoring
- 📊 Live bin statistics
- 🔄 Auto-refresh every 5 seconds
- 📈 Average fill level tracking
- 🚨 Full bin alerts

### Dashboard
- 📍 Visual bin distribution
- 📋 Detailed bin list
- 🎨 Color-coded status
- 📱 Responsive design

### Route Optimization
- 🤖 AI-powered Nearest Neighbor algorithm
- 📍 Turn-by-turn route display
- 📊 Distance & time estimates
- 🗺️ Visual route mapping

### Backend
- 🔐 Express + MongoDB
- 📝 Clean MVC architecture
- ⚡ RESTful APIs
- 🛡️ Error handling

### Frontend
- ⚛️ Modern React
- 🚀 Vite build tool
- 📱 Mobile responsive
- 🎨 Beautiful UI

---

## 🎓 Learning Outcomes

By exploring this system, you'll learn:

✅ **Backend Development**
- Express.js REST APIs
- MongoDB with Mongoose
- MVC architecture
- Algorithm implementation

✅ **Frontend Development**
- React functional components
- Vite build tool
- Axios API integration
- Responsive design

✅ **Full Stack**
- End-to-end data flow
- CORS & API integration
- Real-time updates
- Error handling

✅ **IoT & Algorithms**
- IoT sensor simulation
- Route optimization
- Geolocation & distance
- Greedy algorithms

---

## 🚀 What's Next?

After setup, try:

1. **Modify dummy data** - Change bin locations/fill levels
2. **Add new fields** - Extend bin schema
3. **Customize UI** - Change colors/layout
4. **Test API** - Use cURL or Postman
5. **Integrate** - Connect to external systems

---

## 💼 Production Ready?

This system includes production-ready features:

✅ Error handling  
✅ Environment configuration  
✅ Database indexing  
✅ API validation  
✅ CORS setup  
✅ Logging  

For full production deployment:

⚠️ Add authentication (JWT)  
⚠️ Use HTTPS/SSL  
⚠️ Implement rate limiting  
⚠️ Add input validation  
⚠️ Use helmet.js  
⚠️ Enable logging service  

👉 See [Security Notes](./README.md#security-notes) in README

---

## 📞 Need Help?

### Documentation Resources
- 📖 [README.md](./README.md) - Complete guide
- ⚡ [QUICKSTART.md](./QUICKSTART.md) - Fast setup
- 🔌 [API_REFERENCE.md](./API_REFERENCE.md) - API docs
- ✅ [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - Verify setup

### Common Commands

**Backend**
```bash
cd backend
npm install      # Install dependencies
npm run dev      # Start with auto-reload
npm start        # Start production
```

**Frontend**
```bash
cd frontend
npm install      # Install dependencies
npm run dev      # Start with Vite
npm run build    # Build for production
```

### Testing
```bash
# Backend health
curl http://localhost:5000/api/health

# Frontend
http://localhost:3000
```

---

## 📋 Checklist Before Starting

- [ ] Node.js v16+ installed
- [ ] MongoDB installed and running
- [ ] Ports 5000 & 3000 available
- [ ] Read one of the guides above
- [ ] Ready to explore!

---

## 🎉 You're All Set!

Your complete, production-ready IoT Smart Waste Management System is ready!

**Next Steps:**
1. Choose a guide above
2. Follow the setup instructions
3. Start the servers
4. Open http://localhost:3000
5. Click "Initialize Demo Data"
6. Explore the system!

---

## 📝 System Stats

```
✓ 43 total files
✓ 11 backend files
✓ 24 frontend files
✓ 5 documentation files
✓ 3 launcher scripts

✓ ~50 KB of clean code
✓ Fully commented
✓ Production patterns
✓ Best practices applied
```

---

## 🌟 Quick Links

| Resource | Purpose |
|----------|---------|
| [README.md](./README.md) | Complete documentation |
| [QUICKSTART.md](./QUICKSTART.md) | 5-minute setup |
| [API_REFERENCE.md](./API_REFERENCE.md) | API endpoints |
| [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) | Verification |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | File inventory |

---

**Built with ❤️ using MERN Stack**

**Happy Coding! 🚀**
