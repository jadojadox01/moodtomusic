'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const HowItWorks = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { data: session } = useSession();

  const steps = [
    { 
      title: 'Select your mood', 
      desc: 'Choose from various mood options or let us detect your mood', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: 'Generate your playlist', 
      desc: 'creates a personalized playlist That match your mood', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    { 
      title: 'Listen and share', 
      desc: 'Enjoy your music and share with friends', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      )
    }
  ];

  const handleTryIt = () => {
    if (!session) {
      signIn('google', { callbackUrl: '/generate' });
    } else {
      window.location.href = '/generate';
    }
  };

  return (
    <section id="how-it-works" className="py-16 bg-slate-800/50">
      <div className="container mx-auto px-4">
        {/* Video Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 relative">
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                  <div className="text-center">
                    <svg className="animate-spin h-12 w-12 text-purple-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647"></path>
                    </svg>
                    <p className="text-gray-400">Loading video demonstration...</p>
                  </div>
                </div>
              )}
              <iframe 
                src="https://www.youtube.com/embed/jfKfPfyJRdk?rel=0" 
                title="Mood2Music - How It Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px]"
                onLoad={() => setVideoLoaded(true)}
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </motion.div>

        {/* Steps Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Simple 3-Step Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                whileHover={{ y: -5 }}
                className="bg-slate-700/30 p-6 rounded-xl text-center hover:bg-slate-700/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <div className="text-purple-400 mb-3 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={handleTryIt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg"
          >
            Try It Yourself
          </motion.button>
          <p className="text-gray-400 mt-4">Create your first mood-based playlist in seconds</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
