/**
 * API Configuration
 * 
 * This file contains the API endpoint configuration for the deepfake detection system.
 * Adjust these values based on your deployment environment.
 */

export const API_CONFIG = {
  // Backend API base URL
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  // Endpoints
  ENDPOINTS: {
    HEALTH: '/health',
    PREDICT: '/predict',
    BATCH_PREDICT: '/batch-predict',
  },
  
  // Request timeouts (in milliseconds)
  TIMEOUT: 120000, // 2 minutes for image processing
  
  // Image constraints
  IMAGE_CONSTRAINTS: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png'],
  },
};

/**
 * Get the full API endpoint URL
 * @param {string} endpoint - The endpoint key from ENDPOINTS
 * @returns {string} Full URL for the endpoint
 */
export const getApiUrl = (endpoint) => {
  const endpointPath = API_CONFIG.ENDPOINTS[endpoint] || endpoint;
  return `${API_CONFIG.BASE_URL}${endpointPath}`;
};

/**
 * Predict deepfake from image file
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise} Response from the backend
 */
export const predictImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(getApiUrl('PREDICT'), {
    method: 'POST',
    body: formData,
    timeout: API_CONFIG.TIMEOUT,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Prediction failed');
  }

  return response.json();
};

/**
 * Batch predict multiple images
 * @param {FileList} imageFiles - Multiple image files to analyze
 * @returns {Promise} Response from the backend
 */
export const batchPredictImages = async (imageFiles) => {
  const formData = new FormData();
  
  for (let i = 0; i < imageFiles.length; i++) {
    formData.append('images', imageFiles[i]);
  }

  const response = await fetch(getApiUrl('BATCH_PREDICT'), {
    method: 'POST',
    body: formData,
    timeout: API_CONFIG.TIMEOUT,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Batch prediction failed');
  }

  return response.json();
};

/**
 * Check backend health status
 * @returns {Promise} Health status response
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(getApiUrl('HEALTH'), {
      timeout: 5000,
    });
    return await response.json();
  } catch (error) {
    return {
      status: 'error',
      message: 'Backend is not responding',
    };
  }
};

export default API_CONFIG;
