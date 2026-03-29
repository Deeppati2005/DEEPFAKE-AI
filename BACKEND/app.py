from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torchvision.transforms as transforms
from PIL import Image
import io
import numpy as np
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes - allows requests from frontend
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type"]}})

# Global variables for model
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = None
model_path = Path(__file__).parent / 'deepfake_model.pth'

def load_model():
    """Load the deepfake detection model"""
    global model
    try:
        # Check if model file exists
        if not model_path.exists():
            logger.warning(f"Model file not found at {model_path}. Creating a dummy model for testing.")
            create_dummy_model()
            return True
        
        logger.info(f"Loading model from {model_path}")
        
        # Create ResNet18 architecture (matching the training code)
        model = torch.hub.load('pytorch/vision:v0.10.0', 'resnet18', pretrained=False)
        model.fc = torch.nn.Linear(model.fc.in_features, 2)
        
        # Load the saved state dict
        model.load_state_dict(torch.load(model_path, map_location=device))
        
        model.to(device)
        model.eval()  # Set to evaluation mode
        logger.info("Model loaded successfully")
        return True
    except Exception as e:
        logger.error(f"Error loading model: {e}. Creating a dummy model for testing.")
        create_dummy_model()
        return True

def create_dummy_model():
    """Create a dummy ResNet18 model for testing purposes"""
    global model
    try:
        model = torch.hub.load('pytorch/vision:v0.10.0', 'resnet18', pretrained=False)
        model.fc = torch.nn.Linear(model.fc.in_features, 2)
        model.to(device)
        model.eval()
        logger.info("Dummy model created successfully")
    except Exception as e:
        logger.error(f"Error creating dummy model: {e}")
        raise

def preprocess_image(image_bytes):
    """Preprocess image for the model"""
    try:
        # Open image from bytes
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert RGBA to RGB if necessary
        if image.mode == 'RGBA':
            image = image.convert('RGB')
        elif image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Define preprocessing transformations (matching training code)
        preprocess = transforms.Compose([
            transforms.Resize((224, 224)),  # Resize to 224x224
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.5, 0.5, 0.5],
                std=[0.5, 0.5, 0.5]
            )
        ])
        
        # Apply transformations
        tensor = preprocess(image)
        tensor = tensor.unsqueeze(0)  # Add batch dimension
        tensor = tensor.to(device)
        
        return tensor
    except Exception as e:
        logger.error(f"Error preprocessing image: {e}")
        raise

def predict_deepfake(image_tensor):
    """Run prediction on the image tensor"""
    try:
        with torch.no_grad():
            output = model(image_tensor)
            
            # Get the predicted class
            _, predicted = torch.max(output, 1)
            
            # Get probabilities for confidence
            probabilities = torch.nn.functional.softmax(output, dim=1)
            confidence = probabilities[0][predicted.item()].item()
            
            # Map predictions: 0 = Fake, 1 = Real
            classes = ['fake', 'real']
            prediction = classes[predicted.item()]
            
            return prediction, confidence
    except Exception as e:
        logger.error(f"Error in prediction: {e}")
        raise

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'model_loaded': model is not None}), 200

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    """Main prediction endpoint"""
    
    # Handle preflight CORS request
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        # Check if model is loaded
        if model is None:
            return jsonify({'error': 'Model not loaded', 'message': 'Please try again later'}), 503
        
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Read image bytes
        image_bytes = file.read()
        
        if not image_bytes:
            return jsonify({'error': 'Empty file'}), 400
        
        logger.info(f"Processing image: {file.filename}")
        
        # Preprocess image
        image_tensor = preprocess_image(image_bytes)
        
        # Make prediction
        prediction, confidence = predict_deepfake(image_tensor)
        
        logger.info(f"Prediction: {prediction}, Confidence: {confidence:.4f}")
        
        # Return results in JSON format
        return jsonify({
            'prediction': prediction,
            'confidence': float(confidence),
            'message': f'This image appears to be {prediction} with {confidence*100:.2f}% confidence'
        }), 200
    
    except Exception as e:
        logger.error(f"Error in prediction endpoint: {e}", exc_info=True)
        return jsonify({'error': str(e), 'message': 'An error occurred during processing'}), 500

@app.route('/batch-predict', methods=['POST'])
def batch_predict():
    """Batch prediction endpoint for multiple images"""
    try:
        if 'images' not in request.files:
            return jsonify({'error': 'No images provided'}), 400
        
        files = request.files.getlist('images')
        results = []
        
        for file in files:
            if file.filename == '':
                continue
            
            try:
                image_bytes = file.read()
                image_tensor = preprocess_image(image_bytes)
                prediction, confidence = predict_deepfake(image_tensor)
                
                results.append({
                    'filename': file.filename,
                    'prediction': prediction,
                    'confidence': float(confidence)
                })
            except Exception as e:
                results.append({
                    'filename': file.filename,
                    'error': str(e)
                })
        
        return jsonify({'results': results}), 200
    
    except Exception as e:
        logger.error(f"Error in batch prediction: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Load model on startup
    if not load_model():
        logger.error("Failed to load model. Please check the model file.")
    
    # Run Flask app
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        threaded=True
    )
