import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, Users, Globe, TrendingUp, Zap, ArrowRight } from 'lucide-react';

const VALUES = [
  {
    icon: <Shield size={28} />,
    title: 'Trust Through Transparency',
    desc: 'Every campaign fee is disclosed upfront. Every earning is visible in real time. We believe brands and supporters deserve to know exactly how their money moves — no hidden charges, no opaque deductions.',
  },
  {
    icon: <Users size={28} />,
    title: 'People-First Design',
    desc: 'Everything we build serves two groups: brands who need real reach, and everyday people who share content they believe in. Campaign tools, earning rules, and payout systems are designed around how people actually use social media.',
  },
  {
    icon: <Globe size={28} />,
    title: 'Built for Real Communities',
    desc: 'Not bots. Not fake engagement. StoryShout connects real brands with real people who share to real social circles. When someone shares your content, it reaches friends, family, and followers — people who actually trust them.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Scalable & Affordable',
    desc: 'Start with free campaigns to test the waters. Scale as you grow. Our coin-based system means you only pay for verified engagement — not impressions that go nowhere. This is marketing that earns its keep.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Reliable When It Counts',
    desc: 'When a campaign is live, it stays live. When earnings are due, they arrive. We built StoryShout to handle campaigns without silent failures — because your reputation depends on ours.',
  },
];

export default function About() {
  return (
      <div className="py-12 md:py-24 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>About StoryShout — Audience Promotion Platform Built in Lagos, Nigeria</title>
          <meta name="description" content="StoryShout turns everyday users into micro-influencers who share your content to trusted social circles. Founded by David Ogbodu in Lekki, Lagos. Built for startups, creators, and small brands." />
          <link rel="canonical" href="https://storyshoutltd.com/about" />
          <meta property="og:url" content="https://storyshoutltd.com/about" />
          <meta property="og:title" content="About StoryShout — Audience Promotion Platform Built in Lagos" />
          <meta property="og:description" content="Why reach one when you can reach everyone they know? Learn about the team behind StoryShout." />
          <meta name="twitter:url" content="https://storyshoutltd.com/about" />
          <meta name="twitter:title" content="About StoryShout — Audience Promotion Platform Built in Lagos" />
          <meta name="twitter:description" content="Why reach one when you can reach everyone they know? Learn about the team behind StoryShout." />
        </Helmet>

        {/* ── Header ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-20">
          <div className="md:col-span-8 space-y-4">
          <span className="text-xs bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-widest">
            About StoryShout
          </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 dark:text-white leading-none tracking-tight">
              Your Story,<br />
              <span className="text-brand-teal">Retold by Everyone.</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:pt-14">
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light border-l-2 border-brand-teal pl-4">
              StoryShout is an audience promotion platform. Brands create campaigns. Real people share that content to their social circles. Brands get authentic reach. Sharers earn rewards. One post becomes one-to-many.
            </p>
          </div>
        </div>

        {/* ── Origin Story ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative rounded-3xl overflow-hidden aspect-4/3 border border-slate-200 dark:border-slate-800 shadow-xl">
            <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80"
                alt="StoryShout team collaborating in Lagos"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover dark:brightness-90 hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 p-8 text-white z-10 space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-brand-teal uppercase">Headquarters</span>
              <p className="font-display font-bold text-lg">Lekki, Lagos, Nigeria</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">Why We Built StoryShout</h2>
              <p className="text-xs font-mono text-brand-teal uppercase tracking-widest">The problem we set out to solve</p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Promoting content is broken for most people. Paying influencers is expensive and inconsistent. Organic reach keeps shrinking. Startups lack the budgets to compete for visibility. Creators burn money with little to show for it.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              We asked a different question: <strong>why reach one person when you can reach everyone they know?</strong> Instead of paying for cold reach, what if brands could fund campaigns where real people — actual users with real social circles — share content they genuinely like? The reach would be authentic. The social proof would be baked into every post. And the sharers would earn for their influence.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              That one-to-one-to-many model flips the traditional advertising script. It's cost-effective because you only pay for verified engagement. It's authentic because shares come from real people, not bots. And it's scalable because every share opens a new circle of trust.
            </p>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              StoryShout Limited was founded in Lekki, Lagos by software engineer David Ogbodu to build that platform — one where startups, indie musicians, and small brands can reach real audiences through trusted word-of-mouth, without needing celebrity influencer budgets.
            </p>
          </div>
        </div>

        {/* ── Founder ── */}
        <div className="p-8 md:p-14 bg-white dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-3xl mb-24 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-4 shrink-0 max-w-sm mx-auto md:mx-0">
              <div className="relative rounded-2xl overflow-hidden aspect-square border border-brand-teal/30 shadow-md">
                <img
                    src="/assets/david.png"
                    alt="David Ogbodu — Founder of StoryShout Limited"
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
              <p className="text-brand-teal text-xs font-mono uppercase tracking-widest">Founder & CEO — StoryShout Limited</p>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                &ldquo;The internet gave everyone a voice, but only a few can afford to be heard. I built StoryShout to change that. When your audience becomes your marketing engine, the playing field levels. A startup with 50 loyal supporters can compete with a brand that has a 50,000 dollar ad budget — because those 50 people know 50 more, and those know 50 more. That's real reach.&rdquo;
              </p>
              <div className="pt-2">
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                Lagos, Nigeria • david.ogbodu@storyshoutltd.com
              </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Who It's For ── */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">Who StoryShout Is For</h2>
            <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">Built for people who need real reach</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp size={24} />,
                title: 'Startups',
                desc: 'You have a great product but a limited ad budget. StoryShout lets your early users become your marketing team — sharing your story to their circles and earning rewards while they do it.',
              },
              {
                icon: <Zap size={24} />,
                title: 'Indie Musicians & Creators',
                desc: 'You make great music or content, but getting heard without a label or agency budget is hard. StoryShout turns your fans into promoters — every share reaches new ears through trusted recommendations.',
              },
              {
                icon: <Globe size={24} />,
                title: 'Small Brands',
                desc: 'You want to reach real people, not bots. StoryShout connects your brand with everyday users who share because they genuinely like what you offer — authentic word-of-mouth at scale.',
              },
            ].map((audience, i) => (
                <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4 shadow-sm">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal border border-brand-teal/20">
                    {audience.icon}
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white">{audience.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{audience.desc}</p>
                </div>
            ))}
          </div>
        </div>

        {/* ── Values ── */}
        <div className="space-y-12 mb-20">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">What We Stand For</h2>
            <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">The principles behind every campaign</p>
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

        {/* ── The Market ── */}
        <div className="p-8 md:p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl mb-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              A Growing Market
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Over <strong className="text-brand-teal">50 million</strong> startups, indie brands, and creators worldwide need affordable, authentic promotion. The influencer and user-generated content marketing market is valued at over <strong className="text-brand-teal">$20 billion</strong> and growing — yet most of it is inaccessible to small players. StoryShout exists to change that.
            </p>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="p-8 md:p-12 bg-gradient-to-r from-slate-950 via-brand-navy to-slate-950 border border-brand-teal/20 rounded-3xl text-center">
          <h3 className="font-display font-extrabold text-2xl text-white mb-4">Ready to turn your audience into your marketing engine?</h3>
          <p className="text-slate-300 text-sm mb-6">We're onboarding startups, creators, and brands. Join the waitlist or request a walkthrough.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
                to="/contact?subject=Demo Request"
                className="inline-flex items-center space-x-2 bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-7 py-3.5 rounded-xl transition-all"
            >
              <span>Request Early Access</span>
              <ArrowRight size={16} />
            </Link>
            <Link
                to="/features"
                className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-7 py-3.5 rounded-xl border border-slate-700 transition-all"
            >
              <span>Explore How It Works</span>
            </Link>
          </div>
        </div>

      </div>
  );
}