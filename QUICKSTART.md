# QUICK START - 5 Steps to Running Your Deepfake Detection System

## ⚡ Quick Reference

### Prerequisites
- Python 3.8+ (check: `python --version`)
- Node.js installed (check: `node --version`)
- Both `deepfake_model.pth` exists in BACKEND folder

---

## 📋 Step-by-Step Instructions

### STEP 1️⃣: Install Python Dependencies (2-5 minutes)

**In PowerShell, navigate to BACKEND folder:**
```powershell
cd "C:\Users\deepp\OneDrive\Desktop\HACK O NIT\BACKEND"
```

**Install dependencies:**
```powershell
pip install -r requirements.txt
```

✅ **Signs of success:**
- Installation completes without errors
- See "Successfully installed..." messages
- Takes 2-5 minutes (PyTorch is large ~500MB)

---

### STEP 2️⃣: Start Backend Server (30 seconds)

**In the BACKEND folder, run:**
```powershell
python app.py
```

OR use the batch script:
```powershell
.\start_server.bat
```

✅ **Signs of success:**
```
 * Running on http://0.0.0.0:5000
```

⚠️ **Keep this window open!** Don't close it.

---

### STEP 3️⃣: Start Frontend Server (30 seconds)

**Open NEW PowerShell window, go to FRONTEND folder:**
```powershell
cd "C:\Users\deepp\OneDrive\Desktop\HACK O NIT\FRONTEND"
```

**Start Vite dev server:**
```powershell
npm run dev
```

✅ **Signs of success:**
```
VITE v4.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

⚠️ **Keep this window open too!**

---

### STEP 4️⃣: Open in Browser (10 seconds)

**Click on the local URL shown above** (usually `http://localhost:5173`)

Your app loads in the browser with all pages visible.

---

### STEP 5️⃣: Test the System! (1 minute)

1. Click on **"Deepfake Detection"** in navigation
2. **Drag an image** OR click **"Browse Files"**
3. Click **"Detect Deepfake"** button
4. ✨ **See results with confidence score!**

---

## 🎯 What Happens Behind the Scenes

```
┌─────────────────────────────────────────────────────────────┐
│ You Upload Image in Browser                                 │
│ (DetectionPage.tsx)                                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ Image sent to Backend API                                   │
│ POST http://localhost:5000/predict                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ Flask Backend (app.py)                                      │
│ • Receives image                                            │
│ • Preprocesses (resize to 224x224)                          │
│ • Normalizes pixel values                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ PyTorch Model (deepfake_model.pth)                          │
│ • Runs inference on image                                   │
│ • Produces confidence scores                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ JSON Response Back to Frontend                              │
│ {                                                           │
│   "prediction": "real" or "fake",                           │
│   "confidence": 0.95,                                       │
│   "message": "..."                                          │
│ }                                                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│ Display Results in Browser                                  │
│ • Shows GREEN if REAL image                                 │
│ • Shows RED if DEEPFAKE detected                            │
│ • Displays confidence score with progress bar               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔍 Testing Each Component

### Test 1: Is Backend Running?
```powershell
curl http://localhost:5000/health
```
Should return: `{"status":"ok","model_loaded":true}`

### Test 2: Can Frontend Connect?
- Check browser console (F12)
- Look for any red error messages
- Network tab shows successful POST to `localhost:5000/predict`

### Test 3: Is Model Loaded?
- Look at terminal where backend is running
- Should say: `Model loaded successfully`
- No error messages about missing `.pth` file

---

## 📊 File Locations

| Component | Location | File |
|-----------|----------|------|
| Backend App | `BACKEND/` | **app.py** |
| Model | `BACKEND/` | **deepfake_model.pth** |
| Frontend UI | `FRONTEND/src/components/` | **DetectionPage.tsx** |
| API Config | `FRONTEND/src/config/` | **apiConfig.ts** |

---

## ⚙️ Configuration Options

### Change Backend Port (if 5000 is busy)
Edit `BACKEND/app.py`, last line:
```python
app.run(host='0.0.0.0', port=8000)  # Change 5000 to 8000
```

Then update frontend in `FRONTEND/src/config/apiConfig.ts`:
```typescript
BASE_URL: 'http://localhost:8000'
```

### Enable GPU Acceleration (optional)
If you have NVIDIA GPU:
```powershell
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

---

## 🚨 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| **"Port 5000 already in use"** | Change port in `app.py` |
| **"Module not found: Flask"** | Run `pip install -r requirements.txt` |
| **"Model not found"** | Verify `deepfake_model.pth` exists in BACKEND |
| **"Frontend can't reach backend"** | Check backend is running and port is correct |
| **Very slow processing** | Normal on CPU; first run loads model; use GPU if available |

---

## 📱 What Happens with Your Data

✅ **Privacy Protected:**
- Images are NOT saved on server
- NO data collection or tracking
- Results discarded after response
- Everything processed locally

---

## 🎓 Understanding the Output

### "REAL IMAGE" (Green)
- Model is confident the image is genuine
- Shows confidence percentage (e.g., 95%)
- Lower risk of deepfake

### "DEEPFAKE IMAGE" (Red)
- Model detected AI-generated content
- Shows how artificial it appears
- Higher confidence = more likely to be fake

**Note:** Confidence is a probability, not 100% certainty

---

## ✨ Features You Get

- ✅ Drag & drop image upload
- ✅ Real-time analysis with loading animation
- ✅ Color-coded results (green/red)
- ✅ Confidence score visualization
- ✅ Full error handling and validation
- ✅ Detection history (last 50)
- ✅ Dark mode support
- ✅ Mobile responsive design

---

## 🎉 You're All Set!

**Your system has:**
1. ✅ React frontend with beautiful UI
2. ✅ Flask backend with CORS
3. ✅ PyTorch deepfake model
4. ✅ Complete API integration
5. ✅ Error handling & logging

**Follow the 5 steps above to get running!**

---

**Need Help?** Check `COMPLETE_SETUP.md` for detailed documentation.
