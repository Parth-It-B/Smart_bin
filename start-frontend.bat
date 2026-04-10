@echo off
REM Start Frontend Server
REM Smart Waste Management System

echo.
echo ====================================================
echo  Smart Waste Management System - Frontend
echo ====================================================
echo.

cd frontend

echo Checking if node_modules exists...
if not exist "node_modules" (
    echo.
    echo Installing dependencies...
    call npm install
    echo Dependencies installed!
)

echo.
echo Starting frontend server...
echo.
echo ✅ Frontend URL: http://localhost:3000
echo.

call npm run dev

pause
