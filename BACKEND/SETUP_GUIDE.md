# SETUP GUIDE - Deepfake Detection System

## Quick Start

### Step 1: Install Backend Dependencies

Open PowerShell in the BACKEND folder and run:

```powershell
pip install -r requirements.txt
```

**If you have a NVIDIA GPU** (optional - for faster processing):
```powershell
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

### Step 2: Start the Flask Backend

In the BACKEND folder, run:

```powershell
python app.py
```

You should see output like:
```
 * Running on http://0.0.0.0:5000
 * WARNING in app.run() is not recommended for production use. Use a production WSGI server instead.
```

### Step 3: Start the Frontend

Open a new PowerShell window in the FRONTEND folder and run:

```powershell
npm run dev
```

This will start your Vite development server.

### Step 4: Access the Application

1. Open your browser to `http://localhost:5173` (or whatever port Vite shows)
2. Navigate to the "Deepfake Detection" page
3. Upload an image by:
   - Dragging it to the upload area, or
   - Clicking "Browse Files" to select an image

## System Requirements

- **Python:** 3.8 or higher
- **Node.js:** 14 or higher
- **RAM:** 4GB minimum (8GB+ recommended)
- **GPU (optional):** NVIDIA GPU with CUDA support for faster processing

## Troubleshooting

### Backend won't start
- Make sure Python is installed: `python --version`
- Install dependencies: `pip install -r requirements.txt`
- Check if port 5000 is available

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:5000`
- Check browser console for CORS errors
- Make sure firewall allows localhost connections

### Image processing is slow
- This is normal without a GPU
- Install CUDA version of PyTorch for GPU acceleration
- Use smaller images (<5MB) for testing

### Model loading errors
- Verify `deepfake_model.pth` exists in the BACKEND folder
- Check that file size is reasonable (>50MB expected for deep learning models)
- Restart the backend server: stop (Ctrl+C) and run `python app.py` again

## API Endpoints

The Flask backend provides these endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Check server and model status |
| `/predict` | POST | Single image detection |
| `/batch-predict` | POST | Multiple images detection |

## Features Included

✅ **Image Upload** - Drag & drop or file picker
✅ **Real-time Detection** - Instant deepfake analysis
✅ **Confidence Scoring** - Shows how confident the AI is
✅ **Error Handling** - Graceful error messages
✅ **Detection History** - Saves last 50 detections in browser
✅ **Dark Mode Support** - Full dark/light theme support
✅ **CORS Enabled** - Frontend can communicate with backend

## File Structure

```
BACKEND/
├── app.py                    # Flask application
├── deepfake_model.pth        # Pre-trained model
├── requirements.txt          # Python dependencies
├── README.md                 # Backend documentation
└── SETUP_GUIDE.md           # This file

FRONTEND/
├── src/
│   ├── components/
│   │   └── DetectionPage.tsx # Main detection UI
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tailwind.config.js        # Styling configuration
```

## Next Steps

1. ✅ Backend is ready - run `python app.py`
2. ✅ Frontend is ready - run `npm run dev`
3. Test by uploading an image
4. Monitor console for any errors
5. Share results and celebrate! 🎉

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review console logs (browser and terminal)
3. Ensure all dependencies are installed
4. Verify model file exists and is accessible
