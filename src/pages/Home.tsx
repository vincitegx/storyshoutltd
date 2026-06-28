import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Play, ChevronRight } from 'lucide-react';

const GRADIENT = 'linear-gradient(135deg, #FF5F2E 0%, #FF8A00 100%)';

const TAGLINES = ['Retold by Everyone.', 'Shared by Real People.', 'Amplified by Trust.'];

const STEPS = [
  {
    n: '01',
    title: 'Create a campaign',
    body: 'Upload your content — a video, music clip, or promo reel. Set your coin budget and choose which social platforms your campaign should hit. Takes minutes.',
  },
  {
    n: '02',
    title: 'Real people share it',
    body: 'Shouters — everyday users with real social circles — pick your campaign and share it to their WhatsApp, Instagram, Snapchat, Facebook, or Telegram.',
  },
  {
    n: '03',
    title: 'Engagement is verified',
    body: "StoryShout checks that every share reached real people. Only verified engagement moves coins — no fake impressions, no empty reach.",
  },
  {
    n: '04',
    title: 'Everyone wins',
    body: 'You get authentic reach inside trusted social circles. Shouters earn coins and withdraw real currency. One campaign creates a ripple through real networks.',
  },
];

const STATS = [
  { value: '5',  label: 'Social Platforms',  detail: 'Facebook · Instagram · WhatsApp · Snapchat · Telegram' },
  { value: '4',  label: 'Payment Gateways',  detail: 'Stripe · PayPal · Flutterwave · Paystack' },
  { value: '3',  label: 'Supporter Tiers',   detail: 'Starter · Micro-Influencer · Influencer' },
  { value: '4+', label: 'Currencies',        detail: 'NGN · USD · GBP · EUR · GHS' },
];

const TESTIMONIALS = [
  {
    quote: "We spent a fraction of what we'd pay an influencer and got better results. Real people shared our product because they actually liked it. Sign-ups tripled that week.",
    name: 'Lucky Ovie',
    role: 'Startup Founder',
    location: 'Lagos',
    initial: 'L',
  },
  {
    quote: "As a Shouter, I earn by sharing brands I genuinely use. It's not selling out — it's getting paid for what I'd do anyway. I've withdrawn earnings twice this month.",
    name: 'Akinima Chineye',
    role: 'Shouter',
    location: 'Abuja',
    initial: 'A',
  },
  {
    quote: "We tried ads. We tried influencers. Nothing gave us the authentic word-of-mouth StoryShout delivered. Every share came from someone who actually cared.",
    name: 'Joseph Eseoghene',
    role: 'Brand Owner',
    location: 'Port Harcourt',
    initial: 'J',
  },
];

function AnimatedTagline() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % TAGLINES.length), 3400);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -28, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="text-[#FF5F2E] block"
      >
        {TAGLINES[index]}
      </motion.span>
    </AnimatePresence>
  );
}

function CountUp({ target }: { target: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <span
      ref={ref}
      className="transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(8px)' }}
    >
      {target}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>StoryShout — Turn Your Audience Into Your Marketing Engine</title>
        <meta name="description" content="StoryShout turns everyday users into micro-influencers who share your content to trusted social circles. Affordable, authentic, and scalable audience promotion for startups, creators, and small brands." />
        <link rel="canonical" href="https://storyshoutltd.com/" />
        <meta property="og:url" content="https://storyshoutltd.com/" />
        <meta property="og:title" content="StoryShout — Turn Your Audience Into Your Marketing Engine" />
        <meta property="og:description" content="Real people. Real circles. Real reach. Audience promotion built for startups and creators." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative bg-[#1A0F08] text-white overflow-hidden pt-28 pb-32 md:pt-36 md:pb-44">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,95,46,0.08) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 -left-24 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,138,0,0.05) 0%, transparent 65%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <div className="inline-flex items-center space-x-2 border border-[#FF5F2E]/20 bg-[#FF5F2E]/8 text-[#FF8A00] text-[10px] font-mono font-bold uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F2E] animate-pulse" />
            <span>Now in Beta — Accepting Applications</span>
          </div>

          <h1 className="font-display font-extrabold leading-[1.05] tracking-tight">
            <span className="block text-5xl sm:text-6xl md:text-[80px] lg:text-[96px]">Your Story,</span>
            <span className="block text-5xl sm:text-6xl md:text-[80px] lg:text-[96px] min-h-[1.15em]">
              <AnimatedTagline />
            </span>
          </h1>

          <p className="mt-8 text-slate-200 text-lg sm:text-xl font-semibold leading-relaxed max-w-2xl mx-auto">
            Why reach one person when you can reach everyone they know?
          </p>

          <p className="mt-4 text-slate-400 text-base leading-relaxed max-w-xl mx-auto">
            StoryShout turns everyday users into micro-influencers who share your content to trusted social circles. You get authentic reach. They earn rewards. One post becomes one-to-many.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact?subject=Demo Request"
              className="inline-flex items-center space-x-2 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(255,95,46,0.4)]"
              style={{ background: GRADIENT }}
            >
              <span>Request Early Access</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center space-x-2 bg-white/8 hover:bg-white/12 border border-white/12 text-white font-medium px-7 py-3.5 rounded-xl transition-all"
            >
              <Play size={14} className="fill-white" />
              <span>See How It Works</span>
            </Link>
          </div>

          <div className="mt-20 flex items-center justify-center space-x-4">
            <div className="h-px w-16 bg-white/8" />
            <span className="text-[10px] font-mono text-white/25 uppercase tracking-[0.18em]">
              Trusted by early adopters in Lagos &amp; beyond
            </span>
            <div className="h-px w-16 bg-white/8" />
          </div>
        </div>
      </section>

      {/* ── TWO AUDIENCES ── */}
      <section className="bg-[#FBF7F4] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-lg mb-14">
            <span className="text-[10px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              One Platform
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
              Two kinds<br />of wins.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Brands */}
            <div className="bg-[#1A0F08] text-white rounded-2xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
                style={{ background: 'radial-gradient(circle at top right, rgba(255,95,46,0.10), transparent 65%)' }} />
              <div className="relative z-10">
                <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#FF5F2E] uppercase block mb-6">
                  For Brands &amp; Creators
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl mb-5 leading-tight">
                  Your content, inside<br />trusted circles.
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  Create a campaign, fund it with coins, and watch real people carry your message into social circles that actually matter. No bots. No cold audiences. Just genuine word-of-mouth at scale.
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    'Pay only for verified engagement — not impressions',
                    'Reach 5 platforms: Facebook, Instagram, WhatsApp, Snapchat, Telegram',
                    'Full campaign dashboard and status tracking',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm text-slate-300">
                      <Check size={14} className="text-[#FF5F2E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/features"
                  className="inline-flex items-center space-x-2 text-sm font-bold text-white px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all"
                  style={{ background: GRADIENT }}
                >
                  <span>See Campaign Features</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Shouters */}
            <div className="bg-white border border-[#EDE8E3] rounded-2xl p-10 relative overflow-hidden" style={{ boxShadow: '0 2px 24px rgba(0,0,0,0.05)' }}>
              <div className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none"
                style={{ background: 'radial-gradient(circle at bottom left, rgba(255,95,46,0.04), transparent 65%)' }} />
              <div className="relative z-10">
                <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#FF5F2E] uppercase block mb-6">
                  For Shouters
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#1A0F08] mb-5 leading-tight">
                  Share what you love.<br />
                  <span className="text-[#FF5F2E]">Get paid for it.</span>
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  Pick campaigns you actually believe in, share them to your social accounts, and earn coins when your posts get verified engagement. Withdraw real currency. No gimmicks.
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    'Three earning tiers based on your social reach and history',
                    'Coins held securely — released when engagement is verified',
                    'Withdraw to your bank account or mobile wallet anytime',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm text-slate-600">
                      <Check size={14} className="text-[#FF5F2E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/features#pricing"
                  className="inline-flex items-center space-x-2 text-sm font-bold text-[#FF5F2E] hover:text-[#FF8A00] transition-colors"
                >
                  <span>Learn about Shouter tiers</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-24 md:py-32 border-t border-[#EDE8E3]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-[10px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-4">
                How It Works
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
                From campaign<br />to cash in<br />four steps.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mt-6 max-w-xs">
                StoryShout handles publishing, verification, and payments — so you focus on the content.
              </p>
              <Link
                to="/features"
                className="mt-8 inline-flex items-center space-x-2 text-sm font-bold text-[#FF5F2E] hover:text-[#FF8A00] transition-colors"
              >
                <span>Full platform overview</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="lg:col-span-8">
              {STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`flex items-start space-x-8 py-9 ${i < STEPS.length - 1 ? 'border-b border-[#F0EBE5]' : ''}`}
                >
                  <span
                    className="font-black text-5xl leading-none shrink-0 w-14 text-right select-none"
                    style={{ fontFamily: 'Sora, sans-serif', color: '#FF5F2E', opacity: 0.15 }}
                  >
                    {step.n}
                  </span>
                  <div className="space-y-2 pt-1">
                    <h4 className="font-display font-bold text-xl text-[#1A0F08]">{step.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#FBF7F4] border-t border-[#EDE8E3] py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[#EDE8E3]">
            {STATS.map((s, i) => (
              <div key={i} className="md:px-10 first:pl-0 last:pr-0">
                <p
                  className="font-black text-5xl md:text-6xl text-[#1A0F08] leading-none"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  <CountUp target={s.value} />
                </p>
                <p className="font-display font-bold text-[#1A0F08] text-sm mt-2">{s.label}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-1 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white py-24 md:py-32 border-t border-[#EDE8E3]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-lg mb-14">
            <span className="text-[10px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              What People Say
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
              Heard from<br />the field.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#FBF7F4] border border-[#EDE8E3] rounded-2xl p-8 flex flex-col justify-between"
              >
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center space-x-3 mt-8 pt-6 border-t border-[#EDE8E3]">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-display font-bold text-sm shrink-0"
                    style={{ background: GRADIENT }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-display font-bold text-[#1A0F08] text-sm">{t.name}</p>
                    <p className="text-[10px] font-mono text-[#FF5F2E] uppercase tracking-wider mt-0.5">
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-[#1A0F08] py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,95,46,0.06) 0%, transparent 65%)' }} />
        <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center space-y-7">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-tight">
            Ready to turn your<br />audience into your<br />
            <span className="text-[#FF5F2E]">marketing engine?</span>
          </h2>
          <p className="text-slate-400 text-base font-light leading-relaxed">
            StoryShout is in active beta — onboarding startups, indie musicians, creators, and small brands who want real reach without the influencer price tag.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact?subject=Join Waitlist"
              className="inline-flex items-center space-x-2 text-white font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(255,95,46,0.4)]"
              style={{ background: GRADIENT }}
            >
              <span>Join the Waitlist</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center space-x-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              <span>Explore the platform</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
