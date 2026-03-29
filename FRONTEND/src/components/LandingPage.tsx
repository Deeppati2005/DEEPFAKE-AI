import { Shield, Zap, Eye, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage = ({ onNavigate }: LandingPageProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Detect Fake Images Instantly with AI';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 dark:bg-purple-600 rounded-full mb-6 animate-bounce-slow">
            <Shield className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
            AI-Powered Deepfake
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Image Detection
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-medium min-h-[80px]">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>

          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            In the age of AI-generated content, deepfake images pose a serious threat to truth and security.
            Our advanced AI system uses cutting-edge deep learning to analyze and detect manipulated images in real-time,
            protecting you from misinformation and digital fraud.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('detect')}
              className="group px-8 py-4 bg-blue-600 dark:bg-purple-600 hover:bg-blue-700 dark:hover:bg-purple-700 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Start Detection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('features')}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-gray-200 dark:border-gray-700"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-blue-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Real-Time Detection
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get instant results with our optimized AI model that processes images in seconds
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-blue-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              High Accuracy
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced CNN architecture trained on millions of images for superior detection
            </p>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-blue-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your images are analyzed securely and never stored on our servers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
