import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Server, Music, Award, Users, ChevronRight, Sparkles, Send } from 'lucide-react';

const TAGLINES = [
  "Campaigns That Convert",
  "Music That Moves",
  "Stories That Amplify"
];

const TESTIMONIALS = [
  {
    quote: "StoryShout's campaign management tool unlocked an 85% mobile delivery threshold for our fintech alerts across West Africa.",
    author: "Gbenga Adebayo",
    role: "VP of Growth, CorePay Africa"
  },
  {
    quote: "Working with StoryShout Records has completely shifted how my music is distributed. They treat audio like engineering.",
    author: "David Ogbodu",
    role: "Featured Label Artist & Founder"
  },
  {
    quote: "Their local dialect localization algorithm is unbelievably accurate. It turned standard marketing jargon into highly-engaging Lagos slang.",
    author: "Chioma Nwosu",
    role: "Brand Director, Savor Beverages Nigeria"
  }
];

export default function Home() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="homepage" className="overflow-hidden">
      {/* Hero section */}
      <section className="relative overflow-hidden pt-20 pb-20 md:py-32 bg-[#0B0C10] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(69,162,158,0.15),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto pb-12">
            {/* Animated cycling tagline badge */}
            <div className="inline-flex items-center space-x-2 bg-brand-teal/10 border border-brand-teal/30 px-3 py-1.5 rounded-full text-brand-teal font-mono text-xs uppercase tracking-widest mb-6">
              <Sparkles size={14} className="animate-pulse" />
              <span>StoryShout Limited</span>
            </div>

            {/* Cycling Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-6">
              Code That Speaks.<br />
              <div className="text-brand-teal min-h-[50px] sm:min-h-[70px] md:min-h-[85px] mt-2 block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={taglineIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {TAGLINES[taglineIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
              We are a modern hybrid company engineering high-performance SaaS tools for campaign creators and representing raw, independent musical artists at the intersection of logic and sound.
            </p>
          </div>

          {/* Split Call-to-Actions (SaaS vs Records Visual Pitch) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {/* SaaS Pitch Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-900 border border-brand-teal/20 p-8 shadow-2xl transition-all"
            >
              <div className="absolute top-0 right-0 p-8 text-brand-teal/10 group-hover:text-brand-teal/20 transition-colors">
                <Server size={140} />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal border border-brand-teal/30 mb-2">
                  <Server size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Campaign SaaS</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Enterprise-grade campaign manager. Deliver SMS, WhatsApp, and email alerts with extreme precision, AI cultural-local translation, and ultra-detailed delivery diagnostics tailored for West Africa.
                </p>
              </div>

              <div className="relative z-10 pt-10">
                <Link 
                  id="home-cta-software"
                  to="/software" 
                  className="inline-flex items-center space-x-2 bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-6 py-3.5 rounded-xl transition-all w-full text-center justify-center shadow-lg hover:shadow-brand-teal/20"
                >
                  <span>Explore StoryShout SaaS</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            {/* Records Pitch Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-900 border border-brand-gold/20 p-8 shadow-2xl transition-all"
            >
              <div className="absolute top-0 right-0 p-8 text-brand-gold/10 group-hover:text-brand-gold/20 transition-colors">
                <Music size={140} />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/30 mb-2">
                  <Music size={24} />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">StoryShout Records</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Independent West African record label representing raw creative sound. We partner directly with artists to handle production, global publishing, alternative audio mixes, and transparent ledger analytics.
                </p>
              </div>

              <div className="relative z-10 pt-10">
                <Link 
                  id="home-cta-music"
                  to="/music" 
                  className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-amber-400 text-slate-900 font-bold px-6 py-3.5 rounded-xl transition-all w-full text-center justify-center shadow-lg hover:shadow-brand-gold/20"
                >
                  <span>Discover Music Records</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Segment */}
      <section className="py-20 bg-slate-50 dark:bg-[#0E1015] border-t border-b border-slate-100 dark:border-[#45A29E]/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-1.5 bg-brand-teal/5 text-brand-teal px-3 py-1 rounded-full text-xs font-mono font-bold border border-brand-teal/10">
                <span>WHO WE ARE</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                Synthesizing Creative Expression and Engineering Precision
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Based in Lekki, Lagos, StoryShout Limited was founded by multi-hyphenate David Ogbodu. We operate as a modular hybrid: we craft reliable, low-overhead software products for scaling enterprises while investing dynamically in independent sound creation and artist development.
              </p>
              <div className="pt-2">
                <Link to="/about" className="text-brand-teal hover:text-brand-teal-light font-bold flex items-center space-x-2">
                  <span>Learn more about our vision</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3 shadow-sm">
                <div className="text-brand-teal"><Server size={28} /></div>
                <h4 className="font-display font-bold text-slate-900 dark:text-white">Engineering First</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We bundle clean code, fast databases, and localized dialect tone modules to remove conversion noise.
                </p>
              </div>
              
              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3 shadow-sm">
                <div className="text-brand-gold"><Music size={28} /></div>
                <h4 className="font-display font-bold text-slate-900 dark:text-white">Audio Integrity</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We believe music should be unconstrained, dynamic, and distributed with full asset transparency.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3 shadow-sm">
                <div className="text-brand-teal"><Users size={28} /></div>
                <h4 className="font-display font-bold text-slate-900 dark:text-white">Direct Partnerships</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  No bloated networks or toxic retainers. We operate clear equity models with software and music clients.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3 shadow-sm">
                <div className="text-brand-gold"><Award size={28} /></div>
                <h4 className="font-display font-bold text-slate-900 dark:text-white">Cultural Delivery</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Our products are rooted in Lagos, tuned specifically to match West African infrastructure bottlenecks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Testimonial Matrix */}
      <section className="py-20 bg-white dark:bg-brand-navy transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">
              Vouched by Leaders and Creators
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              We focus on building actual value. Read feedback from our clients and roster artists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col justify-between"
              >
                <p className="text-slate-600 dark:text-slate-200 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                    {t.author}
                  </h4>
                  <p className="text-brand-teal text-xs font-mono uppercase mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
