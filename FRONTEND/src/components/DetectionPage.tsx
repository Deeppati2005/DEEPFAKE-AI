import { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Loader } from './Loader';
import { ProgressBar } from './ProgressBar';

interface DetectionResult {
  prediction: 'real' | 'fake';
  confidence: number;
}

export const DetectionPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);
    setResult(null);

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, JPEG, or PNG)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDetect = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const blob = await fetch(selectedImage).then(r => r.blob());
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Detection failed. Please try again.');
      }

      const data = await response.json();

      console.log('Full response from model:', data);
      console.log('Prediction:', data.prediction);
      console.log('Confidence:', data.confidence);
      console.log('Message:', data.message);

      setResult({
        prediction: data.prediction,
        confidence: data.confidence * 100,
      });

      const detectionHistory = JSON.parse(localStorage.getItem('detectionHistory') || '[]');
      detectionHistory.push({
        timestamp: new Date().toISOString(),
        result: data.prediction,
        confidence: data.confidence * 100,
      });
      localStorage.setItem('detectionHistory', JSON.stringify(detectionHistory.slice(-50)));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during detection');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Deepfake Detection
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload an image to analyze if it's real or AI-generated
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
          {!selectedImage ? (
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 transition-all ${
                dragActive
                  ? 'border-blue-600 dark:border-purple-600 bg-blue-50 dark:bg-purple-900/20'
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-purple-600'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleChange}
                className="hidden"
              />
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <Upload className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Drag & Drop your image here
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 mb-4">or</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-blue-600 dark:bg-purple-600 hover:bg-blue-700 dark:hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Browse Files
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Supported formats: JPG, JPEG, PNG (Max 10MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full max-h-96 object-contain rounded-xl"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!loading && !result && (
                <button
                  onClick={handleDetect}
                  className="w-full py-4 bg-blue-600 dark:bg-purple-600 hover:bg-blue-700 dark:hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Detect Deepfake
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {loading && (
            <div className="text-center space-y-4 py-8">
              <Loader />
              <p className="text-lg text-gray-600 dark:text-gray-400 animate-pulse">
                Analyzing image using AI...
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fade-in">
              <div
                className={`p-6 rounded-xl border-2 ${
                  result.prediction === 'real'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                }`}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  {result.prediction === 'real' ? (
                    <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
                  )}
                  <h2
                    className={`text-3xl font-bold ${
                      result.prediction === 'real'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {result.prediction === 'real' ? 'REAL IMAGE' : 'DEEPFAKE IMAGE'}
                  </h2>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">
                      Confidence Score
                    </span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {result.confidence.toFixed(1)}%
                    </span>
                  </div>
                  <ProgressBar value={result.confidence} color={result.prediction === 'real' ? 'green' : 'red'} />
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold text-lg transition-colors"
              >
                Analyze Another Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
