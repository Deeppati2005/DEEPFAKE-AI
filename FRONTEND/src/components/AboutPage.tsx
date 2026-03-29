import { AlertTriangle, Target, Cpu, Shield } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About DeepGuard AI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Understanding deepfakes and the importance of detection technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                What Are Deepfakes?
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Deepfakes are synthetic media created using artificial intelligence and deep learning
                techniques. They can manipulate or generate visual and audio content with a high potential
                to deceive viewers.
              </p>
              <p>
                Using sophisticated neural networks like GANs (Generative Adversarial Networks), deepfakes
                can swap faces, alter expressions, and create entirely fictitious scenarios that appear
                remarkably realistic.
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                The technology has advanced to a point where distinguishing fake from real has become
                increasingly challenging for the human eye.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Why Detection Matters
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Deepfakes pose serious threats to individuals, organizations, and society:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-gray-900 dark:text-white">Misinformation:</strong> Spreading false
                  information and manipulating public opinion
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Identity Theft:</strong> Creating fake
                  identities for fraud and impersonation
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Reputation Damage:</strong> Destroying
                  personal and professional reputations
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Financial Fraud:</strong> Deceiving people
                  for monetary gain
                </li>
                <li>
                  <strong className="text-gray-900 dark:text-white">Security Risks:</strong> Bypassing facial
                  recognition systems
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 shadow-xl border border-blue-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Technology
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Advanced AI Models
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Our system employs state-of-the-art Convolutional Neural Networks (CNNs) trained on millions
                of authentic and manipulated images. The model learns to identify subtle artifacts and
                inconsistencies that indicate AI manipulation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                GAN Detection Techniques
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We specifically target patterns created by Generative Adversarial Networks, the most common
                technology used to create deepfakes. Our algorithms analyze pixel-level anomalies, compression
                artifacts, and facial feature inconsistencies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Multi-Layer Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Our detection process examines multiple aspects: facial landmarks, lighting consistency,
                texture patterns, edge artifacts, and color distribution anomalies to provide accurate results.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Continuous Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                As deepfake technology evolves, so does our detection system. We continuously update our models
                with new training data to stay ahead of emerging manipulation techniques.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center">
          <Shield className="w-16 h-16 text-blue-600 dark:text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Cybersecurity & Misinformation Prevention
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            In an era where seeing is no longer believing, tools like DeepGuard AI are essential for
            maintaining trust in digital media. Our mission is to empower individuals and organizations
            with the technology needed to verify image authenticity and combat the spread of misleading
            AI-generated content. Together, we can build a more secure and trustworthy digital future.
          </p>
        </div>
      </div>
    </div>
  );
};
