#!/bin/bash

# Start Frontend Server
# Smart Waste Management System

echo ""
echo "===================================================="
echo "  Smart Waste Management System - Frontend"
echo "===================================================="
echo ""

cd frontend

if [ ! -d "node_modules" ]; then
    echo ""
    echo "Installing dependencies..."
    npm install
    echo "Dependencies installed!"
fi

echo ""
echo "Starting frontend server..."
echo ""
echo "✅ Frontend URL: http://localhost:3000"
echo ""

npm run dev
