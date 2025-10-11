// components/Hero.js
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const pulse = {
  scale: [1, 1.05, 1],
  transition: { duration: 0.5, repeat: Infinity }
};
export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Generate Playlists Based on Your <span className="text-purple-400">Mood!</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-xl text-gray-300 mb-10"
          >
            Discover songs that match your mood and listen for free.
          </motion.p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={pulse}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg"
          >
            <Link href="/generate">Get Your Playlist</Link>
          </motion.button>

        </motion.div>
      </div>
    </section>
  );
};

