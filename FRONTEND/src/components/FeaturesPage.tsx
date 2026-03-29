import { Zap, Eye, Shield, Brain, Lock, Smartphone } from 'lucide-react';

export const FeaturesPage = () => {
  const features = [
    {
      icon: Zap,
      title: 'Real-Time AI Detection',
      description: 'Lightning-fast analysis powered by optimized deep learning models. Get results in seconds, not minutes.',
      color: 'blue',
    },
    {
      icon: Eye,
      title: 'High Accuracy Model',
      description: 'Advanced CNN architecture trained on millions of real and fake images for superior detection accuracy.',
      color: 'purple',
    },
    {
      icon: Brain,
      title: 'Deep Learning Analysis',
      description: 'Utilizes state-of-the-art neural networks to identify subtle manipulation patterns invisible to the human eye.',
      color: 'green',
    },
    {
      icon: Shield,
      title: 'Cybersecurity Protection',
      description: 'Protect yourself from digital fraud, misinformation campaigns, and identity theft through deepfake detection.',
      color: 'red',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your uploaded images are processed securely and never stored on our servers. Complete privacy guaranteed.',
      color: 'yellow',
    },
    {
      icon: Smartphone,
      title: 'Easy-to-Use Interface',
      description: 'Simple drag-and-drop interface designed for everyone. No technical knowledge required.',
      color: 'indigo',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our AI-powered deepfake detection system combines cutting-edge technology
            with user-friendly design to keep you protected
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${getColorClasses(
                  feature.color
                )} transition-transform group-hover:scale-110`}
              >
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
