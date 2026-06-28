import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { useToast } from '../components/Toast';

const GRADIENT = 'linear-gradient(135deg, #FF5F2E 0%, #FF8A00 100%)';

const POSTS = [
  {
    slug: 'why-influencer-marketing-is-broken',
    title: 'Why Influencer Marketing Is Broken — And What Should Replace It',
    excerpt: "Paying celebrities for shoutouts is expensive, inconsistent, and often fake. There's a better way to get real people talking about your brand.",
    date: 'June 10, 2026',
    readTime: '6 min',
    category: 'Marketing Strategy',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    featured: true,
  },
  {
    slug: 'what-is-audience-promotion',
    title: 'What Is Audience Promotion? The One-to-One-to-Many Model Explained',
    excerpt: "Forget cold reach. Audience promotion turns your existing supporters into your marketing team. Here's how the model works.",
    date: 'June 12, 2026',
    readTime: '5 min',
    category: 'Platform Explainer',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    featured: false,
  },
  {
    slug: 'startup-marketing-without-big-budget',
    title: 'How Startups Can Compete With Big Brands — Without a Big Budget',
    excerpt: "When you can't outspend the competition, outsmart them. How startups are using word-of-mouth at scale.",
    date: 'June 14, 2026',
    readTime: '7 min',
    category: 'For Startups',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=80',
    featured: false,
  },
  {
    slug: 'indie-musician-promotion-guide',
    title: "The Indie Musician's Guide to Promotion Without a Label Budget",
    excerpt: "You make great music. But getting heard without a major label is hard. Here's how independent artists are turning fans into promoters.",
    date: 'June 16, 2026',
    readTime: '6 min',
    category: 'For Creators',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    featured: false,
  },
  {
    slug: 'real-engagement-vs-vanity-metrics',
    title: 'Real Engagement vs. Vanity Metrics: Why Shares Matter More Than Likes',
    excerpt: 'A thousand likes from strangers means nothing. One share to a trusted circle is worth more.',
    date: 'June 18, 2026',
    readTime: '5 min',
    category: 'Marketing Strategy',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    featured: false,
  },
  {
    slug: 'word-of-mouth-marketing-statistics',
    title: 'Word-of-Mouth Marketing in 2026: The Statistics Every Brand Should Know',
    excerpt: 'People trust recommendations from friends 10x more than ads. We compiled the latest data on why word-of-mouth wins.',
    date: 'June 20, 2026',
    readTime: '7 min',
    category: 'Data & Insights',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    featured: false,
  },
];

const featuredPost = POSTS.find(p => p.featured);
const gridPosts    = POSTS.filter(p => !p.featured);

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="inline-block text-[9px] font-mono font-bold tracking-[0.18em] uppercase text-[#FF5F2E] bg-[#FFF4EE] border border-[#FF5F2E]/15 px-2.5 py-1 rounded-full">
      {label}
    </span>
  );
}

export default function Blog() {
  const [subEmail,  setSubEmail]  = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subMsg,    setSubMsg]    = useState('');
  const { showToast } = useToast();

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!subEmail.trim()) {
      showToast('error', 'Please enter a valid email address.');
      return;
    }
    setSubStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe.');
      setSubStatus('success');
      setSubMsg(data.message || "You're subscribed!");
      setSubEmail('');
      showToast('success', data.message || "You're subscribed! Insights coming your way.");
    } catch (err: any) {
      setSubStatus('error');
      setSubMsg(err.message || 'Something went wrong. Please try again.');
      showToast('error', err.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <Helmet>
        <title>Blog — Audience Promotion Insights &amp; Strategies | StoryShout</title>
        <meta name="description" content="Insights on audience promotion, word-of-mouth marketing, startup growth strategies, and creator promotion. Learn how to turn your audience into your marketing engine." />
        <link rel="canonical" href="https://storyshoutltd.com/blog" />
        <meta property="og:url" content="https://storyshoutltd.com/blog" />
        <meta property="og:title" content="Blog — Audience Promotion Insights & Strategies | StoryShout" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ── DARK EDITORIAL HEADER ── */}
      <section className="bg-[#1A0F08] text-white pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,95,46,0.07) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#FF5F2E] uppercase block mb-6">
                StoryShout Blog
              </span>
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.04] tracking-tight">
                The thinking<br />
                <span className="text-[#FF5F2E]">behind the platform.</span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-[#FF5F2E]/40 pl-5">
                Insights on audience promotion, word-of-mouth marketing, startup growth, and creator promotion. Written by the team building StoryShout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      {featuredPost && (
        <section className="bg-[#FBF7F4] py-16 border-b border-[#EDE8E3]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-8">
              Editor's Pick
            </span>
            <Link to={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-[#EDE8E3]" style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}>
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-4 lg:pl-4">
                  <CategoryPill label={featuredPost.category} />
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#1A0F08] leading-tight group-hover:text-[#FF5F2E] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-500 text-base leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center space-x-1.5">
                      <Calendar size={11} />
                      <span>{featuredPost.date}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <Clock size={11} />
                      <span>{featuredPost.readTime} read</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#FF5F2E] font-bold text-sm pt-1">
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── POST GRID ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-xs mb-12">
            <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              All Articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gridPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col bg-[#FBF7F4] border border-[#EDE8E3] rounded-2xl overflow-hidden transition-all hover:shadow-md"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                >
                  <div className="aspect-video overflow-hidden border-b border-[#EDE8E3]">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                  </div>
                  <div className="p-6 space-y-3 flex-1 flex flex-col">
                    <div className="flex items-center space-x-3">
                      <CategoryPill label={post.category} />
                    </div>
                    <h3 className="font-display font-bold text-[#1A0F08] group-hover:text-[#FF5F2E] transition-colors leading-snug flex-1">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#EDE8E3] mt-auto">
                      <span className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                        <Calendar size={10} />
                        <span>{post.date}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                        <Clock size={10} />
                        <span>{post.readTime} read</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="bg-[#1A0F08] py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,95,46,0.06) 0%, transparent 65%)' }} />
        <div className="relative max-w-xl mx-auto px-5 sm:px-8 text-center space-y-7">
          <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#FF5F2E] uppercase block">Newsletter</span>
          <h2 className="font-display font-extrabold text-4xl text-white leading-tight">
            Audience promotion<br />insights in your inbox.
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Strategies, case studies, and product updates. No spam — just the kind of stuff that actually helps you grow.
          </p>

          <AnimatePresence mode="wait">
            {subStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center space-x-2 text-sm font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-5 py-4 max-w-sm mx-auto"
              >
                <span>✓</span>
                <span>{subMsg}</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
              >
                <input
                  type="email"
                  value={subEmail}
                  onChange={e => { setSubEmail(e.target.value); if (subStatus !== 'idle') setSubStatus('idle'); }}
                  placeholder="your@email.com"
                  required
                  disabled={subStatus === 'loading'}
                  className="flex-1 px-4 py-3.5 rounded-xl bg-[#1A2333] border border-[#2D3748] text-white text-sm outline-none focus:border-[#FF5F2E] transition-colors placeholder:text-slate-500 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={subStatus === 'loading'}
                  className="text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,95,46,0.35)] whitespace-nowrap disabled:opacity-60"
                  style={{ background: GRADIENT }}
                >
                  {subStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {subStatus === 'error' && (
            <p className="text-[11px] text-red-400 font-mono">{subMsg}</p>
          )}
          <p className="text-[10px] text-slate-600 font-mono">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}
