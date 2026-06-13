import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Video, Users, Wallet, Globe, ChevronRight,
  Sparkles, Shield, TrendingUp, Play, CheckCircle
} from 'lucide-react';

const TAGLINES = [
  'Monetize Your Videos.',
  'Grow Your Audience.',
  'Get Paid to Create.',
];

const FEATURES = [
  {
    icon: <Video size={24} />,
    title: 'Video Campaign Creation',
    desc: 'Upload your video, set a tier, and launch a campaign. StoryShout handles file conversion, S3 storage, and automatic publishing to Facebook and Instagram.',
  },
  {
    icon: <Users size={24} />,
    title: 'Tiered Supporter System',
    desc: 'Campaigns attract supporters across STARTER, MICRO-INFLUENCER, and INFLUENCER tiers. Each tier has its own pay cycle — creating a self-sustaining coin economy.',
  },
  {
    icon: <Wallet size={24} />,
    title: 'Coin Wallet & Payouts',
    desc: 'Deposit fiat, earn coins by supporting campaigns, and withdraw your earnings. Wallets support Stripe, PayPal, Flutterwave, and Paystack — per your currency.',
  },
  {
    icon: <Globe size={24} />,
    title: 'Multi-Platform Publishing',
    desc: 'Campaigns publish automatically to Facebook, Instagram, WhatsApp, Snapchat, and Telegram — with real-time post insights and follower sync.',
  },
];

const TESTIMONIALS = [
  {
    quote: "StoryShout unlocked a revenue stream I didn't know existed. My campaign hit its verified target in under 48 hours and the payout was seamless.",
    author: 'Gbenga Adebayo',
    role: 'Content Creator, Lagos',
  },
  {
    quote: "The influencer tier system is brilliant. As a MICRO-INFLUENCER I earn coins on every campaign I support — it's genuinely passive income for what I already do.",
    author: 'Chioma Nwosu',
    role: 'Lifestyle Influencer, Abuja',
  },
  {
    quote: "Multi-gateway support is a game changer. My Stripe account handles USD withdrawals while my Nigerian audience deposits via Flutterwave. Zero friction.",
    author: 'Emeka Okafor',
    role: 'Brand Strategist, Port Harcourt',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Create a Campaign', text: 'Upload your video, pick a support tier, confirm compliance, and submit. Your campaign is queued for processing immediately.' },
  { step: '02', title: 'Budget is Locked', text: 'For paid campaigns, your coin budget is held in escrow. Supporters earn from it as they engage — verified by our post-check engine.' },
  { step: '03', title: 'Supporters Engage', text: 'Supporters post or share your content on their social accounts. StoryShout verifies the action and releases coins to their wallet.' },
  { step: '04', title: 'Withdraw Earnings', text: 'Supporters convert earned coins to fiat and withdraw via their linked payment gateway — Stripe, PayPal, Flutterwave, or Paystack.' },
];

export default function Home() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-24 md:py-36 bg-[#0B0C10] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(69,162,158,0.15),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-brand-teal/10 border border-brand-teal/30 px-3 py-1.5 rounded-full text-brand-teal font-mono text-xs uppercase tracking-widest mb-6">
            <Sparkles size={14} className="animate-pulse" />
            <span>StoryShout — Now in Beta</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-4">
            The Platform Where
            <div className="text-brand-teal min-h-[56px] sm:min-h-[72px] md:min-h-[88px] mt-2 block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={taglineIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  {TAGLINES[taglineIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            StoryShout is a video campaign monetization platform. Creators launch campaigns with tiered supporter budgets. Supporters earn coins by engaging. Everyone gets paid.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/features"
              className="inline-flex items-center space-x-2 bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-brand-teal/20"
            >
              <span>Explore Features</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact?subject=Demo Request"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-7 py-3.5 rounded-xl transition-all border border-slate-700"
            >
              <Play size={16} className="fill-white" />
              <span>Request a Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── What is StoryShout ── */}
      <section className="py-20 bg-slate-50 dark:bg-[#0E1015] border-t border-b border-slate-100 dark:border-[#45A29E]/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-1.5 bg-brand-teal/5 text-brand-teal px-3 py-1 rounded-full text-xs font-mono font-bold border border-brand-teal/10">
                <span>WHAT IS STORYSHOUT?</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                A Two-Sided Marketplace for Video Monetization
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                StoryShout connects video creators with supporters on social media. Creators fund campaigns with coins. Supporters earn coins by posting or sharing that content on their own accounts. The platform verifies the engagement and releases the payout — automatically.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Think of it as performance-based influencer marketing, built directly into a platform — with multi-gateway payments, KYC compliance, and a full double-entry ledger under the hood.
              </p>
              <Link to="/features" className="text-brand-teal hover:text-brand-teal-light font-bold flex items-center space-x-2">
                <span>See all platform features</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map((f, i) => (
                <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3 shadow-sm">
                  <div className="text-brand-teal">{f.icon}</div>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white">{f.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 bg-white dark:bg-brand-navy transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">How StoryShout Works</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">From campaign creation to wallet withdrawal in four steps.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={i} className="space-y-3 relative">
                <span className="block text-5xl font-display font-black text-brand-teal/20">{s.step}</span>
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-lg">{s.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Signals ── */}
      <section className="py-20 bg-slate-50 dark:bg-[#0E1015] border-t border-slate-100 dark:border-brand-teal/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <Shield size={22} />, label: 'Enterprise-Grade Security', desc: 'JWT auth, MFA, trusted devices, IP blacklisting, rate limiting, and BCrypt password hashing.' },
              { icon: <TrendingUp size={22} />, label: 'Real-Time Ledger', desc: 'Double-entry accounting system with idempotency keys, reconciliation reports, and full audit trails.' },
              { icon: <CheckCircle size={22} />, label: 'Compliance Ready', desc: 'KYC verification, AML screening, risk assessment engine, and legal document acceptance tracking.' },
            ].map((t, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3 shadow-sm">
                <div className="text-brand-teal">{t.icon}</div>
                <h4 className="font-display font-bold text-slate-900 dark:text-white">{t.label}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">What Creators Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-8 bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
                <p className="text-slate-600 dark:text-slate-200 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">{t.author}</h4>
                  <p className="text-brand-teal text-xs font-mono uppercase mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 bg-gradient-to-r from-slate-950 via-brand-navy to-slate-950 border-t border-brand-teal/20">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Ready to launch your first campaign?
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Join the waitlist or request a live demo. StoryShout is currently in active beta — onboarding select creators and brands.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/contact?subject=Join Waitlist"
              className="inline-flex items-center space-x-2 bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-8 py-4 rounded-xl transition-all shadow-xl"
            >
              <span>Join the Waitlist</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-8 py-4 rounded-xl transition-all border border-slate-700"
            >
              <span>View Full Feature List</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
