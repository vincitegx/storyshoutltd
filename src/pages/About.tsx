import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, TrendingUp, Users, Zap, Globe, ArrowRight } from 'lucide-react';

const VALUES = [
  {
    icon: <Shield size={28} />,
    title: 'Technical Integrity',
    desc: 'We do not cut corners. KYC compliance, double-entry ledgers, idempotency keys, optimistic locking — every financial operation is built to withstand production load.',
  },
  {
    icon: <Users size={28} />,
    title: 'Creator-First Design',
    desc: 'Every feature exists to serve creators and supporters. Campaign tiers, social insight syncing, and multi-gateway payouts are built around the people who use the platform daily.',
  },
  {
    icon: <Globe size={28} />,
    title: 'African Market Focus',
    desc: 'StoryShout is architected for African infrastructure realities — Flutterwave for NGN and GHC, multi-currency wallets, country-level fee structures, and local compliance requirements.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Transparent Economics',
    desc: 'Commission rates are visible in campaign tiers. The ledger is double-entry. Holding accounts are per-support. No hidden fees, no opaque revenue extraction.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Reliable by Default',
    desc: 'Saga orchestration, Outbox Pattern, Quartz job scheduling, Spring State Machine, retry logic, and compensation flows — the platform is designed to never silently fail.',
  },
];

export default function About() {
  return (
    <div className="py-12 md:py-24 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Header ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-20">
        <div className="md:col-span-8 space-y-4">
          <span className="text-xs bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-widest">
            About StoryShout
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 dark:text-white leading-none tracking-tight">
            Built to Monetize<br />
            <span className="text-brand-teal">Video at Scale.</span>
          </h1>
        </div>
        <div className="md:col-span-4 md:pt-14">
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light border-l-2 border-brand-teal pl-4">
            StoryShout is a fintech-grade video campaign monetization platform connecting creators with supporters through a transparent coin economy and multi-gateway payment infrastructure.
          </p>
        </div>
      </div>

      {/* ── Origin Story ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative rounded-3xl overflow-hidden aspect-4/3 border border-slate-200 dark:border-slate-800 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
            alt="StoryShout team"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover dark:brightness-90 hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 p-8 text-white z-10 space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-brand-teal uppercase">Engineering Core</span>
            <p className="font-display font-bold text-lg">Lekki HQ, Lagos</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">Why We Built StoryShout</h2>
            <p className="text-xs font-mono text-brand-teal uppercase tracking-widest">Origin of the platform</p>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            StoryShout was born from a simple observation: African content creators were building massive audiences on social media but had no reliable, locally-aware infrastructure to turn that reach into income. International platforms either didn't support local payment gateways or had fee structures that made small-creator payouts economically unviable.
          </p>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            StoryShout Limited, founded by software engineer David Ogbodu and headquartered in Lekki, Lagos, set out to build the platform that should exist — one with a coin economy that mirrors real exchange rates, social verification that checks actual engagement, and payment routing that works natively with Flutterwave, Stripe, PayPal, and Paystack based on the user's currency.
          </p>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            The result is StoryShout: a full-stack platform built on Spring Boot, Angular, PostgreSQL, and Redis, with enterprise-grade security, compliance infrastructure, and a supporter tier system designed to reward creators at every level of influence.
          </p>
        </div>
      </div>

      {/* ── Founder ── */}
      <div className="p-8 md:p-14 bg-white dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-3xl mb-24 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 shrink-0 max-w-sm mx-auto md:mx-0">
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-brand-teal/30 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=450&auto=format&fit=crop&q=80"
                alt="David Ogbodu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-brand-teal text-slate-950 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                FOUNDER
              </div>
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">David Ogbodu</h3>
            <p className="text-brand-teal text-xs font-mono uppercase tracking-widest">Founder & Lead Architect — StoryShout Limited</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              &quot;The challenge wasn't building the features — it was building them right. A platform that handles people's money needs idempotency at every mutation, a double-entry ledger, optimistic locking on wallet operations, and compensation flows for every failure state. StoryShout is engineered to that standard.&quot;
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                Lagos, Nigeria • david@storyshoutltd.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Values ── */}
      <div className="space-y-12 mb-20">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">What We Stand For</h2>
          <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">Core engineering and product principles</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="text-brand-teal">{v.icon}</div>
              <h4 className="font-display font-bold text-slate-950 dark:text-white">{v.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="p-8 md:p-12 bg-gradient-to-r from-slate-950 via-brand-navy to-slate-950 border border-brand-teal/20 rounded-3xl text-center">
        <h3 className="font-display font-extrabold text-2xl text-white mb-4">Interested in StoryShout?</h3>
        <p className="text-slate-300 text-sm mb-6">Request a demo or get in touch. We're onboarding creators, brands, and enterprise partners.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact?subject=Demo Request"
            className="inline-flex items-center space-x-2 bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-7 py-3.5 rounded-xl transition-all"
          >
            <span>Request a Demo</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/features"
            className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-7 py-3.5 rounded-xl border border-slate-700 transition-all"
          >
            <span>Explore Features</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
