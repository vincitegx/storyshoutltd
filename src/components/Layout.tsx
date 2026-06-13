import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Layout({ children, darkMode, setDarkMode }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-brand-navy text-slate-100' : 'bg-[#F8F9FA] text-slate-800'}`}>
        {/* Header */}
        <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
            darkMode
                ? 'bg-brand-navy/85 border-[#45A29E]/20'
                : 'bg-[#F8F9FA]/85 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link id="nav-logo" to="/" className="flex items-center space-x-2 group">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/10 border border-brand-teal text-brand-teal font-display font-bold text-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                  SS
                  <motion.div
                      className="absolute inset-0 bg-brand-teal/20"
                      animate={{ scale: [1, 1.4, 1], rotate: [0, 90, 180] }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  />
                </div>
                <div>
                <span className={`font-display font-extrabold text-xl tracking-tight ${darkMode ? 'text-white' : 'text-brand-navy'}`}>
                  Story<span className="text-brand-teal">Shout</span>
                </span>
                  <span className="block text-[9px] tracking-widest uppercase text-brand-teal font-mono">Limited</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8 items-center font-medium">
                <Link id="nav-features" to="/features" className={`hover:text-brand-teal transition-colors py-2 text-sm ${location.pathname === '/features' ? 'text-brand-teal' : darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Features
                </Link>
                <Link id="nav-about" to="/about" className={`hover:text-brand-teal transition-colors py-2 text-sm ${location.pathname === '/about' ? 'text-brand-teal' : darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  About
                </Link>
                <Link id="nav-contact" to="/contact" className={`hover:text-brand-teal transition-colors py-2 text-sm ${location.pathname === '/contact' ? 'text-brand-teal' : darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Contact
                </Link>

                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />

                {/* Dark mode toggler */}
                <button
                    id="theme-toggler"
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-lg border transition-colors ${
                        darkMode
                            ? 'border-[#45A29E]/30 text-brand-gold hover:bg-slate-800'
                            : 'border-slate-200 text-brand-navy hover:bg-slate-100'
                    }`}
                    title="Toggle Mode"
                >
                  {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                </button>
              </nav>

              {/* Mobile menu and setting controls */}
              <div className="flex md:hidden items-center space-x-3">
                <button
                    id="theme-toggler-mobile"
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-lg border transition-colors ${
                        darkMode
                            ? 'border-[#45A29E]/30 text-brand-gold hover:bg-slate-800'
                            : 'border-slate-200 text-brand-navy hover:bg-slate-100'
                    }`}
                >
                  {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                </button>

                <button
                    id="hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-brand-navy hover:bg-slate-100'}`}
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <AnimatePresence>
            {menuOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`md:hidden overflow-hidden border-t ${darkMode ? 'bg-brand-navy border-[#45A29E]/20' : 'bg-[#F8F9FA] border-slate-200'}`}
                >
                  <div className="px-4 pt-3 pb-6 space-y-3">
                    <Link
                        to="/features"
                        className={`block px-3 py-2 rounded-lg text-base font-medium ${location.pathname === '/features' ? 'text-brand-teal bg-brand-teal/5' : 'text-slate-400'}`}
                    >
                      Features
                    </Link>
                    <Link
                        to="/about"
                        className={`block px-3 py-2 rounded-lg text-base font-medium ${location.pathname === '/about' ? 'text-brand-teal bg-brand-teal/5' : 'text-slate-400'}`}
                    >
                      About
                    </Link>
                    <Link
                        to="/contact"
                        className={`block px-3 py-2 rounded-lg text-base font-medium ${location.pathname === '/contact' ? 'text-brand-teal bg-brand-teal/5' : 'text-slate-400'}`}
                    >
                      Contact
                    </Link>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className={`border-t font-sans py-14 transition-colors duration-300 ${
            darkMode
                ? 'bg-[#08090C] border-[#45A29E]/10 text-slate-400'
                : 'bg-slate-900 border-slate-800 text-slate-300'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Business Bio */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="font-display font-black text-lg p-2 rounded-md bg-brand-teal/10 border border-brand-teal text-brand-teal">
                    SS
                  </div>
                  <span className="font-display font-extrabold text-lg text-white">
                  Story<span className="text-brand-teal">Shout</span>
                </span>
                </div>
                <p className="text-sm leading-relaxed">
                  A video campaign monetization platform connecting creators with supporters through a transparent coin economy and multi-gateway payment infrastructure. Built for African creators, available globally.
                </p>
                <div className="pt-2">
                <span className="text-xs bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-2.5 py-1 rounded-full font-mono">
                  Lagos, Nigeria
                </span>
                </div>
              </div>

              {/* Platform Links */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs">Platform</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><Link to="/features" className="hover:text-brand-teal transition-colors">Features</Link></li>
                  <li><Link to="/features#pricing" className="hover:text-brand-teal transition-colors">Pricing</Link></li>
                  <li><Link to="/features#faqs" className="hover:text-brand-teal transition-colors">FAQs</Link></li>
                  <li><Link to="/about" className="hover:text-brand-teal transition-colors">About Us</Link></li>
                </ul>
              </div>

              {/* Corporate Location */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs">Headquarters</h4>
                <p className="text-sm font-sans leading-relaxed text-slate-400">
                  Lekki Phase I, Lagos,<br />
                  Nigeria.<br />
                  <span className="text-brand-teal hover:underline block pt-2">contact@storyshoutltd.com</span>
                </p>
                <p className="text-xs font-mono text-slate-500">
                  Domain: <span className="text-brand-gold">storyshoutltd.com</span>
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-slate-500">
              <p>
                &copy; {new Date().getFullYear()} StoryShout Limited. All rights reserved. &quot;Built to Monetize Video at Scale.&quot;
              </p>
              <div className="flex space-x-6">
                <span>React + Vite + Node — Video Campaign Monetization Platform</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
}