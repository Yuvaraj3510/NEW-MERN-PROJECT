@echo off
title DistrictPulse MERN Project Launcher
echo ====================================================================
echo             DISTRICTPULSE - MERN EVENT & TICKETING HUB
echo ====================================================================
echo.
echo [1/3] Checking Backend Dependencies...
cd /d "%~dp0backend"
if not exist "node_modules\" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies ready!
)

echo.
echo [2/3] Checking Frontend Dependencies...
cd /d "%~dp0frontend"
if not exist "node_modules\" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies ready!
)

echo.
echo [3/3] Launching DistrictPulse MERN Ecosystem...
echo.
echo Starting Backend API Server (Port 5000)...
start "DistrictPulse Backend API" cmd /k "cd /d "%~dp0backend" && npm start"

timeout /t 2 >nul

echo Starting Frontend UI Dev Server (Port 3000)...
start "DistrictPulse Frontend UI" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ====================================================================
echo  DistrictPulse is launching!
echo  - Frontend Web App: http://localhost:3000
echo  - Backend API:      http://localhost:5000/api/health
echo.
echo  Demo Credentials:
echo  - Admin Account:  admin@districtpulse.io  / admin123
echo  - User Account:   user@districtpulse.io   / user123
echo ====================================================================
echo.
pause
