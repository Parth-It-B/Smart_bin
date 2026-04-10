@echo off
REM Start Backend Server
REM Smart Waste Management System

echo.
echo ====================================================
echo  Smart Waste Management System - Backend
echo ====================================================
echo.

cd backend

echo Checking if node_modules exists...
if not exist "node_modules" (
    echo.
    echo Installing dependencies...
    call npm install
    echo Dependencies installed!
)

echo.
echo Starting backend server...
echo.
echo ✅ Backend URL: http://localhost:5000
echo ✅ API Documentation: http://localhost:5000/api/health
echo.
echo Waiting for connection to MongoDB...
echo If MongoDB is not running, start it first!
echo.

call npm run dev

pause
