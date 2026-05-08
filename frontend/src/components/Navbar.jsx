import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ toggleTheme, darkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Plan Trip', path: '/itinerary' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Explore', path: '#explore' },
  ];

  return (
    <nav 
      className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-4 glass shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative p-2.5 bg-slate-900 dark:bg-white rounded-2xl transition-transform duration-500 group-hover:rotate-[360deg]">
                <Compass className="w-6 h-6 text-white dark:text-slate-900" />
              </div>
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter text-slate-900 dark:text-white">
              Nomad<span className="text-primary-500">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors relative group ${
                    location.pathname === link.path 
                      ? 'text-primary-500' 
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path ? 'w-full' : ''
                  }`}></span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-800">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors text-slate-600 dark:text-slate-400"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link 
                to="/itinerary"
                className="btn-premium py-2.5 px-6 text-sm"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-semibold text-slate-900 dark:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={() => {
                  toggleTheme();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 text-lg font-semibold text-slate-600 dark:text-slate-400"
              >
                {darkMode ? <><Sun className="w-5 h-5" /> Light Mode</> : <><Moon className="w-5 h-5" /> Dark Mode</>}
              </button>
              <Link 
                to="/itinerary"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-premium"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
