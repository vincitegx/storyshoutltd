import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar } from 'lucide-react';

const POSTS = [
    {
        slug: 'why-influencer-marketing-is-broken',
        title: 'Why Influencer Marketing Is Broken — And What Should Replace It',
        excerpt: 'Paying celebrities for shoutouts is expensive, inconsistent, and often fake. There\'s a better way to get real people talking about your brand.',
        date: 'June 10, 2026',
        category: 'Marketing Strategy',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    },
    {
        slug: 'what-is-audience-promotion',
        title: 'What Is Audience Promotion? The One-to-One-to-Many Model Explained',
        excerpt: 'Forget cold reach. Audience promotion turns your existing supporters into your marketing team. Here\'s how the model works and why it\'s the future of brand growth.',
        date: 'June 12, 2026',
        category: 'Platform Explainer',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    },
    {
        slug: 'startup-marketing-without-big-budget',
        title: 'How Startups Can Compete With Big Brands — Without a Big Budget',
        excerpt: 'When you can\'t outspend the competition, outsmart them. How startups are using audience promotion to reach thousands through trusted word-of-mouth.',
        date: 'June 14, 2026',
        category: 'For Startups',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format&fit=crop&q=80',
    },
    {
        slug: 'indie-musician-promotion-guide',
        title: 'The Indie Musician\'s Guide to Promotion Without a Label Budget',
        excerpt: 'You make great music. But getting heard without a major label is hard. Here\'s how independent artists are turning fans into promoters.',
        date: 'June 16, 2026',
        category: 'For Creators',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    },
    {
        slug: 'real-engagement-vs-vanity-metrics',
        title: 'Real Engagement vs. Vanity Metrics: Why Shares Matter More Than Likes',
        excerpt: 'A thousand likes from strangers means nothing. One share to a trusted circle is worth more. Here\'s why shares are the metric that actually predicts growth.',
        date: 'June 18, 2026',
        category: 'Marketing Strategy',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    },
    {
        slug: 'word-of-mouth-marketing-statistics',
        title: 'Word-of-Mouth Marketing in 2026: The Statistics Every Brand Should Know',
        excerpt: 'People trust recommendations from friends 10x more than ads. We compiled the latest data on why word-of-mouth is the highest-converting marketing channel.',
        date: 'June 20, 2026',
        category: 'Data & Insights',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    },
];

export default function Blog() {
    return (
        <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Blog — Audience Promotion Insights & Strategies | StoryShout</title>
                <meta name="description" content="Insights on audience promotion, word-of-mouth marketing, startup growth strategies, and creator promotion. Learn how to turn your audience into your marketing engine." />
                <link rel="canonical" href="https://storyshoutltd.com/blog" />
            </Helmet>

            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
        <span className="text-xs bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-widest">
          Blog
        </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                    Insights on Audience Promotion
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Strategies, data, and stories about turning audiences into marketing engines.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {POSTS.map((post, i) => (
                    <Link
                        key={i}
                        to={`/blog/${post.slug}`}
                        className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="aspect-video overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="flex items-center space-x-3 text-xs text-slate-500">
                                <span className="bg-brand-teal/10 text-brand-teal px-2 py-0.5 rounded-full font-mono">{post.category}</span>
                                <span className="flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </span>
                            </div>
                            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-teal transition-colors leading-snug">
                                {post.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center space-x-1 text-brand-teal font-bold text-sm pt-2">
                                <span>Read More</span>
                                <ArrowRight size={14} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Newsletter CTA */}
            <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-slate-950 via-brand-navy to-slate-950 border border-brand-teal/20 rounded-3xl text-center">
                <h3 className="font-display font-extrabold text-2xl text-white mb-4">Get audience promotion insights in your inbox</h3>
                <p className="text-slate-300 text-sm mb-6">We share strategies, case studies, and product updates. No spam — just useful stuff.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-brand-teal flex-1"
                    />
                    <button className="bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-6 py-3 rounded-xl transition-all">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
}