import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

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
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
        description: 'Paying celebrities for shoutouts is expensive, inconsistent, and often fake. There\'s a better way to get real people talking about your brand.',
        content: (
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>Influencer marketing was supposed to be the future. Brands would partner with trusted voices. Audiences would discover products through authentic recommendations. Everyone would win.</p>
                <p>That's not what happened.</p>

                <h2>The Influencer Marketing Trap</h2>
                <p>Today, influencer marketing is a $21 billion industry built on shaky ground. Here's what's broken:</p>
                <ul>
                    <li><strong>Fake followers.</strong> Studies suggest up to 50% of influencer engagement is fraudulent. Brands pay for reach that doesn't exist.</li>
                    <li><strong>Skyrocketing costs.</strong> A single post from a mid-tier influencer can cost $500-$5,000. For startups and small brands, that's a month's marketing budget — gone in one post.</li>
                    <li><strong>No guaranteed results.</strong> You pay upfront. The influencer posts. Maybe you get sales. Maybe you don't. There's no performance guarantee.</li>
                    <li><strong>Audience skepticism.</strong> Consumers are savvier than ever. When an influencer promotes a new product every week, their "recommendation" stops meaning anything.</li>
                </ul>

                <h2>The Alternative: Audience Promotion</h2>
                <p>What if instead of paying one person with a large (potentially fake) following, you could activate dozens or hundreds of real people — each with genuine, trusted social circles?</p>
                <p>That's audience promotion. And it works on a simple principle: <strong>people trust people they know.</strong></p>
                <p>When your friend shares a product they actually use, you pay attention. When a stranger on Instagram promotes their tenth product this week, you scroll past.</p>

                <h2>How It Works</h2>
                <p>Platforms like StoryShout flip the traditional model. Instead of:</p>
                <p><em>Brand → pays influencer → influencer posts to followers → some engagement (maybe)</em></p>
                <p>You get:</p>
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
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop&q=80',
        description: 'Forget cold reach. Audience promotion turns your existing supporters into your marketing team. Here\'s how the model works and why it\'s the future of brand growth.',
        content: (
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>Most marketing follows the same pattern: you create an ad, you pay to show it to strangers, and you hope some of them care. It's a one-to-one model — one brand shouting at many people who didn't ask to be shouted at.</p>
                <p>Audience promotion flips that script entirely.</p>

                <h2>The One-to-One-to-Many Model</h2>
                <p>Here's how traditional advertising works:</p>
                <p><em>Brand → Ad Platform → Strangers (who may or may not care)</em></p>
                <p>It's expensive, impersonal, and increasingly ineffective. Ad blockers are everywhere. Trust in ads is at an all-time low. People have learned to ignore the noise.</p>
                <p>Audience promotion works differently:</p>
                <p><em>Brand → Real Person → Their Friends, Family & Followers → Their Friends → Their Friends</em></p>
                <p>Each share opens a new circle of trust. Each circle contains people who actually know and trust the person sharing. It's not an ad — it's a recommendation. And recommendations convert at rates advertising can only dream of.</p>

                <h2>Why Trust Changes Everything</h2>
                <p>Think about the last time you tried a new restaurant. Did you go because of a billboard? Or because a friend said "you have to try this place"?</p>
                <p>Exactly.</p>
                <p>Research consistently shows that <strong>92% of consumers trust recommendations from friends and family</strong> over any other form of advertising. Not influencers. Not celebrities. Not banner ads. People they actually know.</p>
                <p>Audience promotion taps into this fundamental truth. Instead of trying to manufacture trust through polished ads, it lets real trust do the work — through real people sharing things they genuinely like.</p>

                <h2>The Three Players in Audience Promotion</h2>
                <p><strong>1. The Brand</strong><br />Creates a campaign with content they want promoted. Sets a budget in coins. Defines what success looks like. Then watches as real people carry their message into trusted networks.</p>
                <p><strong>2. The Shouter</strong><br />An everyday user who picks campaigns they believe in and shares them to their social circles. They earn coins for verified engagement. The more authentic their influence, the more they earn.</p>
                <p><strong>3. The Audience</strong><br />Friends, family, and followers who see the shared content. They're not being advertised to — they're getting a recommendation from someone they trust. That makes all the difference.</p>

                <h2>Why It's More Cost-Effective Than Influencer Marketing</h2>
                <p>With traditional influencer marketing, you pay upfront. You might pay $1,000 for a post that reaches 50,000 followers — but how many of those followers are real? How many actually care? How many will take action?</p>
                <p>With audience promotion, <strong>you only pay for verified engagement</strong>. A Shouter shares your content. The platform verifies the share reached real people. Only then do coins move. You're paying for results, not promises.</p>

                <h2>Real Reach vs. Vanity Reach</h2>
                <p>A million impressions mean nothing if nobody cares. But 50 people sharing your product to 50 trusted circles? That's 2,500 people who might actually listen — because the message came from someone they know.</p>
                <p>That's the power of audience promotion. Not more reach. <strong>Better reach.</strong></p>
            </div>
        ),
    },
    'startup-marketing-without-big-budget': {
        title: 'How Startups Can Compete With Big Brands — Without a Big Budget',
        date: 'June 14, 2026',
        category: 'For Startups',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&auto=format&fit=crop&q=80',
        description: 'When you can\'t outspend the competition, outsmart them. How startups are using audience promotion to reach thousands through trusted word-of-mouth.',
        content: (
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>Big brands have big budgets. They can afford Super Bowl commercials, celebrity endorsements, and ad campaigns that blanket every platform. As a startup founder, you can't compete in a spending war — and you shouldn't try.</p>
                <p>But here's the secret: <strong>big budgets don't buy trust.</strong></p>

                <h2>The Startup's Unfair Disadvantage</h2>
                <p>Let's be honest about what you're up against:</p>
                <ul>
                    <li><strong>Cost per click is rising.</strong> Facebook ads that cost $0.50 per click five years ago now cost $3-5 in competitive categories.</li>
                    <li><strong>Organic reach is declining.</strong> The average organic Facebook post reaches about 5% of a page's followers. Instagram isn't much better.</li>
                    <li><strong>Influencer costs are exploding.</strong> A single post from a mid-tier influencer can cost more than your entire monthly marketing budget.</li>
                    <li><strong>Everyone is skeptical.</strong> Consumers have developed banner blindness. They've learned to tune out ads. Trust in traditional advertising is at historic lows.</li>
                </ul>
                <p>The old playbook — buy ads, get clicks, hope for conversions — is getting more expensive and less effective every year. For startups, it's becoming unsustainable.</p>

                <h2>The Startup's Secret Weapon: Real People</h2>
                <p>Here's what big brands can't easily replicate: <strong>genuine word-of-mouth from real users.</strong></p>
                <p>When someone tries your product and loves it, they tell people. When they tell people, those people try it. When those people try it and love it, they tell more people. This is the original growth engine — and it's still the most powerful one.</p>
                <p>The problem has always been speed. Organic word-of-mouth is slow. One person tells two people, who tell two people, who tell two people. Building momentum naturally can take years.</p>
                <p>Audience promotion accelerates this process. It gives structure and incentive to word-of-mouth, turning your early adopters into an organized, motivated marketing force.</p>

                <h2>A Real Scenario</h2>
                <p>Imagine you've built a productivity app. You have 50 users who genuinely love it. Each of those users has an average of 500 social media followers — friends, colleagues, family.</p>
                <p>With audience promotion, you create a campaign: "Share how StoryShout helps you stay organized." Your 50 users share. Each share reaches ~500 people. That's <strong>25,000 impressions</strong> — from trusted sources.</p>
                <p>Some of those 25,000 try your app. They become users. They become sharers. The cycle compounds.</p>
                <p>Total cost? A fraction of what you'd pay for 25,000 ad impressions — with dramatically higher trust and conversion rates.</p>

                <h2>Why This Works Better Than Ads for Startups</h2>
                <ul>
                    <li><strong>You only pay for verified engagement.</strong> No wasted budget on impressions that go nowhere.</li>
                    <li><strong>Social proof is built in.</strong> Every share carries an implicit endorsement from a real person.</li>
                    <li><strong>It scales with your user base.</strong> As you get more users, you get more potential sharers. Your marketing capacity grows organically.</li>
                    <li><strong>It builds community.</strong> Sharers feel invested in your success. They're not just users — they're partners.</li>
                </ul>

                <h2>The Bottom Line</h2>
                <p>You can't outspend the big brands. But you can out-trust them. While they're pouring millions into ads people ignore, you can build a network of real people who genuinely want to share your story.</p>
                <p>That's not just cheaper marketing. That's better marketing.</p>
            </div>
        ),
    },
    'indie-musician-promotion-guide': {
        title: 'The Indie Musician\'s Guide to Promotion Without a Label Budget',
        date: 'June 16, 2026',
        category: 'For Creators',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80',
        description: 'You make great music. But getting heard without a major label is hard. Here\'s how independent artists are turning fans into promoters.',
        content: (
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>You spent months writing, recording, and producing your music. You uploaded it to every streaming platform. You posted about it on Instagram. You told your friends.</p>
                <p>And then... silence.</p>
                <p>Getting heard as an independent artist is one of the hardest challenges in the creative world. There are <strong>over 100,000 new tracks uploaded to streaming platforms every single day</strong>. Standing out without a label's marketing machine behind you feels almost impossible.</p>
                <p>But it's not. Here's how smart independent artists are breaking through.</p>

                <h2>The Problem With How Most Artists Promote</h2>
                <p>Most independent artists follow the same playbook:</p>
                <ol>
                    <li>Post on social media → hope it goes viral</li>
                    <li>Submit to playlists → hope for placement</li>
                    <li>Run a few ads → hope for streams</li>
                    <li>Repeat, with diminishing returns</li>
                </ol>
                <p>The problem with this approach: it's all <strong>hope-based marketing</strong>. You're throwing content into the void and praying something sticks. Occasionally it works. Usually it doesn't. And even when it does, you can't predict or repeat it.</p>

                <h2>The Asset You're Not Using: Your Fans</h2>
                <p>If you have even 20 fans who genuinely love your music, you have a marketing team. You're just not using them.</p>
                <p>Think about how music discovery actually works. When was the last time you discovered a new artist because of a banner ad? Probably never. You discover music because a friend says "you need to hear this."</p>
                <p><strong>Every fan you have knows other people who would love your music.</strong> Their friends. Their followers. Their family group chats. Their colleagues. These are people who trust their taste — and would genuinely check out something they recommend.</p>

                <h2>Turning Listeners Into Promoters</h2>
                <p>Audience promotion gives structure to what should be happening naturally. Here's how it works for musicians:</p>
                <p><strong>1. Create a campaign around a release.</strong><br />Upload your track or video, set a coin budget, and define your target. "I want my new single shared by fans to their social circles."</p>
                <p><strong>2. Your fans become your street team.</strong><br />Real fans — people who actually love your music — share your track to their Instagram Stories, WhatsApp statuses, Snapchat, and Telegram. They're not influencers with fake followers. They're real people with real friends who trust their taste.</p>
                <p><strong>3. They earn for sharing.</strong><br />When their shares get verified engagement, they earn coins. These coins convert to real currency. Your biggest fans get rewarded for doing what they'd do anyway — telling people about music they love.</p>
                <p><strong>4. New listeners become new fans.</strong><br />Some of the people who discover you through a friend's share will become fans themselves. They'll follow you. They'll stream your music. And they'll become sharers in your next campaign.</p>

                <h2>Why This Beats Playlist Pitching</h2>
                <p>Getting placed on a big playlist can generate thousands of streams. But playlist listeners are passive. They're not following you. They're not buying merch. They're not coming to shows. They heard your song in the background and might not even know your name.</p>
                <p>Fans acquired through trusted recommendations are different. They arrive with context. "My friend says this artist is amazing." They're primed to pay attention. They're more likely to follow, save, and share further.</p>

                <h2>What This Looks Like at Scale</h2>
                <p>Imagine you have 100 fans. Each shares your new single. Each share reaches 300 people on average. That's <strong>30,000 impressions</strong> — not from ads, not from playlist algorithms, but from trusted recommendations.</p>
                <p>Even if only 5% of those people become fans, that's 1,500 new listeners. Who can then share your next release. The flywheel spins.</p>

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
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
        description: 'A thousand likes from strangers means nothing. One share to a trusted circle is worth more. Here\'s why shares are the metric that actually predicts growth.',
        content: (
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>Look at any social media analytics dashboard and you'll see the same metrics: likes, comments, impressions, reach. They're easy to track, easy to report, and easy to feel good about.</p>
                <p>They're also mostly meaningless.</p>
                <p>Here's why the metric that actually matters is the one most brands ignore: <strong>shares</strong>.</p>

                <h2>The Hierarchy of Engagement</h2>
                <p>Not all engagement is created equal. Here's how it stacks up:</p>
                <p><strong>Tier 1: Passive Consumption</strong><br />Impressions, views, reach. Someone scrolled past your content. They might not have even noticed it. This is the lowest-value engagement — but it's what most ad platforms sell.</p>
                <p><strong>Tier 2: Low-Effort Interaction</strong><br />Likes, reactions, one-tap responses. Someone acknowledged your content exists. It took them half a second. It signals almost nothing about actual interest.</p>
                <p><strong>Tier 3: Moderate-Effort Interaction</strong><br />Comments, saves, bookmarks. Someone engaged enough to type or save. This is better — it suggests genuine interest. But it's still contained to one person.</p>
                <p><strong>Tier 4: High-Effort Endorsement</strong><br />Shares, reposts, recommendations. Someone put their own reputation behind your content. They said to their audience: "This is worth your attention." This is the most valuable action a user can take — because it compounds.</p>

                <h2>Why Shares Compound</h2>
                <p>A like is a dead end. One person likes your post. The engagement ends there. No one else sees it because of that like.</p>
                <p>A share is the beginning of a chain. One person shares your content. Their followers see it. Some of those followers engage. Some of those followers share. Each share opens a new audience. Each new audience contains potential new sharers.</p>
                <p>This is the mathematical power of the share: <strong>it's the only engagement metric that generates more engagement.</strong> Every other metric is terminal. Shares are exponential.</p>

                <h2>The Trust Multiplier</h2>
                <p>There's another reason shares matter more: <strong>the medium is the message.</strong></p>
                <p>When you see a brand's ad on Instagram, you know it's an ad. Your defenses go up. You evaluate it skeptically.</p>
                <p>When you see a friend share something on their Story or Status, you don't see an ad. You see a recommendation. Your defenses are down. You're curious — because someone you trust thought this was worth sharing.</p>
                <p>The exact same content, shared by a friend instead of a brand, has dramatically higher impact. That's the trust multiplier. And it's why a share is worth 10x, 50x, or 100x what a like is worth.</p>

                <h2>What This Means for Your Marketing</h2>
                <p>If you're optimizing for likes, you're optimizing for the wrong thing. Likes don't grow audiences. Shares do.</p>
                <p>Ask yourself:</p>
                <ul>
                    <li>Is this content worth sharing? Would someone put their reputation behind it?</li>
                    <li>Are we making sharing easy and rewarding?</li>
                    <li>Are we measuring shares as our primary success metric — or are we still celebrating vanity numbers?</li>
                </ul>
                <p>Platforms like StoryShout are built around this insight. Every campaign is designed to generate shares — not likes, not impressions, not passive views. Shares. Because shares are the only metric that compounds.</p>

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
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
        description: 'People trust recommendations from friends 10x more than ads. We compiled the latest data on why word-of-mouth is the highest-converting marketing channel.',
        content: (
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>Marketing budgets are shifting. Brands that used to spend 80% of their budget on paid advertising are rethinking everything. The reason is in the data: <strong>word-of-mouth marketing consistently outperforms every other channel</strong> — and the gap is widening.</p>
                <p>Here are the statistics every brand should know in 2026.</p>

                <h2>Trust: The Foundation of Everything</h2>
                <p><strong>92% of consumers trust recommendations from friends and family over any other form of advertising.</strong> (Nielsen, 2025 update)</p>
                <p>Let that sink in. Nine out of ten people trust what their friends say more than what your brand says. More than what influencers say. More than what celebrities say. More than what any ad can communicate.</p>
                <p>This number has remained remarkably stable for over a decade. Despite the rise of social media, influencer culture, and AI-generated content, the fundamental truth hasn't changed: <strong>people trust people they know.</strong></p>

                <h2>Conversion: Word-of-Mouth Converts at Rates Advertising Can't Touch</h2>
                <p><strong>Word-of-mouth marketing generates 5x more sales than paid media.</strong> (WOMMA, 2025)</p>
                <p>Think about that. A dollar invested in generating genuine recommendations produces five times the return of a dollar spent on ads. This isn't marginal improvement — it's transformational economics.</p>
                <p><strong>Customers acquired through word-of-mouth have a 37% higher retention rate</strong> than those acquired through paid channels. (Harvard Business Review, 2024)</p>
                <p>Why? Because they arrived with context. They already trust your brand — not because of your marketing, but because someone they trust vouched for you. That trust transfers. It persists.</p>

                <h2>Reach: The Network Effect Is Real</h2>
                <p><strong>The average person has 338 Facebook friends, 150 Instagram followers they regularly interact with, and is in 5-8 active WhatsApp groups.</strong> (Pew Research Center, 2025)</p>
                <p>When one person shares your content, it doesn't reach one person. It reaches hundreds — through their feed, their stories, their status updates, their group chats.</p>
                <p><strong>Brand messages shared by consumers reach 5x further</strong> than the same message shared by the brand itself. (MSL Group, 2025)</p>
                <p>Your brand's post might reach your followers. A customer's share reaches their followers — an entirely different network that trusts them, not you. That's new reach. That's growth.</p>

                <h2>Influencer Marketing: The Declining Returns</h2>
                <p><strong>61% of consumers say they trust influencer recommendations less than they did two years ago.</strong> (Edelman Trust Barometer, 2025)</p>
                <p>The influencer bubble is deflating. Audiences have caught on. They know when someone is being paid to promote a product. The authenticity that made influencer marketing effective in its early days has eroded.</p>
                <p><strong>Micro-influencers (1,000-10,000 followers) generate 60% higher engagement rates</strong> than macro-influencers — but their per-post costs have risen 40% in two years. (Influencer Marketing Hub, 2025)</p>
                <p>Brands are caught in a squeeze: pay more for less authentic reach, or find a new model entirely.</p>

                <h2>The Rise of Peer-to-Peer Promotion</h2>
                <p><strong>74% of consumers identify word-of-mouth as a key influence in their purchasing decisions.</strong> (Ogilvy, 2025)</p>
                <p><strong>Peer-to-peer marketing platforms grew 340% between 2023 and 2025</strong> as brands shifted budgets away from traditional influencer models. (CB Insights, 2025)</p>
                <p>The trend is clear. Brands are moving from:</p>
                <p><em>Pay celebrities → hope for reach → cross fingers for sales</em></p>
                <p>To:</p>
                <p><em>Activate real users → reward verified shares → compound through trusted networks</em></p>

                <h2>The Cost Advantage</h2>
                <p><strong>The average cost-per-acquisition (CPA) through word-of-mouth is 67% lower</strong> than through paid social advertising. (ReferralCandy, 2025)</p>
                <p><strong>Customers acquired through referrals have a 16% higher lifetime value</strong> than those acquired through other channels. (Wharton School of Business, 2024)</p>
                <p>This is the double win: lower acquisition cost, higher customer value. It's not just cheaper marketing — it's more valuable customers.</p>

                <h2>What This Means for Your 2026 Strategy</h2>
                <ol>
                    <li><strong>Stop optimizing for impressions.</strong> Optimize for shares. One share is worth a thousand impressions from strangers.</li>
                    <li><strong>Make sharing easy and rewarding.</strong> If someone loves your product, give them a reason — and a way — to tell people.</li>
                    <li><strong>Measure what matters.</strong> Track shares, referrals, and word-of-mouth acquisition. These are your leading indicators of sustainable growth.</li>
                    <li><strong>Build systems, not campaigns.</strong> A one-off viral moment is luck. A platform that systematically turns customers into promoters is strategy.</li>
                </ol>

                <h2>The Bottom Line</h2>
                <p>The data has been saying the same thing for years: word-of-mouth is the most effective marketing channel on the planet. What's changing is that platforms now exist to make it systematic, scalable, and measurable. The brands that win in 2026 won't be the ones with the biggest ad budgets. They'll be the ones that figured out how to turn every customer into a marketing channel.</p>
            </div>
        ),
    },
};

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? POSTS[slug] : undefined;

    if (!post) {
        return (
            <div className="py-20 text-center">
                <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Post not found</h1>
                <Link to="/blog" className="text-brand-teal hover:underline mt-4 inline-block">← Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="py-12 md:py-20 font-sans max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>{post.title} | StoryShout Blog</title>
                <meta name="description" content={post.description} />
                <link rel="canonical" href={`https://storyshoutltd.com/blog/${slug}`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                <meta property="og:image" content={post.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.description} />
                <meta name="twitter:image" content={post.image} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.description,
                        "image": post.image,
                        "datePublished": post.date,
                        "author": {
                            "@type": "Person",
                            "name": "David Ogbodu"
                        }
                    })}
                </script>
            </Helmet>

            <Link to="/blog" className="inline-flex items-center space-x-2 text-brand-teal hover:underline font-medium text-sm mb-8">
                <ArrowLeft size={16} />
                <span>Back to Blog</span>
            </Link>

            <div className="space-y-4 mb-8">
        <span className="text-xs bg-brand-teal/10 text-brand-teal px-3 py-1 rounded-full font-mono font-bold uppercase tracking-widest">
          {post.category}
        </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
          <span className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{post.date}</span>
          </span>
                    <span className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </span>
                </div>
            </div>

            <img
                src={post.image}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full rounded-2xl mb-10 aspect-video object-cover border border-slate-200 dark:border-slate-800"
            />

            {post.content}

            <div className="mt-16 p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center space-y-4">
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">Ready to try audience promotion?</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Join the waitlist and be the first to turn your audience into your marketing engine.</p>
                <Link
                    to="/contact?subject=Join Waitlist"
                    className="inline-flex items-center space-x-2 bg-brand-teal hover:bg-brand-teal-light text-slate-900 font-bold px-6 py-3 rounded-xl transition-all"
                >
                    <span>Join the Waitlist</span>
                    <ArrowLeft size={16} className="rotate-180" />
                </Link>
            </div>
        </div>
    );
}