import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Video, Users, Wallet, Globe, ChevronRight,
  Sparkles, Shield, TrendingUp, Play, CheckCircle
} from 'lucide-react';

const TAGLINES = [
  'Retold by Everyone.',
  'Shared by Real People.',
  'Amplified by Trust.',
];

const FEATURES = [
  {
    icon: <Video size={24} />,
    title: 'Create Campaigns',
    desc: 'Upload your content, set your budget in coins, and launch a campaign. StoryShout makes your content available for real users to share across their social media accounts.',
  },
  {
    icon: <Users size={24} />,
    title: 'Real People Share',
    desc: 'Everyday users — we call them Shouters — choose campaigns they believe in and share your content to their trusted circles. Friends, family, followers. Real reach.',
  },
  {
    icon: <Wallet size={24} />,
    title: 'Shouters Earn Rewards',
    desc: 'When Shouters share your content and their engagement is verified, they earn coins. Coins can be withdrawn as real currency. Their influence has value — and they get paid for it.',
  },
  {
    icon: <Globe size={24} />,
    title: 'You Get Authentic Reach',
    desc: 'Every share reaches a new trusted circle. No bots. No fake impressions. Just real people telling real people about your brand. That is marketing that actually works.',
  },
];

const TESTIMONIALS = [
  {
    quote: "We spent a fraction of what we'd pay an influencer and got better results. Real people shared our product because they actually liked it. Our sign-ups tripled that week.",
    author: 'Lucky Ovie',
    role: 'Startup Founder, Lagos',
  },
  {
    quote: "As a Shouter, I earn by sharing brands I genuinely use. It's not selling out — it's getting paid for what I'd do anyway. I've withdrawn earnings twice this month.",
    author: 'Akinima Chineye',
    role: 'Shouter, Abuja',
  },
  {
    quote: "We tried ads. We tried influencers. Nothing gave us the authentic word-of-mouth StoryShout delivered. Every share came from someone who actually cared about our product.",
    author: 'Joseph Eseoghene',
    role: 'Brand Owner, Port Harcourt',
  },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Create Your Campaign', text: 'Upload your content, set your coin budget, and define your campaign goals. Your campaign goes live and becomes available for Shouters to share.' },
  { step: '02', title: 'Shouters Share Your Story', text: 'Real users pick campaigns they believe in and share your content to their social media — Facebook, Instagram, WhatsApp, Snapchat, and Telegram.' },
  { step: '03', title: 'Engagement Is Verified', text: 'StoryShout checks that shares are genuine and reach real people. Verified engagement triggers rewards for the Shouters who promoted your content.' },
  { step: '04', title: 'Everyone Wins', text: 'You get authentic, scalable reach. Shouters earn coins and withdraw real currency. One campaign creates a ripple effect through trusted networks.' },
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
      <Helmet>
        <title>StoryShout — Turn Your Audience Into Your Marketing Engine | Audience Promotion Platform</title>
        <meta name="description" content="StoryShout turns everyday users into micro-influencers who share your content to trusted social circles. Affordable, authentic, and scalable audience promotion for startups, creators, and small brands." />
        <link rel="canonical" href="https://storyshoutltd.com/" />
        <meta property="og:url" content="https://storyshoutltd.com/" />
        <meta property="og:title" content="StoryShout — Turn Your Audience Into Your Marketing Engine" />
        <meta name="twitter:url" content="https://storyshoutltd.com/" />
        <meta name="twitter:title" content="StoryShout — Turn Your Audience Into Your Marketing Engine" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-20 pb-24 md:py-36 bg-[#0B0C10] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(69,162,158,0.15),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-brand-teal/10 border border-brand-teal/30 px-3 py-1.5 rounded-full text-brand-teal font-mono text-xs uppercase tracking-widest mb-6">
            <Sparkles size={14} className="animate-pulse" />
            <span>StoryShout — Now in Beta</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-4">
            Your Story,
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

          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Why reach one person when you can reach everyone they know?
          </p>
          <p className="text-slate-400 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            StoryShout turns everyday users into micro-influencers who share your content to trusted social circles. You get authentic reach. They earn rewards. One post becomes one-to-many.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/features"
              className="inline-flex items-center space-x-2 bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-brand-teal/20"
            >
              <span>See How It Works</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact?subject=Demo Request"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-7 py-3.5 rounded-xl transition-all border border-slate-700"
            >
              <Play size={16} className="fill-white" />
              <span>Request Early Access</span>
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
                Your Audience Becomes Your Marketing Engine
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Instead of paying for cold reach, StoryShout lets brands create campaigns that everyday users share to their own social circles. Each share reaches friends, family, and followers — people who actually trust them. Brands get authentic reach. Sharers earn rewards for their influence.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                It's word-of-mouth marketing at scale. One post becomes one-to-many. And because shares come from real people — not bots or paid influencers — the social proof is baked into every single post.
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
              { icon: <Shield size={22} />, label: 'Secure & Protected', desc: 'Your account is protected with multi-factor authentication, trusted device management, and industry-standard encryption. Every transaction is verified and recorded.' },
              { icon: <TrendingUp size={22} />, label: 'Transparent Earnings', desc: 'See exactly how much you earn from every campaign. Full transaction history, real-time balance tracking, and clear payout reports — no hidden fees.' },
              { icon: <CheckCircle size={22} />, label: 'Verified & Compliant', desc: 'Identity verification keeps the platform safe for everyone. All users complete a simple verification process before accessing wallet and campaign features.' },
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
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">What Our Users Say</h2>
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
            Ready to turn your audience into your marketing engine?
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Join the waitlist or request a live demo. StoryShout is in active beta — onboarding startups, creators, and small brands who want real reach.
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
