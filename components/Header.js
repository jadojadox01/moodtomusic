"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  // Open Google login with redirect to home after login
  const handleSignIn = () => signIn('google', { callbackUrl: '/' });

  return (
    <header className="fixed w-full bg-slate-900/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-purple-400"
        >
          Mood2Music
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'How it Works', 'Features', 'Blog'].map((item) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-purple-400 transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <span className="text-gray-300">Hi, {session.user.name}</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignIn}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignIn}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                Get Started
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-800"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {['Home', 'How it Works', 'Features', 'Blog'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-purple-400 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-slate-700 flex flex-col space-y-3">
              {session ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 text-gray-300 hover:text-white transition-colors text-left"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Logout
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 text-gray-300 hover:text-white transition-colors text-left"
                    onClick={() => handleSignIn()}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-full transition-colors"
                    onClick={() => handleSignIn()}
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
