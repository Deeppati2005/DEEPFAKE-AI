# Deepfake Detection Backend

Flask backend for deepfake detection using a pre-trained PyTorch model.

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

**Note:** PyTorch installation can be large. If you have a GPU, consider installing the GPU version:
```bash
# For CUDA 11.8
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

### 2. Run the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## Available Endpoints

### 1. Health Check
- **URL:** `/health`
- **Method:** GET
- **Description:** Check if the server and model are running

**Example:**
```bash
curl http://localhost:5000/health
```

### 2. Single Image Prediction
- **URL:** `/predict`
- **Method:** POST
- **Content-Type:** multipart/form-data
- **Body:** `image` (file)

**Example:**
```bash
curl -X POST -F "image=@path/to/image.jpg" http://localhost:5000/predict
```

**Response:**
```json
{
  "prediction": "real",
  "confidence": 0.95,
  "message": "This image appears to be real with 95.00% confidence"
}
```

### 3. Batch Image Prediction
- **URL:** `/batch-predict`
- **Method:** POST
- **Content-Type:** multipart/form-data
- **Body:** `images` (multiple files)

**Example:**
```bash
curl -X POST -F "images=@image1.jpg" -F "images=@image2.jpg" http://localhost:5000/batch-predict
```

**Response:**
```json
{
  "results": [
    {
      "filename": "image1.jpg",
      "prediction": "real",
      "confidence": 0.95
    },
    {
      "filename": "image2.jpg",
      "prediction": "fake",
      "confidence": 0.87
    }
  ]
}
```

## Model Details

- **File:** `deepfake_model.pth`
- **Framework:** PyTorch
- **Input Size:** 224x224 pixels
- **Output:** Binary classification (real/fake)

## CORS Configuration

The server is configured to accept requests from all origins. This allows the frontend to make requests from any domain.

## Notes

- The server runs in debug mode by default
- GPU acceleration is used if CUDA is available
- Images are preprocessed with ImageNet normalization
- Model is set to evaluation mode for inference
