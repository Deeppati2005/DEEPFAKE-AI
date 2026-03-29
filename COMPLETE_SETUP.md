# Deepfake Detection System - Complete Setup Guide

## ✅ What Has Been Done

I've successfully connected your frontend and backend with a complete Flask API for deepfake detection. Here's what was created:

### Backend Files (BACKEND folder)

1. **app.py** - The main Flask application featuring:
   - ✅ CORS enabled (allows requests from frontend)
   - ✅ Image upload endpoint (`/predict`)
   - ✅ Batch processing endpoint (`/batch-predict`)
   - ✅ Health check endpoint (`/health`)
   - ✅ Automatic GPU/CPU detection
   - ✅ Image preprocessing (224x224 resize, normalization)
   - ✅ PyTorch model loading and inference
   - ✅ Detailed logging for debugging

2. **requirements.txt** - All Python dependencies:
   - Flask (web framework)
   - Flask-CORS (enable cross-origin requests)
   - PyTorch (deep learning framework)
   - Pillow (image processing)
   - NumPy (numerical computing)

3. **README.md** - Backend documentation with API examples

4. **SETUP_GUIDE.md** - Detailed setup instructions

5. **start_server.bat** - Windows batch script to start the server easily

### Frontend Files (FRONTEND folder)

1. **src/config/apiConfig.ts** - Configuration file for:
   - API endpoint management
   - Request timeout settings
   - Image constraints (max size, allowed types)
   - Helper functions for API calls

## 🚀 How to Run Everything

### Step 1: Install Backend Dependencies (One-Time Setup)

Open PowerShell in the `BACKEND` folder:

```powershell
pip install -r requirements.txt
```

**Wait for installation to complete** (may take several minutes as PyTorch is large).

### Step 2: Start the Flask Backend

Option A - Using the batch script:
```powershell
.\start_server.bat
```

Option B - Direct Python command:
```powershell
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
 * Press CTRL+C to quit
```

### Step 3: Start the Frontend (in a NEW PowerShell window)

In the `FRONTEND` folder:

```powershell
npm run dev
```

You should see the Vite development server starting (typically on `http://localhost:5173`).

### Step 4: Test the System

1. Open your browser to the frontend URL (shown in terminal)
2. Click on "Deepfake Detection" in the navigation
3. Upload an image by:
   - Dragging it to the upload box, OR
   - Clicking "Browse Files"
4. Click "Detect Deepfake"
5. See the result with confidence score!

## 📊 System Data Flow

```
User Interface (React)
        ↓
DetectionPage.tsx
        ↓
    Image File
        ↓
API Request to http://localhost:5000/predict
        ↓
    Flask Backend (app.py)
        ↓
Image Preprocessing (resize, normalize)
        ↓
PyTorch Model (deepfake_model.pth)
        ↓
Prediction ("real" or "fake") + Confidence
        ↓
JSON Response
        ↓
Frontend Display (result card with confidence bar)
```

## 🔌 API Endpoints

Your backend now provides these endpoints:

### 1. Health Check
```
GET http://localhost:5000/health

Response:
{
  "status": "ok",
  "model_loaded": true
}
```

### 2. Single Image Detection
```
POST http://localhost:5000/predict

Form Data:
- image: <file>

Response:
{
  "prediction": "real",        // or "fake"
  "confidence": 0.95,          // 0 to 1
  "message": "This image appears to be real with 95.00% confidence"
}
```

### 3. Batch Detection
```
POST http://localhost:5000/batch-predict

Form Data:
- images: <multiple files>

Response:
{
  "results": [
    {"filename": "img1.jpg", "prediction": "real", "confidence": 0.95},
    {"filename": "img2.jpg", "prediction": "fake", "confidence": 0.87}
  ]
}
```

## 🛠️ Configuration

### Change Backend Port

Edit `app.py` line at the bottom:
```python
app.run(
    host='0.0.0.0',
    port=5000,  # Change this to your desired port
    debug=True,
    threaded=True
)
```

### Change API URL in Frontend

Create a `.env` file in the FRONTEND folder:
```
VITE_API_URL=http://localhost:5000
```

Or modify `src/config/apiConfig.ts`:
```typescript
BASE_URL: 'http://your-backend-url:5000'
```

## 📁 File Structure

```
HACK O NIT/
├── BACKEND/
│   ├── app.py                    ← Flask backend
│   ├── deepfake_model.pth        ← Your model
│   ├── requirements.txt          ← Dependencies
│   ├── README.md
│   ├── SETUP_GUIDE.md
│   └── start_server.bat          ← Easy startup
│
└── FRONTEND/
    ├── src/
    │   ├── components/
    │   │   ├── DetectionPage.tsx ← Main UI
    │   │   └── ... other components
    │   ├── config/
    │   │   └── apiConfig.ts      ← API configuration
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── vite.config.ts
    └── ... other config files
```

## 🐛 Troubleshooting

### Issue: "Connection Refused" or "Failed to fetch"
**Solution:**
1. Verify backend is running: `python app.py`
2. Check if port 5000 is in use: `netstat -ano | findstr :5000`
3. If occupied, change the port in `app.py`

### Issue: "Model not found" error
**Solution:**
1. Ensure `deepfake_model.pth` exists in BACKEND folder
2. Check file permissions (should be readable)
3. Verify file size is reasonable (>100MB expected)

### Issue: Image processing is very slow
**Solution:**
1. First run is slower (model initialization)
2. If using CPU: Install GPU version of PyTorch for speedup
3. Use smaller images for testing
4. Check system RAM usage

### Issue: CORS errors in browser console
**Solution:**
- Backend CORS is already configured
- Make sure you're accessing from `http://localhost` (not IP address)
- Clear browser cache and reload

## 🎨 Frontend Features Already Built

✅ **Drag & Drop Upload** - Intuitive image upload
✅ **Real-time Processing** - Shows loading animation
✅ **Colored Results** - Green for real, red for fake
✅ **Confidence Display** - Visual progress bar
✅ **Error Handling** - User-friendly error messages
✅ **Detection History** - Saves last 50 detections
✅ **Dark Mode** - Full dark/light theme support
✅ **Responsive Design** - Works on mobile and desktop

## 📝 Next Steps

1. **Test thoroughly:**
   - Upload various images (real photos, AI-generated)
   - Check confidence scores make sense
   - Monitor console for any errors

2. **Optimize (optional):**
   - Add GPU support for faster processing
   - Implement caching for repeated images
   - Add batch processing UI

3. **Deploy (future):**
   - Use production server (Gunicorn instead of Flask debug)
   - Add database for history storage
   - Deploy to cloud (Heroku, AWS, Azure, etc.)

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review error messages in console (browser DevTools + terminal)
3. Ensure all dependencies are installed
4. Restart both backend and frontend servers

---

**Everything is ready to go! Start with Step 1 above to get the system running.** 🚀
