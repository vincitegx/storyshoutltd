import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

const GRADIENT = 'linear-gradient(135deg, #FF5F2E 0%, #FF8A00 100%)';

const NAV_LINKS = [
  { to: '/features', label: 'How It Works' },
  { to: '/about',    label: 'About' },
  { to: '/blog',     label: 'Blog' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F4] text-slate-800 font-sans">

      {/* ── Header ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FBF7F4]/95 backdrop-blur-md border-b border-[#EDE8E3] shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group shrink-0">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-display font-black text-sm shrink-0"
                style={{ background: GRADIENT }}
              >
                SS
              </div>
              <div className="leading-none">
                <span className="font-display font-extrabold text-xl tracking-tight text-[#1A0F08] block">
                  Story<span className="text-[#FF5F2E]">Shout</span>
                </span>
                <span className="text-[9px] font-mono tracking-[0.2em] text-slate-400 uppercase block">
                  Limited
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-[#FF5F2E]'
                      : 'text-slate-500 hover:text-[#1A0F08]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact?subject=Demo Request"
                className="inline-flex items-center space-x-1.5 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(255,95,46,0.3)] hover:shadow-[0_6px_20px_rgba(255,95,46,0.4)]"
                style={{ background: GRADIENT }}
              >
                <span>Get Started</span>
                <ArrowRight size={14} />
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-[#FFE8DA] transition-colors"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden bg-[#FBF7F4] border-t border-[#EDE8E3]"
            >
              <div className="px-5 py-5 space-y-1">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === link.to
                        ? 'text-[#FF5F2E] bg-[#FFF4EE]'
                        : 'text-slate-600 hover:bg-[#F5F0EC]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3">
                  <Link
                    to="/contact?subject=Demo Request"
                    className="flex items-center justify-center space-x-2 text-sm font-bold text-white py-3 rounded-xl"
                    style={{ background: GRADIENT }}
                  >
                    <span>Get Started</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      <main className="flex-grow">{children}</main>

      {/* ── Footer ── */}
      <footer className="bg-[#1A0F08] border-t border-[#1F2937] text-slate-400">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

            {/* Brand */}
            <div className="md:col-span-5 space-y-5">
              <Link to="/" className="flex items-center space-x-3 w-fit">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-display font-black text-sm shrink-0"
                  style={{ background: GRADIENT }}
                >
                  SS
                </div>
                <span className="font-display font-extrabold text-xl text-white">
                  Story<span className="text-[#FF5F2E]">Shout</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed max-w-xs">
                An audience promotion platform where brands create campaigns, real people share them to trusted social circles, and everyone wins — brands get authentic reach, Shouters earn rewards.
              </p>
              <div className="flex items-center space-x-2 pt-1">
                <span
                  className="text-[10px] font-mono font-bold text-white px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(255,95,46,0.15)', border: '1px solid rgba(255,95,46,0.25)' }}
                >
                  BETA
                </span>
                <span className="text-xs text-slate-500">Lekki, Lagos, Nigeria</span>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-[0.15em]">Platform</h4>
              <ul className="space-y-2.5 text-sm">
                {[
                  { to: '/features', label: 'How It Works' },
                  { to: '/features#pricing', label: 'Pricing' },
                  { to: '/features#faqs', label: 'FAQs' },
                  { to: '/about', label: 'About Us' },
                  { to: '/blog', label: 'Blog' },
                  { to: '/contact?subject=Demo Request', label: 'Request a Demo' },
                ].map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-[#FF5F2E] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-[0.15em]">Headquarters</h4>
              <div className="space-y-2 text-sm">
                <p>Lekki Phase I,</p>
                <p>Lagos, Nigeria.</p>
                <a
                  href="mailto:infos@storyshoutltd.com"
                  className="text-[#FF5F2E] hover:text-[#FF8A00] transition-colors block pt-1"
                >
                  infos@storyshoutltd.com
                </a>
              </div>
              <div className="pt-2 space-y-1 text-xs font-mono text-slate-500">
                <p>RC: 9591364</p>
                <p>storyshoutltd.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#1F2937] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>&copy; {new Date().getFullYear()} StoryShout Limited. All rights reserved.</p>
            <p className="text-center sm:text-right">Audience Promotion Platform for Startups &amp; Creators</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
