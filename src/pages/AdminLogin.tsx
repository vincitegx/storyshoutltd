import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Mail, Lock, ShieldAlert, CheckCircle, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('storyshout_admin_token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please specify credentials.');
      return;
    }

    setLoading(true);

    try {
      const res = await (fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }));

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Identity rejection.');
      }

      // Save to local storage
      localStorage.setItem('storyshout_admin_token', data.token);
      localStorage.setItem('storyshout_admin_email', data.email);
      localStorage.setItem('storyshout_default_password_warning', data.isDefaultPassword ? 'true' : 'false');

      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Server synchronization failure.');
    } finally {
      setLoading(false);
    }
  };

  const autofillSeededCredentials = () => {
    setEmail('admin@storyshoutltd.com');
    setPassword('StoryShout2026!');
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center font-sans px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden transition-all">
        
        {/* Subtle Ambient light */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-brand-navy dark:bg-slate-950 border border-brand-teal/20 text-brand-teal shadow-inner">
              <ShieldCheck size={28} />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Admin Dashboard access</h1>
            <p className="text-xs text-slate-400">Specify authentic token credentials to access core services</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl flex items-start space-x-2.5 text-xs font-sans"
              >
                <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  id="admin-email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@storyshoutltd.com"
                  className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 pl-11 rounded-xl focus:border-brand-teal transition-all text-sm outline-none text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 ">
              <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Master Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  id="admin-password"
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 pl-11 rounded-xl focus:border-brand-teal transition-all text-sm outline-none text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Sign in Button */}
            <button 
              id="admin-login-submit"
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-navy hover:bg-[#121319] dark:bg-brand-teal dark:hover:bg-brand-teal-light text-white dark:text-slate-950 font-bold p-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-slate-950"></div>
                  <span>Authenticating secure node...</span>
                </>
              ) : (
                <span>Portals login</span>
              )}
            </button>
          </form>

          {/* Seed Alert notice helper */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2.5">
            <h4 className="font-display font-bold text-slate-900 dark:text-amber-400 text-xs flex items-center space-x-1.5 select-none">
              <ShieldAlert size={14} className="text-amber-500" />
              <span>Dev Environment Autoseeding</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed leading-[1.4]">
              For local testing, pre-seeded SQLite parameters exist. Click the action line below to auto-inject the default credentials.
            </p>
            <button 
              id="autofill-seeded-button"
              type="button"
              onClick={autofillSeededCredentials}
              className="text-[11px] font-mono text-brand-teal hover:underline text-left block"
            >
              Autofill standard credentials &rarr;
            </button>
          </div>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-slate-400 hover:text-brand-teal transition-colors inline-flex items-center space-x-1 font-mono">
              <ArrowLeft size={10} />
              <span>Back to standard portal</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
