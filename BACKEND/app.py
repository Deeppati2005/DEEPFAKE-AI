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
        logger.info(f"Loading model from {model_path}")
        
        # Load the model - adjust based on your actual model architecture
        # If it's a ResNet or similar, you may need to define the architecture first
        model = torch.load(model_path, map_location=device)
        
        # If model is a checkpoint with state_dict, load it differently
        if isinstance(model, dict):
            # If it's a state dict, you need to load it into a model architecture
            # For now, we'll try to handle both cases
            try:
                model_state = model
                # Create a default architecture (ResNet50 with 2 outputs for binary classification)
                model = torch.hub.load('pytorch/vision:v0.10.0', 'resnet50', pretrained=False)
                model.fc = torch.nn.Linear(model.fc.in_features, 2)
                model.load_state_dict(model_state)
            except:
                # If that fails, the file might already be a model object
                model = torch.load(model_path, map_location=device, weights_only=False)
        
        model.to(device)
        model.eval()  # Set to evaluation mode
        logger.info("Model loaded successfully")
        return True
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        return False

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
        
        # Define preprocessing transformations
        preprocess = transforms.Compose([
            transforms.Resize((224, 224)),  # Resize to 224x224
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
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
            
            # Handle different output formats
            if isinstance(output, tuple):
                output = output[0]
            
            # Get softmax probabilities
            probabilities = torch.nn.functional.softmax(output, dim=1)
            
            # Get prediction and confidence
            confidence, predicted = torch.max(probabilities, 1)
            
            # Map 0 = real, 1 = fake (adjust based on your model's training)
            prediction = 'fake' if predicted.item() == 1 else 'real'
            confidence_score = confidence.item()
            
            return prediction, confidence_score
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
        logger.error(f"Error in prediction endpoint: {e}")
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
