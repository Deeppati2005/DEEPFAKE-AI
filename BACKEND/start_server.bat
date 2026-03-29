@echo off
REM Deepfake Detection Backend Startup Script

echo ========================================
echo   Deepfake Detection - Backend Server
echo ========================================
echo.
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b 1
)

echo Python found!
echo.
echo Checking dependencies...
pip list | findstr "Flask torch" >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies from requirements.txt...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   Starting Flask Server...
echo ========================================
echo.
echo Server will run on: http://localhost:5000
echo Health check: http://localhost:5000/health
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py
pause
