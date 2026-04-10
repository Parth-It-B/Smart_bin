#!/bin/bash

# Start Backend Server
# Smart Waste Management System

echo ""
echo "===================================================="
echo "  Smart Waste Management System - Backend"
echo "===================================================="
echo ""

cd backend

if [ ! -d "node_modules" ]; then
    echo ""
    echo "Installing dependencies..."
    npm install
    echo "Dependencies installed!"
fi

echo ""
echo "Starting backend server..."
echo ""
echo "✅ Backend URL: http://localhost:5000"
echo "✅ API Documentation: http://localhost:5000/api/health"
echo ""
echo "Waiting for connection to MongoDB..."
echo "If MongoDB is not running, start it first!"
echo ""

npm run dev
