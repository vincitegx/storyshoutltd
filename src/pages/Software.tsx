import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Video, Users, Wallet, Globe, BarChart3, Shield,
  Check, ArrowRight, ChevronDown, ChevronUp, Sparkles, Cpu
} from 'lucide-react';
import { SoftwareFeature, PricingPlan } from '../types';

const FAQS = [
  {
    q: 'What is StoryShout?',
    a: 'StoryShout is a video campaign monetization platform. Creators upload videos, fund campaigns with coins, and supporters earn coins by engaging with that content on social media. The platform verifies engagement and releases payouts automatically.',
  },
  {
    q: 'How does the coin system work?',
    a: 'Coins are StoryShout\'s internal currency. You deposit funds in your local currency (Naira, Dollars, Pounds, Euros, Cedis) via your preferred payment method — Stripe, PayPal, Flutterwave, or Paystack. Deposits are converted to coins at a transparent rate. You use coins to fund campaigns, and earned coins can be withdrawn back to your bank account or mobile wallet at any time.',
  },
  {
    q: 'How much does a campaign cost?',
    a: 'Campaign costs depend on the tier you choose (Basic, Advanced, or Premium) and the social platform. Each tier has a set coin cost that covers supporter payouts and platform fees. We publish transparent pricing so you know exactly what you\'re paying before you launch.',
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
    q: 'Is there a compliance requirement to use the platform?',
    a: 'Yes. StoryShout requires identity verification (KYC), anti-money laundering (AML) screening, and acceptance of our legal documents (Terms of Service, Financial Services Agreement) before wallet and campaign features are activated. This keeps the platform safe for everyone.',
  },
  {
    q: 'Can I run a free campaign?',
    a: 'Yes. Free campaigns have no coin budget and don\'t pay supporters — they\'re for reach and visibility. Paid and exclusive campaigns have no daily cap and full supporter earning functionality.',
  },
  {
    q: 'How do I get started?',
    a: 'Request a demo or join the waitlist via our contact page. StoryShout is currently in active beta, onboarding select creators, brands, and influencers. Enterprise and corporate inquiries are welcome.',
  },
];

const PLATFORM_STATS = [
  { label: 'Social Platforms', value: '5' },
  { label: 'Payment Gateways', value: '4' },
  { label: 'Supporter Tiers', value: '3' },
  { label: 'Supported Currencies', value: '4+' },
];

const getIcon = (iconName: string) => {
  switch (iconName?.toLowerCase()) {
    case 'video': return <Video size={24} />;
    case 'users': return <Users size={24} />;
    case 'wallet': return <Wallet size={24} />;
    case 'barchart3': return <BarChart3 size={24} />;
    case 'sparkles': return <Sparkles size={24} />;
    default: return <Cpu size={24} />;
  }
};

export default function Software() {
  const [features, setFeatures] = useState<SoftwareFeature[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [featRes, priceRes] = await Promise.all([
          fetch('/api/software/features'),
          fetch('/api/software/pricing'),
        ]);
        if (featRes.ok) setFeatures(await featRes.json());
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
      <div className="py-12 md:py-20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Masthead ── */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
          <span className="text-xs bg-brand-teal/10 border border-brand-teal/30 px-3.5 py-1.5 rounded-full text-brand-teal font-mono uppercase tracking-widest font-bold">
            Video Campaign Monetization Platform
          </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
              StoryShout Platform Features
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg font-light leading-relaxed">
              Create video campaigns, fund them with coins, and let supporters earn by engaging with your content across social media. Multi-currency wallets, transparent pricing, and automated payouts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <button
                  onClick={() => navigate('/contact?subject=Demo Request')}
                  className="bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center space-x-2"
              >
                <span>Request a Demo</span>
                <ArrowRight size={16} />
              </button>
              <a
                  href="#pricing"
                  className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3.5 rounded-xl font-medium transition-all"
              >
                View Plans
              </a>
            </div>
          </div>

          {/* ── Platform Stats ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
            {PLATFORM_STATS.map((s, i) => (
                <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center shadow-sm">
                  <p className="font-display font-black text-4xl text-brand-teal">{s.value}</p>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
            ))}
          </div>

          {/* ── Core Features ── */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                Core Platform Capabilities
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Everything you need to create, fund, and monetize video campaigns.
              </p>
            </div>

            {loading ? (
                <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
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
                              <span className="font-bold text-slate-700 dark:text-slate-300">KEY BENEFITS: </span>{f.benefits}
                            </div>
                        )}
                      </div>
                  ))}
                </div>
            )}
          </div>

          {/* ── Deep Feature Breakdown ── */}
          <div className="mb-24 space-y-6">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                Everything the Platform Does
              </h2>
              <p className="text-slate-500 text-sm mt-1">A detailed look at what StoryShout offers creators and supporters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Video size={20} />,
                  title: 'Campaign Creation & Publishing',
                  items: [
                    'Upload videos in any common format',
                    'Automatic processing and optimization for each social platform',
                    'One-click publishing to Facebook, Instagram, WhatsApp, Snapchat, and Telegram',
                    'Track campaign status from submission to completion',
                    'Rerun successful campaigns or pause underperforming ones',
                  ],
                },
                {
                  icon: <Users size={20} />,
                  title: 'Supporter & Tier System',
                  items: [
                    'Starter tier: free-before-paid cycle — try before you earn',
                    'Micro-Influencer: always paid for campaign participation',
                    'Influencer: paid on standard and exclusive campaigns at higher rates',
                    'Coins held securely until engagement is verified',
                    'Automatic verification when supporters share your content',
                  ],
                },
                {
                  icon: <Wallet size={20} />,
                  title: 'Wallet & Payments',
                  items: [
                    'Separate balances for spending and earned coins',
                    'Deposit via Stripe, PayPal, Flutterwave, or Paystack',
                    'Transparent conversion rates between your currency and coins',
                    'Withdraw earnings to your bank account or mobile wallet',
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
                    'Trusted device management — approve new devices easily',
                    'Protection against unauthorized access and suspicious activity',
                    'Industry-standard encryption for all sensitive data',
                    'Automatic logout after periods of inactivity',
                  ],
                },
                {
                  icon: <BarChart3 size={20} />,
                  title: 'Compliance & Transparency',
                  items: [
                    'Identity verification to protect the platform',
                    'Anti-money laundering screening',
                    'Accept terms of service and financial agreements digitally',
                    'Full transaction records and audit trails',
                    'Reconciliation reports for your earnings',
                  ],
                },
              ].map((block, i) => (
                  <div key={i} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-brand-teal/10 text-brand-teal border border-brand-teal/20">{block.icon}</div>
                      <h3 className="font-display font-bold text-slate-900 dark:text-white">{block.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {block.items.map((item, j) => (
                          <li key={j} className="flex items-start space-x-2 text-sm text-slate-600 dark:text-slate-300">
                            <Check size={14} className="text-brand-teal shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                      ))}
                    </ul>
                  </div>
              ))}
            </div>
          </div>

          {/* ── How Pricing Works ── */}
          <div className="mb-20 p-8 md:p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                How Pricing Works
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                StoryShout uses a <strong className="text-brand-teal">coin-based system</strong>. You deposit funds in your local currency (Naira, Dollars, Pounds, Euros, or Cedis) and receive coins at a transparent exchange rate. Campaigns cost coins, and supporters earn coins — the fiat value depends on your region and chosen payment method. This keeps pricing fair for everyone, regardless of currency.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
                {[
                  { step: '1', title: 'Deposit in your currency', desc: 'Use Stripe, PayPal, Flutterwave, or Paystack — whichever works in your country.' },
                  { step: '2', title: 'Coins are added to your wallet', desc: 'Conversion rates are shown upfront. No hidden fees.' },
                  { step: '3', title: 'Fund campaigns and earn', desc: 'Spend coins on campaigns. Earn coins as a supporter. Withdraw anytime.' },
                ].map((s, i) => (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="text-2xl font-display font-black text-brand-teal/30">{s.step}</span>
                      <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm mt-1">{s.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.desc}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Pricing Plans ── */}
          <div id="pricing" className="scroll-mt-24 mb-24">
            <div className="text-center max-w-xl mx-auto mb-14">
              <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">
                Platform Plans
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Start free. Scale as you grow. Campaign costs are coin-based — deposit in your local currency.
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
                              <Check size={16} className="shrink-0 mt-0.5 text-brand-teal" />
                              <span className={p.popular ? 'text-slate-300' : 'text-slate-600 dark:text-slate-300'}>{f}</span>
                            </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-8">
                      <button
                          onClick={() => navigate(`/contact?subject=Pricing Inquiry&plan=${encodeURIComponent(p.name)}`)}
                          className={`w-full py-3 rounded-xl font-bold text-xs font-mono uppercase tracking-wider transition-all ${
                              p.popular
                                  ? 'bg-brand-teal hover:bg-brand-teal-light text-slate-900'
                                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-white'
                          }`}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* ── FAQs ── */}
          <div id="faqs" className="mb-24 scroll-mt-24">
            <div className="text-center max-w-xl mx-auto mb-12">
              <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">Frequently Asked Questions</h2>
              <p className="text-slate-500 text-sm mt-1">Everything you need to know about StoryShout.</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {FAQS.map((faq, i) => (
                  <div
                      key={i}
                      className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden"
                  >
                    <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-display font-bold text-slate-900 dark:text-white text-sm">{faq.q}</span>
                      {openFaq === i
                          ? <ChevronUp size={16} className="text-brand-teal shrink-0" />
                          : <ChevronDown size={16} className="text-slate-400 shrink-0" />}
                    </button>
                    {openFaq === i && (
                        <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                          {faq.a}
                        </div>
                    )}
                  </div>
              ))}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="p-8 md:p-12 bg-gradient-to-r from-slate-950 via-brand-navy to-slate-950 border border-brand-teal/20 rounded-3xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(69,162,158,0.1),transparent)]" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Ready to launch your first video campaign?
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                StoryShout is in active beta. Join the waitlist or request a live walkthrough of the platform.
              </p>
              <div className="pt-2">
                <button
                    onClick={() => navigate('/contact?subject=Join Waitlist')}
                    className="bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-8 py-4 rounded-xl transition-all shadow-xl inline-flex items-center space-x-2"
                >
                  <span>Join the Waitlist</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
}