import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';

const GRADIENT = 'linear-gradient(135deg, #FF5F2E 0%, #FF8A00 100%)';

interface PostContent {
  title: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  description: string;
  content: React.ReactNode;
}

const POSTS: Record<string, PostContent> = {
  'why-influencer-marketing-is-broken': {
    title: 'Why Influencer Marketing Is Broken — And What Should Replace It',
    date: 'June 10, 2026',
    category: 'Marketing Strategy',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&auto=format&fit=crop&q=80',
    description: "Paying celebrities for shoutouts is expensive, inconsistent, and often fake. There's a better way to get real people talking about your brand.",
    content: (
      <div className="prose prose-slate max-w-none">
        <p>Influencer marketing was supposed to be the future. Brands would partner with trusted voices. Audiences would discover products through authentic recommendations. Everyone would win.</p>
        <p>That's not what happened.</p>
        <h2>The Influencer Marketing Trap</h2>
        <p>Today, influencer marketing is a $21 billion industry built on shaky ground. Here's what's broken:</p>
        <ul>
          <li><strong>Fake followers.</strong> Studies suggest up to 50% of influencer engagement is fraudulent. Brands pay for reach that doesn't exist.</li>
          <li><strong>Skyrocketing costs.</strong> A single post from a mid-tier influencer can cost $500–$5,000. For startups and small brands, that's a month's marketing budget — gone in one post.</li>
          <li><strong>No guaranteed results.</strong> You pay upfront. The influencer posts. Maybe you get sales. Maybe you don't. There's no performance guarantee.</li>
          <li><strong>Audience skepticism.</strong> Consumers are savvier than ever. When an influencer promotes a new product every week, their "recommendation" stops meaning anything.</li>
        </ul>
        <h2>The Alternative: Audience Promotion</h2>
        <p>What if instead of paying one person with a large (potentially fake) following, you could activate dozens or hundreds of real people — each with genuine, trusted social circles?</p>
        <p>That's audience promotion. And it works on a simple principle: <strong>people trust people they know.</strong></p>
        <p>When your friend shares a product they actually use, you pay attention. When a stranger on Instagram promotes their tenth product this week, you scroll past.</p>
        <h2>How It Works</h2>
        <p>Platforms like StoryShout flip the traditional model:</p>
        <p><em>Brand → creates campaign → real people share to their circles → friends see it → friends trust it → friends become customers → those customers become sharers</em></p>
        <p>It's a one-to-one-to-many model. Each share opens a new trusted network. The reach compounds — authentically.</p>
        <h2>Why It Works Better</h2>
        <ul>
          <li><strong>You only pay for verified engagement.</strong> No upfront fees for uncertain returns.</li>
          <li><strong>Real social proof.</strong> Shares come from genuine users, not paid promoters.</li>
          <li><strong>Scalable.</strong> 50 supporters with 500 followers each = 25,000 potential impressions. With trust baked in.</li>
          <li><strong>Cost-effective.</strong> A fraction of what you'd pay a single mid-tier influencer.</li>
        </ul>
        <h2>The Bottom Line</h2>
        <p>Influencer marketing isn't going away. But for brands that want authentic reach without betting their budget on a single post, audience promotion is the smarter play. Turn your customers into your marketing team. Let their trust do the selling.</p>
      </div>
    ),
  },
  'what-is-audience-promotion': {
    title: 'What Is Audience Promotion? The One-to-One-to-Many Model Explained',
    date: 'June 12, 2026',
    category: 'Platform Explainer',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&auto=format&fit=crop&q=80',
    description: "Forget cold reach. Audience promotion turns your existing supporters into your marketing team. Here's how the model works and why it's the future of brand growth.",
    content: (
      <div className="prose prose-slate max-w-none">
        <p>Most marketing follows the same pattern: you create an ad, you pay to show it to strangers, and you hope some of them care. Audience promotion flips that script entirely.</p>
        <h2>The One-to-One-to-Many Model</h2>
        <p><em>Brand → Real Person → Their Friends, Family &amp; Followers → Their Friends → Their Friends</em></p>
        <p>Each share opens a new circle of trust. Each circle contains people who actually know and trust the person sharing. It's not an ad — it's a recommendation. And recommendations convert at rates advertising can only dream of.</p>
        <h2>Why Trust Changes Everything</h2>
        <p>Research consistently shows that <strong>92% of consumers trust recommendations from friends and family</strong> over any other form of advertising. Not influencers. Not celebrities. Not banner ads. People they actually know.</p>
        <h2>The Three Players in Audience Promotion</h2>
        <p><strong>1. The Brand</strong> — Creates a campaign with content they want promoted. Sets a budget in coins. Then watches as real people carry their message into trusted networks.</p>
        <p><strong>2. The Shouter</strong> — An everyday user who picks campaigns they believe in and shares them to their social circles. They earn coins for verified engagement.</p>
        <p><strong>3. The Audience</strong> — Friends, family, and followers who see the shared content. They're not being advertised to — they're getting a recommendation from someone they trust.</p>
        <h2>Real Reach vs. Vanity Reach</h2>
        <p>A million impressions mean nothing if nobody cares. But 50 people sharing your product to 50 trusted circles? That's 2,500 people who might actually listen — because the message came from someone they know. That's not more reach. That's <strong>better reach.</strong></p>
      </div>
    ),
  },
  'startup-marketing-without-big-budget': {
    title: 'How Startups Can Compete With Big Brands — Without a Big Budget',
    date: 'June 14, 2026',
    category: 'For Startups',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1400&auto=format&fit=crop&q=80',
    description: "When you can't outspend the competition, outsmart them. How startups are using audience promotion to reach thousands through trusted word-of-mouth.",
    content: (
      <div className="prose prose-slate max-w-none">
        <p>Big brands have big budgets. As a startup founder, you can't compete in a spending war — and you shouldn't try. But here's the secret: <strong>big budgets don't buy trust.</strong></p>
        <h2>The Startup's Unfair Disadvantage</h2>
        <ul>
          <li><strong>Cost per click is rising.</strong> Facebook ads that cost $0.50 per click five years ago now cost $3–5 in competitive categories.</li>
          <li><strong>Organic reach is declining.</strong> The average organic Facebook post reaches about 5% of a page's followers.</li>
          <li><strong>Influencer costs are exploding.</strong> A single post from a mid-tier influencer can cost more than your entire monthly marketing budget.</li>
          <li><strong>Everyone is skeptical.</strong> Trust in traditional advertising is at historic lows.</li>
        </ul>
        <h2>The Startup's Secret Weapon: Real People</h2>
        <p>When someone tries your product and loves it, they tell people. When they tell people, those people try it. Audience promotion accelerates this process — giving structure and incentive to word-of-mouth, turning your early adopters into an organized, motivated marketing force.</p>
        <h2>A Real Scenario</h2>
        <p>Imagine you have 50 users who genuinely love your product. Each has an average of 500 social media followers. With audience promotion, those 50 users share your content — reaching <strong>25,000 people</strong> from trusted sources. Total cost? A fraction of what you'd pay for 25,000 ad impressions — with dramatically higher trust and conversion rates.</p>
        <h2>The Bottom Line</h2>
        <p>You can't outspend the big brands. But you can out-trust them. While they pour millions into ads people ignore, you can build a network of real people who genuinely want to share your story. That's not just cheaper marketing. That's better marketing.</p>
      </div>
    ),
  },
  'indie-musician-promotion-guide': {
    title: "The Indie Musician's Guide to Promotion Without a Label Budget",
    date: 'June 16, 2026',
    category: 'For Creators',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1400&auto=format&fit=crop&q=80',
    description: "You make great music. But getting heard without a major label is hard. Here's how independent artists are turning fans into promoters.",
    content: (
      <div className="prose prose-slate max-w-none">
        <p>You spent months writing, recording, and producing your music. You uploaded it to every streaming platform. You posted about it on Instagram. And then... silence.</p>
        <p>Getting heard as an independent artist is one of the hardest challenges in the creative world. There are <strong>over 100,000 new tracks uploaded to streaming platforms every single day.</strong></p>
        <h2>The Asset You're Not Using: Your Fans</h2>
        <p>If you have even 20 fans who genuinely love your music, you have a marketing team. You're just not using them. Every fan knows other people who would love your music — their friends, followers, family group chats. These are people who trust their taste.</p>
        <h2>Turning Listeners Into Promoters</h2>
        <p><strong>1. Create a campaign around a release.</strong> Upload your track or video, set a coin budget, and define your target.</p>
        <p><strong>2. Your fans become your street team.</strong> Real fans share your track to their Instagram Stories, WhatsApp statuses, Snapchat, and Telegram — reaching people who actually trust their taste.</p>
        <p><strong>3. They earn for sharing.</strong> When their shares get verified engagement, they earn coins. Your biggest fans get rewarded for doing what they'd do anyway.</p>
        <p><strong>4. New listeners become new fans.</strong> Some discover you through a friend's share, follow you, and become sharers in your next campaign.</p>
        <h2>The Bottom Line</h2>
        <p>You don't need a label. You don't need a viral moment. You need a system that turns every fan into a promoter — and rewards them for doing it. That's how you build a music career in 2026.</p>
      </div>
    ),
  },
  'real-engagement-vs-vanity-metrics': {
    title: 'Real Engagement vs. Vanity Metrics: Why Shares Matter More Than Likes',
    date: 'June 18, 2026',
    category: 'Marketing Strategy',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&q=80',
    description: "A thousand likes from strangers means nothing. One share to a trusted circle is worth more. Here's why shares are the metric that actually predicts growth.",
    content: (
      <div className="prose prose-slate max-w-none">
        <p>Look at any social media analytics dashboard and you'll see the same metrics: likes, comments, impressions, reach. They're easy to track, easy to report, and easy to feel good about. They're also mostly meaningless.</p>
        <h2>The Hierarchy of Engagement</h2>
        <p><strong>Tier 1: Passive Consumption</strong> — Impressions, views, reach. Someone scrolled past your content. Lowest-value engagement, but what most ad platforms sell.</p>
        <p><strong>Tier 2: Low-Effort Interaction</strong> — Likes, reactions. Someone acknowledged your content exists. It signals almost nothing about actual interest.</p>
        <p><strong>Tier 3: Moderate-Effort Interaction</strong> — Comments, saves. Suggests genuine interest but stays contained to one person.</p>
        <p><strong>Tier 4: High-Effort Endorsement</strong> — Shares, reposts, recommendations. Someone put their own reputation behind your content. This is the most valuable action a user can take — because it compounds.</p>
        <h2>Why Shares Compound</h2>
        <p>A like is a dead end. A share is the beginning of a chain. One person shares your content. Their followers see it. Some share further. Each share opens a new audience. <strong>It's the only engagement metric that generates more engagement.</strong></p>
        <h2>The Trust Multiplier</h2>
        <p>When you see a brand's ad on Instagram, you know it's an ad. Your defenses go up. When you see a friend share something, you don't see an ad — you see a recommendation. The exact same content, shared by a friend instead of a brand, has dramatically higher impact. That's the trust multiplier — and it's why a share is worth 10x, 50x, or 100x what a like is worth.</p>
        <h2>The Bottom Line</h2>
        <p>Stop counting likes. Start counting shares. A thousand likes from strangers is a vanity metric. Ten shares from people who genuinely believe in your product is a growth engine.</p>
      </div>
    ),
  },
  'word-of-mouth-marketing-statistics': {
    title: 'Word-of-Mouth Marketing in 2026: The Statistics Every Brand Should Know',
    date: 'June 20, 2026',
    category: 'Data & Insights',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&auto=format&fit=crop&q=80',
    description: 'People trust recommendations from friends 10x more than ads. We compiled the latest data on why word-of-mouth is the highest-converting marketing channel.',
    content: (
      <div className="prose prose-slate max-w-none">
        <p>Marketing budgets are shifting. Brands that used to spend 80% of their budget on paid advertising are rethinking everything. The reason is in the data: <strong>word-of-mouth marketing consistently outperforms every other channel</strong> — and the gap is widening.</p>
        <h2>Trust: The Foundation of Everything</h2>
        <p><strong>92% of consumers trust recommendations from friends and family over any other form of advertising.</strong> (Nielsen, 2025) Nine out of ten people trust what their friends say more than what your brand says. Despite the rise of social media, influencer culture, and AI-generated content, <strong>people trust people they know.</strong></p>
        <h2>Conversion: Word-of-Mouth Converts at Rates Advertising Can't Touch</h2>
        <p><strong>Word-of-mouth marketing generates 5x more sales than paid media.</strong> (WOMMA, 2025)</p>
        <p><strong>Customers acquired through word-of-mouth have a 37% higher retention rate</strong> than those acquired through paid channels. (Harvard Business Review, 2024)</p>
        <h2>Reach: The Network Effect Is Real</h2>
        <p><strong>Brand messages shared by consumers reach 5x further</strong> than the same message shared by the brand itself. (MSL Group, 2025) Your post might reach your followers. A customer's share reaches their followers — an entirely different network that trusts them, not you.</p>
        <h2>The Cost Advantage</h2>
        <p><strong>The average cost-per-acquisition through word-of-mouth is 67% lower</strong> than through paid social advertising. (ReferralCandy, 2025)</p>
        <p><strong>Customers acquired through referrals have a 16% higher lifetime value</strong> than those acquired through other channels. (Wharton, 2024)</p>
        <h2>The Bottom Line</h2>
        <p>The data has been saying the same thing for years: word-of-mouth is the most effective marketing channel on the planet. The brands that win in 2026 won't be the ones with the biggest ad budgets. They'll be the ones that figured out how to turn every customer into a marketing channel.</p>
      </div>
    ),
  },
};

const ALL_SLUGS = Object.keys(POSTS);

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? POSTS[slug] : undefined;

  const currentIdx    = ALL_SLUGS.indexOf(slug ?? '');
  const nextSlug      = ALL_SLUGS[currentIdx + 1];
  const nextPost      = nextSlug ? POSTS[nextSlug] : null;

  if (!post) {
    return (
      <div className="bg-[#FBF7F4] min-h-screen flex flex-col items-center justify-center text-center px-5 py-24 space-y-6">
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#FF5F2E] uppercase">Not Found</span>
        <h1 className="font-display font-bold text-3xl text-[#1A0F08]">Post not found</h1>
        <p className="text-slate-500 text-sm">This article may have moved or no longer exists.</p>
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-sm font-bold text-[#FF5F2E] hover:text-[#FF8A00] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | StoryShout Blog</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://storyshoutltd.com/blog/${slug}`} />
        <meta property="og:url" content={`https://storyshoutltd.com/blog/${slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      {/* ── DARK HEADER WITH HERO IMAGE ── */}
      <section className="bg-[#1A0F08] text-white pt-24 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,95,46,0.07) 0%, transparent 55%)' }} />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 pb-12">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-white text-sm font-medium transition-colors mb-10 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>All Articles</span>
          </Link>

          <div className="space-y-5">
            <span className="inline-block text-[9px] font-mono font-bold tracking-[0.18em] uppercase text-[#FF5F2E] bg-[#FF5F2E]/10 border border-[#FF5F2E]/20 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center space-x-5 text-[11px] font-mono text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Calendar size={11} />
                <span>{post.date}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Clock size={11} />
                <span>{post.readTime}</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="text-white font-bold">By</span>
                <span>StoryShout</span>
              </span>
            </div>
          </div>
        </div>

        {/* Hero image bleeds from dark header into article */}
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="relative rounded-t-2xl overflow-hidden aspect-[16/7] border-x border-t border-white/10"
            style={{ boxShadow: '0 -4px 32px rgba(0,0,0,0.4)' }}>
            <img
              src={post.image}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FBF7F4]/50" />
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className="bg-[#FBF7F4] py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-0"
        >
          <div
            className="
              prose prose-slate max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-[#1A0F08]
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-base prose-p:my-4
              prose-strong:text-[#1A0F08] prose-strong:font-bold
              prose-li:text-slate-600 prose-li:leading-relaxed
              prose-em:not-italic prose-em:text-slate-500 prose-em:font-mono prose-em:text-sm
            "
          >
            {post.content}
          </div>
        </motion.div>
      </section>

      {/* ── NEXT POST ── */}
      {nextPost && (
        <section className="bg-white border-t border-[#EDE8E3] py-16">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] block mb-6">
              Next Article
            </span>
            <Link to={`/blog/${nextSlug}`} className="group grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-[#EDE8E3]">
                <img
                  src={nextPost.image}
                  alt={nextPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
              </div>
              <div className="space-y-3">
                <span className="inline-block text-[9px] font-mono font-bold tracking-[0.18em] uppercase text-[#FF5F2E] bg-[#FFF4EE] border border-[#FF5F2E]/15 px-2.5 py-1 rounded-full">
                  {nextPost.category}
                </span>
                <h4 className="font-display font-bold text-xl text-[#1A0F08] group-hover:text-[#FF5F2E] transition-colors leading-snug">
                  {nextPost.title}
                </h4>
                <div className="flex items-center space-x-2 text-sm font-bold text-[#FF5F2E] pt-1">
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[#1A0F08] py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,95,46,0.06) 0%, transparent 65%)' }} />
        <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center space-y-7">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
            Ready to turn your audience<br />into your{' '}
            <span className="text-[#FF5F2E]">marketing engine?</span>
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            StoryShout is in active beta. Join the waitlist or request a live walkthrough.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact?subject=Join Waitlist"
              className="inline-flex items-center space-x-2 text-white font-bold px-7 py-3.5 rounded-xl hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(255,95,46,0.4)]"
              style={{ background: GRADIENT }}
            >
              <span>Join the Waitlist</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
