import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Server, Send, Sparkles, BarChart3, Check, Cpu, Zap, ArrowRight, Hourglass } from 'lucide-react';
import { SoftwareFeature, PricingPlan } from '../types';

export default function Software() {
  const [features, setFeatures] = useState<SoftwareFeature[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [featRes, priceRes] = await Promise.all([
          fetch('/api/software/features'),
          fetch('/api/software/pricing')
        ]);
        
        if (featRes.ok) {
          const featData = await featRes.json();
          setFeatures(featData);
        }
        if (priceRes.ok) {
          const priceData = await priceRes.json();
          setPricing(priceData);
        }
      } catch (err) {
        console.error('Failed to fetch SaaS content, using static fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'send': return <Send size={24} />;
      case 'sparkles': return <Sparkles size={24} />;
      case 'barchart3': return <BarChart3 size={24} />;
      default: return <Server size={24} />;
    }
  };

  return (
    <div className="py-12 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Masthead Banner */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs bg-brand-teal/10 border border-brand-teal/30 px-3.5 py-1.5 rounded-full text-brand-teal font-mono uppercase tracking-widest font-bold">
            Campaign Delivery Platform
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            StoryShout Campaign Manager
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg sm:text-xl font-sans font-light leading-relaxed">
            Eliminate communication noise. Orchestrate, adapt, and track message templates across high-efficiency West African gateways.
          </p>
          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact?subject=Software%20Inquiry')}
              className="bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center space-x-2"
            >
              <span>Request Live Demo</span>
              <ArrowRight size={16} />
            </button>
            <a 
              href="#pricing"
              className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3.5 rounded-xl font-medium transition-all"
            >
              View Pricing Tiers
            </a>
          </div>
        </div>

        {/* Feature Grid CRUD derived */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              SaaS System Architecture Features
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Fully modular and optimized systems tailored for marketing operations and delivery telemetry.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
              <p className="text-slate-500 text-xs font-mono mt-2">Loading system telemetry...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((f, idx) => (
                <div 
                  key={f.id || idx}
                  className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                      {getIcon(f.icon)}
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{f.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.description}</p>
                  </div>
                  {f.benefits && (
                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-brand-teal">
                      <span className="font-bold text-slate-700 dark:text-slate-300">BENEFITS:</span> {f.benefits}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Process Timeline */}
        <div id="process" className="py-16 border-t border-b border-slate-100 dark:border-slate-800 mb-24 transition-colors">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              The Campaign Lifecycle
            </h2>
            <p className="text-xs font-mono text-brand-teal uppercase tracking-widest mt-1">
              How we orchestrate from contact upload to conversions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Upload & Parse', text: 'Securely import CSV lists without rate caps. Our system parses headers and phone tags automatically.' },
              { step: '02', title: 'Local Dialect adaptation', text: 'Apply regional slangs and Nigerian tone localized settings using our semantic parsing engine.' },
              { step: '03', title: 'Orchestrated Broadcast', text: 'Deliver templates concurrently across SMS, WhatsApp Business API endpoints, and SMTP relays.' },
              { step: '04', title: 'Detailed Telemetry', text: 'Inspect user click-through parameters, bounce diagnoses, and download clean campaign reports.' }
            ].map((p, idx) => (
              <div key={idx} className="space-y-3 relative">
                <span className="block text-4xl font-display font-black text-brand-teal/20">{p.step}</span>
                <h4 className="font-display font-bold text-slate-950 dark:text-white text-lg">{p.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="mb-24 py-10 bg-slate-50 dark:bg-slate-900/40 rounded-2xl px-6 border border-slate-100 dark:border-slate-800 transition-colors">
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center justify-center space-x-2">
              <Cpu size={20} className="text-brand-teal" />
              <span>SaaS Stack Infrastructure</span>
            </h3>
            <p className="text-xs text-slate-500 font-mono mt-1">Our server-side services execute on top of a highly reliable ecosystem</p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {['React 19 + TypeScript', 'Vite Bundler', 'Tailwind CSS v4', 'Node.js Runtime', 'Express.js Framework', 'SQLite Database', 'JWT Security', 'HTTP/5 Stream Gateways', 'Multer Disk Engine', 'Concurrently Execution'].map((tech) => (
              <span key={tech} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 px-4 py-2 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Pricing Matrix */}
        <div id="pricing" className="scroll-mt-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">
              Scale Tolerant Pricing Plans
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Select the pricing plan that corresponds with your active audience size.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {pricing.map((p, idx) => (
              <div 
                key={p.id || idx}
                className={`relative p-8 rounded-2xl flex flex-col justify-between border transition-all ${
                  p.popular 
                    ? 'bg-slate-900 text-white border-brand-teal shadow-xl md:scale-105 md:-translate-y-2 z-10' 
                    : 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-slate-100 dark:border-slate-800'
                }`}
              >
                {p.popular === 1 && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-teal text-slate-900 text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4">
                  <h4 className={`font-display font-bold text-lg ${p.popular ? 'text-brand-teal' : 'text-slate-800 dark:text-slate-200'}`}>{p.name}</h4>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl sm:text-4xl font-display font-black tracking-tight">{p.price}</span>
                    <span className={`text-xs font-mono ${p.popular ? 'text-slate-400' : 'text-slate-500'}`}>{p.billing}</span>
                  </div>
                  
                  <hr className={`border-t ${p.popular ? 'border-slate-800' : 'border-slate-100 dark:border-slate-800'}`} />

                  <ul className="space-y-3 text-sm">
                    {p.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2">
                        <Check size={16} className={`shrink-0 mt-0.5 ${p.popular ? 'text-brand-teal' : 'text-brand-teal'}`} />
                        <span className={p.popular ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => navigate(`/contact?subject=Software%20Inquiry&plan=${encodeURIComponent(p.name)}`)}
                    className={`w-full py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition-all ${
                      p.popular 
                        ? 'bg-brand-teal hover:bg-brand-teal-light text-slate-900 shadow-lg hover:shadow-brand-teal/20' 
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-white hover:text-slate-900'
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Signup Bottom Pitch */}
        <div className="mt-24 p-8 md:p-12 bg-gradient-to-r from-slate-950 via-brand-navy to-slate-950 border border-brand-teal/20 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(69,162,158,0.1),transparent)]" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Ready to streamline your West African campaign deliverability?
            </h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              Experience modular templating, customized regional variables, and zero server caps. Contact David Ogbodu and our software solutions squad for a live custom environment.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => navigate('/contact?subject=Software%20Inquiry')}
                className="bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-brand-teal/10 inline-flex items-center space-x-2"
              >
                <span>Request Your Free Sandbox Account</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
