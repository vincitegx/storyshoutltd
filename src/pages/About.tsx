import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';

const GRADIENT = 'linear-gradient(135deg, #FF5F2E 0%, #FF8A00 100%)';

const VALUES = [
  {
    label: 'Transparency first',
    body: 'Every campaign fee is disclosed upfront. Every earning is visible in real time. Brands and supporters deserve to see exactly how money moves — no hidden charges, no opaque deductions.',
  },
  {
    label: 'People-first design',
    body: 'Everything we build serves two groups: brands who need real reach, and everyday people who share content they believe in. Campaign tools, earning rules, and payout systems are designed around how people actually use social media.',
  },
  {
    label: 'Real communities, not bots',
    body: 'StoryShout connects real brands with real people who share to real social circles. When someone shares your content, it reaches friends, family, and followers — people who actually trust them.',
  },
  {
    label: 'Affordable by design',
    body: "Start with free campaigns to test the waters. Scale as you grow. Our coin-based system means you only pay for verified engagement — not impressions that go nowhere.",
  },
  {
    label: 'Reliable when it counts',
    body: "When a campaign is live, it stays live. When earnings are due, they arrive. We built StoryShout to handle campaigns without silent failures — because your reputation depends on ours.",
  },
];

const AUDIENCE = [
  {
    tag: 'Startups',
    headline: 'You have a great product but a limited ad budget.',
    body: 'StoryShout lets your early users become your marketing team — sharing your story to their circles and earning rewards while they do it. Spend only on reach you can verify.',
  },
  {
    tag: 'Indie Musicians & Creators',
    headline: 'You make great content. Getting heard is the hard part.',
    body: 'StoryShout turns your fans into a street team. Every share carries an authentic recommendation into a new circle — reaching people who trust the person who shared it.',
  },
  {
    tag: 'Small Brands',
    headline: 'You want real people, not cold audiences.',
    body: 'StoryShout connects your brand with everyday users who share because they genuinely like what you offer — authentic word-of-mouth, at a scale you can afford.',
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <>
      <Helmet>
        <title>About StoryShout — Audience Promotion Platform Built in Lagos</title>
        <meta name="description" content="StoryShout turns everyday users into micro-influencers who share your content to trusted social circles. Founded by David Ogbodu in Lekki, Lagos. Built for startups, creators, and small brands." />
        <link rel="canonical" href="https://storyshoutltd.com/about" />
        <meta property="og:url" content="https://storyshoutltd.com/about" />
        <meta property="og:title" content="About StoryShout — Audience Promotion Platform Built in Lagos" />
        <meta property="og:description" content="Why reach one when you can reach everyone they know? Learn about the team behind StoryShout." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ── EDITORIAL HEADER ── */}
      <section className="bg-[#1A0F08] text-white pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,95,46,0.07) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#FF5F2E] uppercase block mb-6">
                About StoryShout
              </span>
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.04] tracking-tight">
                Your Story,<br />
                <span className="text-[#FF5F2E]">Retold by<br />Everyone.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-[#FF5F2E]/40 pl-5">
                StoryShout is an audience promotion platform. Brands create campaigns. Real people share that content to their social circles. Brands get authentic reach. Sharers earn rewards. One post becomes one-to-many.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ORIGIN STORY ── */}
      <section className="bg-[#FBF7F4] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <FadeIn>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#EDE8E3]" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
                  alt="StoryShout team collaborating in Lagos"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F08]/80 via-[#1A0F08]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 z-10">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-[#FF8A00] uppercase block mb-1">Headquarters</span>
                  <p className="font-display font-bold text-white text-lg">Lekki, Lagos, Nigeria</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
                    Why We Built This
                  </span>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1A0F08] leading-tight">
                    We asked a different question.
                  </h2>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Promoting content is broken for most people. Paying influencers is expensive and inconsistent. Organic reach keeps shrinking. Startups lack the budgets to compete for visibility. Creators burn money with little to show for it.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We asked: <strong className="text-[#1A0F08]">why reach one person when you can reach everyone they know?</strong> Instead of paying for cold reach, what if brands could fund campaigns where real people — actual users with real social circles — share content they genuinely like? The reach would be authentic. The social proof would be baked into every post. And the sharers would earn for their influence.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  That one-to-one-to-many model flips the traditional advertising script. You only pay for verified engagement. Every share comes from a real person. And it scales because each share opens a new circle of trust.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  StoryShout Limited was founded in Lekki, Lagos by software engineer David Ogbodu to build that platform — so startups, indie musicians, and small brands can compete with real audiences, not just with budgets.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="bg-white border-t border-[#EDE8E3] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-lg mb-14">
            <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              The Founder
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
              Built by someone<br />who felt the gap.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="relative rounded-2xl overflow-hidden aspect-square border border-[#EDE8E3] max-w-sm" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
                <img
                  src="/assets/david.png"
                  alt="David Ogbodu — Founder of StoryShout Limited"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute top-4 right-4 text-[9px] font-mono font-bold text-white uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                  style={{ background: GRADIENT }}
                >
                  Founder & CEO
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5 lg:pt-2">
              <h3 className="font-display font-bold text-2xl text-[#1A0F08]">David Ogbodu</h3>
              <p className="text-[10px] font-mono text-[#FF5F2E] uppercase tracking-[0.18em]">
                Founder &amp; CEO — StoryShout Limited · Lagos, Nigeria
              </p>
              <blockquote className="border-l-2 border-[#FF5F2E] pl-6 my-6">
                <p className="text-slate-700 text-base leading-relaxed italic">
                  "The internet gave everyone a voice, but only a few can afford to be heard. I built StoryShout to change that. When your audience becomes your marketing engine, the playing field levels. A startup with 50 loyal supporters can compete with a brand that has a $50,000 ad budget — because those 50 people know 50 more, and those know 50 more. That's real reach."
                </p>
              </blockquote>
              <p className="text-slate-500 text-sm leading-relaxed">
                David is a software engineer and product builder based in Lekki, Lagos. StoryShout is his first product — built entirely from scratch, from infrastructure to interface, to solve a problem he watched creators and startups struggle with firsthand.
              </p>
              <div className="pt-2">
                <span className="text-[10px] font-mono text-slate-400 bg-[#FBF7F4] border border-[#EDE8E3] px-3 py-1.5 rounded-lg inline-block">
                  david.ogbodu@storyshoutltd.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="bg-[#FBF7F4] border-t border-[#EDE8E3] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-lg mb-14">
            <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              Who It's For
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
              Built for people<br />who need real reach.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AUDIENCE.map((a, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white border border-[#EDE8E3] rounded-2xl p-8 h-full" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                  <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.18em] block mb-5">{a.tag}</span>
                  <h4 className="font-display font-bold text-lg text-[#1A0F08] mb-3 leading-snug">{a.headline}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{a.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-white border-t border-[#EDE8E3] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-4">
                Our Values
              </span>
              <h2 className="font-display font-extrabold text-4xl text-[#1A0F08] leading-tight">
                What we<br />stand for.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mt-5 max-w-xs">
                These aren't aspirational statements. They're constraints we build against.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-0">
              {VALUES.map((v, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className={`py-8 ${i < VALUES.length - 1 ? 'border-b border-[#F0EBE5]' : ''}`}>
                    <h4 className="font-display font-bold text-lg text-[#1A0F08] mb-2">{v.label}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{v.body}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── THE MARKET ── */}
      <section className="bg-[#FBF7F4] border-t border-[#EDE8E3] py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1A0F08]">A Growing Market</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Over <strong className="text-[#1A0F08]">50 million</strong> startups, indie brands, and creators worldwide need affordable, authentic promotion. The influencer and user-generated content market is valued at over{' '}
              <strong className="text-[#1A0F08]">$20 billion</strong> — yet most of it is inaccessible to small players. StoryShout exists to change that.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1A0F08] py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,95,46,0.06) 0%, transparent 65%)' }} />
        <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center space-y-7">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-tight">
            Ready to join<br />
            <span className="text-[#FF5F2E]">the platform?</span>
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            We're onboarding startups, creators, and brands. Request a walkthrough or join the waitlist today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact?subject=Demo Request"
              className="inline-flex items-center space-x-2 text-white font-bold px-7 py-3.5 rounded-xl hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(255,95,46,0.4)]"
              style={{ background: GRADIENT }}
            >
              <span>Request Early Access</span>
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
