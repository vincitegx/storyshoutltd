import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  Video, Users, Wallet, Globe, BarChart3, Shield,
  Check, ArrowRight, ChevronDown, ChevronUp, Sparkles, Cpu
} from 'lucide-react';
import { SoftwareFeature, PricingPlan } from '../types';

const GRADIENT = 'linear-gradient(135deg, #FF5F2E 0%, #FF8A00 100%)';

const FAQS = [
  {
    q: 'What is StoryShout?',
    a: 'StoryShout is an audience promotion platform. Instead of paying for cold reach or expensive influencers, brands create campaigns that real people (Shouters) share to their trusted social circles. Brands get authentic, scalable reach. Shouters earn rewards for their influence.',
  },
  {
    q: 'How does the coin system work?',
    a: "Coins are StoryShout's internal currency — they keep pricing fair across every country. You deposit funds in your local currency via your preferred payment method — Stripe, PayPal, Flutterwave, or Paystack. Deposits convert to coins at a transparent rate. Use coins to fund campaigns. Earn coins by sharing. Withdraw to your bank account anytime.",
  },
  {
    q: 'How much does a campaign cost?',
    a: "Campaign costs depend on the tier you choose (Basic, Advanced, or Premium) and the social platform. Each tier has a set coin cost that covers supporter payouts and platform fees. We publish transparent pricing so you know exactly what you're paying before you launch.",
  },
  {
    q: 'How much do supporters earn?',
    a: 'Supporters earn coins for each verified engagement — sharing, posting, or promoting your campaign content on their social accounts. Earnings vary by supporter tier (Starter, Micro-Influencer, Influencer) and campaign type. The more they engage, the more they earn.',
  },
  {
    q: 'Which social media platforms does StoryShout support?',
    a: 'StoryShout publishes to and verifies engagement on Facebook, Instagram, WhatsApp, Snapchat, and Telegram. Each platform is fully integrated so your campaigns reach supporters wherever they are.',
  },
  {
    q: 'What are the supporter tiers?',
    a: 'There are three tiers based on follower count and engagement history. Starter tier uses a free-before-paid cycle (e.g., 3 free supports, then 1 paid). Micro-Influencers are always paid for campaign slots. Influencers earn on both standard and exclusive campaigns at higher rates.',
  },
  {
    q: 'What payment methods can I use?',
    a: 'StoryShout routes payments by currency: Nigerian Naira (NGN) uses Flutterwave, US Dollars (USD) and British Pounds (GBP) use Stripe, Euros (EUR) use PayPal, and Ghanaian Cedis (GHS) use Flutterwave. More gateways are being added.',
  },
  {
    q: 'What is an exclusive campaign?',
    a: 'Exclusive campaigns are premium campaigns where only Influencer-tier supporters earn coins. Starter and Micro-Influencer supporters participate for free but become eligible for withdrawal after supporting at least one exclusive campaign.',
  },
  {
    q: 'How is my data and money protected?',
    a: 'StoryShout uses industry-standard security: encrypted authentication, multi-factor authentication (MFA), trusted device management, rate limiting, and encryption for all sensitive data. Financial operations use a double-entry system for complete auditability.',
  },
  {
    q: 'How do I get started?',
    a: "Request a demo or join the waitlist via our contact page. StoryShout is currently in active beta, onboarding select creators, brands, and influencers.",
  },
];

const PLATFORM_STATS = [
  { value: '5',  label: 'Social Platforms',  detail: 'Facebook · Instagram · WhatsApp · Snapchat · Telegram' },
  { value: '4',  label: 'Payment Gateways',  detail: 'Stripe · PayPal · Flutterwave · Paystack' },
  { value: '3',  label: 'Supporter Tiers',   detail: 'Starter · Micro-Influencer · Influencer' },
  { value: '4+', label: 'Currencies',        detail: 'NGN · USD · GBP · EUR · GHS' },
];

const DEEP_FEATURES = [
  {
    icon: <Video size={20} />,
    title: 'Campaign Creation & Publishing',
    items: [
      'Upload video or promotional content',
      'Set your coin budget and campaign duration',
      'Campaign goes live across all supported platforms',
      'Track status from launch to completion',
      'Rerun successful campaigns at any time',
    ],
  },
  {
    icon: <Users size={20} />,
    title: 'Supporter & Tier System',
    items: [
      'Starter: try before you earn — a few free supports first',
      'Micro-Influencer: always paid for campaign participation',
      'Influencer: paid on standard and exclusive campaigns',
      'Coins held securely until engagement is verified',
      'Automatic verification on every share',
    ],
  },
  {
    icon: <Wallet size={20} />,
    title: 'Wallet & Payments',
    items: [
      'Separate balances for spending and earned coins',
      'Deposit via Stripe, PayPal, Flutterwave, or Paystack',
      'Transparent conversion rates, shown upfront',
      'Withdraw earnings to your bank or mobile wallet',
      'Full transaction history and balance tracking',
    ],
  },
  {
    icon: <Globe size={20} />,
    title: 'Social Media Integration',
    items: [
      'Facebook and Instagram: full video publishing',
      'WhatsApp Status, Snapchat Stories, and Telegram',
      'Connect your social accounts securely',
      'Automatic follower count tracking',
      'Post insights and engagement analytics',
    ],
  },
  {
    icon: <Shield size={20} />,
    title: 'Security & Account Protection',
    items: [
      'Secure login with optional two-factor authentication',
      'Trusted device management',
      'Industry-standard encryption for all sensitive data',
      'Rate limiting and IP-level protection',
      'Automatic logout after inactivity',
    ],
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Compliance & Transparency',
    items: [
      'Identity verification (KYC) before wallet access',
      'Anti-money laundering (AML) screening',
      'Legal documents accepted digitally',
      'Full transaction records and audit trails',
      'Reconciliation reports for your earnings',
    ],
  },
];

const COIN_STEPS = [
  { n: '1', title: 'Deposit in your currency', desc: 'Use Stripe, PayPal, Flutterwave, or Paystack — whichever works in your country.' },
  { n: '2', title: 'Coins are added instantly', desc: 'Conversion rates are shown upfront before you confirm. No hidden fees.' },
  { n: '3', title: 'Fund campaigns and earn', desc: 'Spend coins on campaigns. Earn coins as a Shouter. Withdraw anytime.' },
];

const getIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case 'video':    return <Video size={22} />;
    case 'users':    return <Users size={22} />;
    case 'wallet':   return <Wallet size={22} />;
    case 'barchart3': return <BarChart3 size={22} />;
    case 'sparkles': return <Sparkles size={22} />;
    default:         return <Cpu size={22} />;
  }
};

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Software() {
  const [features, setFeatures] = useState<SoftwareFeature[]>([]);
  const [pricing,  setPricing]  = useState<PricingPlan[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [openFaq,  setOpenFaq]  = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [featRes, priceRes] = await Promise.all([
          fetch('/api/software/features'),
          fetch('/api/software/pricing'),
        ]);
        if (featRes.ok)  setFeatures(await featRes.json());
        if (priceRes.ok) setPricing(await priceRes.json());
      } catch (err) {
        console.error('Failed to fetch platform data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Platform Features &amp; Pricing — StoryShout Audience Promotion Software</title>
        <meta name="description" content="Explore StoryShout's campaign features, supporter tier system, coin wallet, multi-platform publishing, and transparent pricing plans." />
        <link rel="canonical" href="https://storyshoutltd.com/features" />
        <meta property="og:url" content="https://storyshoutltd.com/features" />
        <meta property="og:title" content="Platform Features & Pricing — StoryShout" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="bg-[#1A0F08] text-white pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,95,46,0.07) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#FF5F2E] uppercase block mb-6">
                Audience Promotion Platform
              </span>
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.04] tracking-tight">
                Everything the<br />
                <span className="text-[#FF5F2E]">platform does.</span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-[#FF5F2E]/40 pl-5 mb-7">
                Create campaigns, fund them with coins, and let real people share your content to their trusted social circles. Transparent pricing. Verified engagement. Real reach.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/contact?subject=Demo Request')}
                  className="inline-flex items-center space-x-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,95,46,0.35)]"
                  style={{ background: GRADIENT }}
                >
                  <span>Request a Demo</span>
                  <ArrowRight size={14} />
                </button>
                <a
                  href="#pricing"
                  className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white border border-white/15 bg-white/6 hover:bg-white/10 px-5 py-2.5 rounded-xl transition-all"
                >
                  View Plans
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM STATS ── */}
      <section className="bg-[#FBF7F4] border-b border-[#EDE8E3] py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[#EDE8E3]">
            {PLATFORM_STATS.map((s, i) => (
              <div key={i} className="md:px-10 first:pl-0 last:pr-0">
                <p
                  className="font-black text-5xl text-[#1A0F08] leading-none"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  {s.value}
                </p>
                <p className="font-display font-bold text-[#1A0F08] text-sm mt-2">{s.label}</p>
                <p className="text-[11px] text-slate-400 font-mono mt-1 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE FEATURES (from API) ── */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-lg mb-14">
            <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              Core Capabilities
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
              Built to turn reach<br />into results.
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#FF5F2E] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {features.map((f, idx) => (
                <FadeIn key={f.id || idx} delay={idx * 0.07}>
                  <div className="bg-[#FBF7F4] border border-[#EDE8E3] rounded-2xl p-8 flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#FFF4EE] text-[#FF5F2E] border border-[#FF5F2E]/15">
                        {getIcon(f.icon)}
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#1A0F08]">{f.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
                    </div>
                    {f.benefits && (
                      <div className="pt-5 mt-5 border-t border-[#EDE8E3] text-xs font-mono text-slate-400">
                        <span className="font-bold text-[#1A0F08]">Key benefit: </span>{f.benefits}
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── DEEP FEATURE BREAKDOWN ── */}
      <section className="bg-[#FBF7F4] border-t border-[#EDE8E3] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-lg mb-14">
            <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              Everything It Does
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
              A detailed look at<br />what StoryShout offers.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DEEP_FEATURES.map((block, i) => (
              <FadeIn key={i} delay={(i % 2) * 0.08}>
                <div className="bg-white border border-[#EDE8E3] rounded-2xl p-8 space-y-5 h-full" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF4EE] text-[#FF5F2E] border border-[#FF5F2E]/15 flex items-center justify-center shrink-0">
                      {block.icon}
                    </div>
                    <h3 className="font-display font-bold text-[#1A0F08]">{block.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start space-x-3 text-sm text-slate-500">
                        <Check size={13} className="text-[#FF5F2E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW COINS WORK ── */}
      <section className="bg-white border-t border-[#EDE8E3] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-4">
                How Pricing Works
              </span>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight mb-5">
                One currency.<br />Every country.
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                StoryShout uses a <strong className="text-[#1A0F08]">coin-based system</strong> to keep pricing fair across every region. You deposit in your local currency — Naira, Dollars, Pounds, Euros, or Cedis — and receive coins at a transparent rate. Campaigns cost coins. Supporters earn coins. Withdraw as real money anytime.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-0">
                {COIN_STEPS.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-start space-x-6 py-7 ${i < COIN_STEPS.length - 1 ? 'border-b border-[#F0EBE5]' : ''}`}
                  >
                    <span
                      className="font-black text-4xl leading-none shrink-0 w-10 text-right select-none"
                      style={{ fontFamily: 'Sora, sans-serif', color: '#FF5F2E', opacity: 0.2 }}
                    >
                      {s.n}
                    </span>
                    <div className="space-y-1 pt-1">
                      <h4 className="font-display font-bold text-[#1A0F08]">{s.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="scroll-mt-24 bg-[#FBF7F4] border-t border-[#EDE8E3] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-lg mb-14">
            <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              Platform Plans
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
              Start free.<br />Scale as you grow.
            </h2>
            <p className="text-slate-500 text-sm mt-4">
              Campaign costs are coin-based — deposit in your local currency.
            </p>
          </div>

          {pricing.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
              {pricing.map((p, idx) => (
                <FadeIn key={p.id || idx} delay={idx * 0.07}>
                  <div
                    className={`relative rounded-2xl p-8 border flex flex-col justify-between ${
                      p.popular
                        ? 'bg-[#1A0F08] text-white border-[#FF5F2E]/30 shadow-xl md:-translate-y-3'
                        : 'bg-white text-[#1A0F08] border-[#EDE8E3]'
                    }`}
                    style={p.popular ? { boxShadow: '0 12px 40px rgba(0,0,0,0.2)' } : { boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
                  >
                    {p.popular === 1 && (
                      <span
                        className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full"
                        style={{ background: GRADIENT }}
                      >
                        Most Popular
                      </span>
                    )}
                    <div className="space-y-5">
                      <h4 className={`font-display font-bold text-lg ${p.popular ? 'text-[#FF8A00]' : 'text-[#1A0F08]'}`}>
                        {p.name}
                      </h4>
                      <div>
                        <span
                          className="font-black text-4xl leading-none"
                          style={{ fontFamily: 'Sora, sans-serif' }}
                        >
                          {p.price}
                        </span>
                        <span className={`text-xs font-mono ml-2 ${p.popular ? 'text-slate-400' : 'text-slate-400'}`}>
                          {p.billing}
                        </span>
                      </div>
                      <hr className={p.popular ? 'border-[#1F2937]' : 'border-[#F0EBE5]'} />
                      <ul className="space-y-3 text-sm">
                        {p.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2.5">
                            <Check size={13} className="text-[#FF5F2E] shrink-0 mt-0.5" />
                            <span className={p.popular ? 'text-slate-300' : 'text-slate-500'}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-7">
                      <button
                        onClick={() => navigate(`/contact?subject=Pricing Inquiry&plan=${encodeURIComponent(p.name)}`)}
                        className={`w-full py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition-all hover:-translate-y-0.5 ${
                          p.popular ? 'text-white shadow-[0_4px_16px_rgba(255,95,46,0.35)]' : 'bg-[#FBF7F4] hover:bg-[#F5EDE5] text-[#1A0F08] border border-[#EDE8E3]'
                        }`}
                        style={p.popular ? { background: GRADIENT } : {}}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            !loading && (
              <p className="text-slate-400 text-sm">Pricing plans coming soon. <a href="/contact?subject=Pricing Inquiry" className="text-[#FF5F2E] hover:underline">Contact us</a> for details.</p>
            )
          )}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section id="faqs" className="scroll-mt-24 bg-white border-t border-[#EDE8E3] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-4">
                FAQs
              </span>
              <h2 className="font-display font-extrabold text-4xl text-[#1A0F08] leading-tight">
                Common<br />questions,<br />answered.
              </h2>
              <p className="text-slate-400 text-sm mt-5">
                Still have questions? <a href="/contact" className="text-[#FF5F2E] hover:underline">Reach out directly.</a>
              </p>
            </div>

            <div className="lg:col-span-8 space-y-0">
              {FAQS.map((faq, i) => (
                <div key={i} className={`py-5 ${i < FAQS.length - 1 ? 'border-b border-[#F0EBE5]' : ''}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-6 text-left"
                  >
                    <span className="font-display font-bold text-[#1A0F08] text-sm leading-snug">{faq.q}</span>
                    <span className="shrink-0 mt-0.5">
                      {openFaq === i
                        ? <ChevronUp size={16} className="text-[#FF5F2E]" />
                        : <ChevronDown size={16} className="text-slate-300" />}
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="mt-3 text-sm text-slate-500 leading-relaxed pr-8">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1A0F08] py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,95,46,0.06) 0%, transparent 65%)' }} />
        <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center space-y-7">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-tight">
            Ready to turn your<br />audience into your<br />
            <span className="text-[#FF5F2E]">marketing engine?</span>
          </h2>
          <p className="text-slate-400 text-base font-light">
            StoryShout is in active beta. Join the waitlist or request a live walkthrough of the platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/contact?subject=Join Waitlist')}
              className="inline-flex items-center space-x-2 text-white font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(255,95,46,0.4)]"
              style={{ background: GRADIENT }}
            >
              <span>Join the Waitlist</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
