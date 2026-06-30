import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { Resend } from 'resend';
import { createServer as createViteServer } from 'vite';
import {
  initDb,
  dbAll,
  dbGet,
  dbRun,
  User,
  SoftwareFeature,
  PricingPlan,
  MusicRelease,
  Artist,
  ContactMessage,
  SubscribeEmail
} from './server/db.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'storyshout_super_secret_key_2026';
const PORT = 3000;

// ── OG / Social preview meta injection ───────────────────────────────────────
const BASE_URL = 'https://storyshoutltd.com';
const LABEL_URL = 'https://label.storyshoutltd.com';
const OG_IMAGE = `${BASE_URL}/og-image.svg`;

interface RouteMeta {
  title: string;
  description: string;
  url: string;
  image?: string;
}

const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'StoryShout — Turn Your Audience Into Your Marketing Engine',
    description: 'StoryShout turns everyday users into micro-influencers who share your content to trusted social circles. Real reach. Verified engagement. Affordable for every startup and creator.',
    url: `${BASE_URL}/`,
  },
  '/features': {
    title: 'Platform Features — Campaign Engine, Coin Wallet & Shouter Tiers | StoryShout',
    description: 'Explore the StoryShout platform: campaign builder, engagement verification, Shouter earning tiers, and transparent pricing. Built for brands and creators who want real reach.',
    url: `${BASE_URL}/features`,
  },
  '/about': {
    title: 'About StoryShout — Authentic Word-of-Mouth at Scale',
    description: 'StoryShout was built in Lagos to make authentic audience promotion accessible to every startup, creator, and small brand. Real people, real circles, real results.',
    url: `${BASE_URL}/about`,
  },
  '/contact': {
    title: 'Contact StoryShout — Join the Beta or Request Early Access',
    description: "Ready to launch your first campaign or become a Shouter? Reach out and we'll respond within 24 hours. Join the waitlist for early access.",
    url: `${BASE_URL}/contact`,
  },
  '/blog': {
    title: 'Blog — Word-of-Mouth, Growth & Creator Marketing | StoryShout',
    description: 'Practical guides and insights for startups, creators, and small brands on audience promotion, authentic engagement, and making every share count.',
    url: `${BASE_URL}/blog`,
  },
};

const BLOG_POST_META: Record<string, Pick<RouteMeta, 'title' | 'description'>> = {
  'why-influencer-marketing-is-broken': {
    title: 'Why Influencer Marketing Is Broken — And What Should Replace It | StoryShout',
    description: "Paying celebrities for shoutouts is expensive, inconsistent, and often fake. There's a better way to get real people talking about your brand.",
  },
  'what-is-audience-promotion': {
    title: 'What Is Audience Promotion? The One-to-One-to-Many Model Explained | StoryShout',
    description: 'Forget cold reach. Audience promotion turns your existing supporters into your marketing team. Here\'s how the model works and why it\'s the future of brand growth.',
  },
  'startup-marketing-without-big-budget': {
    title: 'How Startups Can Compete With Big Brands — Without a Big Budget | StoryShout',
    description: "When you can't outspend the competition, outsmart them. How startups use audience promotion to reach thousands through trusted word-of-mouth.",
  },
  'indie-musician-promotion-guide': {
    title: "The Indie Musician's Guide to Promotion Without a Label Budget | StoryShout",
    description: "You make great music. But getting heard without a major label is hard. Here's how independent artists are turning fans into promoters.",
  },
  'real-engagement-vs-vanity-metrics': {
    title: 'Real Engagement vs. Vanity Metrics: Why Shares Matter More Than Likes | StoryShout',
    description: 'A thousand likes from strangers means nothing. One share to a trusted circle is worth more. Why shares are the metric that actually predicts growth.',
  },
};

function resolveRouteMeta(pathname: string): RouteMeta {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];
  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const post = BLOG_POST_META[slug];
    if (post) {
      return { ...post, url: `${BASE_URL}/blog/${slug}` };
    }
    return {
      title: 'Blog — StoryShout Insights on Growth & Word-of-Mouth Marketing',
      description: 'Practical playbooks and ideas for startups, creators, and small brands on authentic growth and audience promotion.',
      url: `${BASE_URL}${pathname}`,
    };
  }
  return ROUTE_META['/'];
}

function injectOgMeta(html: string, meta: RouteMeta): string {
  const img = meta.image ?? OG_IMAGE;
  const safeTitle = escHtml(meta.title);
  const safeDesc = escHtml(meta.description);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/g, `$1${safeDesc}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/g, `$1${meta.url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/g, `$1${meta.url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/g, `$1${safeTitle}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/g, `$1${safeDesc}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/g, `$1${img}$2`)
    .replace(/(<meta name="twitter:url" content=")[^"]*(")/g, `$1${meta.url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/g, `$1${safeTitle}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/g, `$1${safeDesc}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/g, `$1${img}$2`);
}

// ── Mail engine ──────────────────────────────────────────────────────────────
const MAIL_RECIPIENT = 'infos@storyshoutltd.com';
const MAIL_FROM = 'StoryShout Limited <infos@storyshoutltd.com>';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.warn('[Mailer] WARNING: RESEND_API_KEY not set in .env — emails will fail.');
} else {
  console.log('[Mailer] Resend configured — sending via HTTPS API (no SMTP port required).');
}

async function sendMailAsync(opts: { to: string; subject: string; html: string; replyTo?: string }): Promise<void> {
  const { error } = await resend.emails.send({
    from: MAIL_FROM,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
  });
  if (error) {
    console.error(`[Mailer] Failed to send: ${error.message}`);
    throw new Error(error.message);
  }
  console.log('[Mailer] Email sent successfully via Resend.');
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildContactEmailHtml(d: { name: string; email: string; subject: string; message: string }): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F5F0EC;font-family:Inter,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0EC;padding:40px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;max-width:600px">
<tr><td style="background:#1A0F08;padding:28px 36px">
  <span style="color:#fff;font-size:17px;font-weight:800;letter-spacing:-0.4px">Story<span style="color:#FF5F2E">Shout</span> Limited</span>
</td></tr>
<tr><td style="background:#FF5F2E;padding:12px 36px">
  <p style="margin:0;color:#fff;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase">New Contact Form Submission</p>
</td></tr>
<tr><td style="padding:32px 36px">
  <table width="100%" cellpadding="0" cellspacing="0">
  <tr><td style="padding-bottom:18px;border-bottom:1px solid #EDE8E3">
    <p style="margin:0 0 3px;font-size:10px;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em">From</p>
    <p style="margin:0;font-size:15px;font-weight:600;color:#1A0F08">${escHtml(d.name)}</p>
    <a href="mailto:${escHtml(d.email)}" style="color:#FF5F2E;font-size:13px;text-decoration:none">${escHtml(d.email)}</a>
  </td></tr>
  <tr><td style="padding:18px 0;border-bottom:1px solid #EDE8E3">
    <p style="margin:0 0 3px;font-size:10px;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em">Subject</p>
    <p style="margin:0;font-size:15px;font-weight:600;color:#1A0F08">${escHtml(d.subject)}</p>
  </td></tr>
  <tr><td style="padding-top:18px">
    <p style="margin:0 0 10px;font-size:10px;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em">Message</p>
    <div style="background:#F9F6F3;border-radius:10px;padding:18px;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap">${escHtml(d.message)}</div>
  </td></tr>
  </table>
</td></tr>
<tr><td style="background:#F9F6F3;padding:16px 36px;border-top:1px solid #EDE8E3">
  <p style="margin:0;font-size:10px;color:#9CA3AF;text-align:center">StoryShout Limited &mdash; Lekki Phase I, Lagos, Nigeria &mdash; RC: 9591364</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function buildSubscribeEmailHtml(email: string): string {
  const time = new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F5F0EC;font-family:Inter,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0EC;padding:40px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;max-width:600px">
<tr><td style="background:#1A0F08;padding:28px 36px">
  <span style="color:#fff;font-size:17px;font-weight:800;letter-spacing:-0.4px">Story<span style="color:#FF5F2E">Shout</span> Limited</span>
</td></tr>
<tr><td style="background:#FF5F2E;padding:12px 36px">
  <p style="margin:0;color:#fff;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase">New Newsletter Subscriber</p>
</td></tr>
<tr><td style="padding:32px 36px">
  <p style="margin:0 0 6px;font-size:10px;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.1em">Email Address</p>
  <p style="margin:0 0 16px;font-size:17px;font-weight:700;color:#1A0F08">${escHtml(email)}</p>
  <p style="margin:0;font-size:13px;color:#6B7280">Subscribed at ${time} (WAT)</p>
</td></tr>
<tr><td style="background:#F9F6F3;padding:16px 36px;border-top:1px solid #EDE8E3">
  <p style="margin:0;font-size:10px;color:#9CA3AF;text-align:center">StoryShout Limited &mdash; Lekki Phase I, Lagos, Nigeria</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Serve uploads statically
  app.use('/uploads', express.static(uploadsDir));

  // Initialize SQLite Database
  await initDb();

  // Multer config for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
      cb(null, `${Date.now()}-${name}${ext}`);
    }
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: 15 * 1024 * 1024 // 15MB file size limit (useful for audios/images)
    }
  });

  // JWT auth middleware
  function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required.' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
      }
      req.user = user;
      next();
    });
  }

  // --- PUBLIC ENDPOINTS ---

  // Submit contact message
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
      const createdAt = new Date().toISOString();
      const result = await dbRun(
        `INSERT INTO contact_messages (name, email, subject, message, created_at, status)
         VALUES (?, ?, ?, ?, ?, 'Unread')`,
        [name, email, subject, message, createdAt]
      );
      // Fire-and-forget with retry; don't block the response
      sendMailAsync({
        to: MAIL_RECIPIENT,
        replyTo: email,
        subject: `[Contact] ${subject}`,
        html: buildContactEmailHtml({ name, email, subject, message }),
      }).catch(() => {
        // Mail failure is non-blocking; the message is already saved to DB
      });
      res.json({ success: true, messageId: result.lastID, message: 'Message sent successfully.' });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Failed to submit contact message.' });
    }
  });

  // Newsletter subscribe
  app.post('/api/subscribe', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }
      const existing = await dbGet<SubscribeEmail>('SELECT * FROM subscribe_emails WHERE email = ?', [email]);
      if (existing) {
        return res.json({ success: true, message: "You're already on the list!" });
      }
      const createdAt = new Date().toISOString();
      await dbRun('INSERT INTO subscribe_emails (email, created_at) VALUES (?, ?)', [email, createdAt]);
      // Fire-and-forget with retry; don't block the response
      sendMailAsync({
        to: MAIL_RECIPIENT,
        subject: `[Newsletter] New Subscriber: ${email}`,
        html: buildSubscribeEmailHtml(email),
      }).catch(() => {
        // Mail failure is non-blocking; the subscription is already saved to DB
      });
      res.json({ success: true, message: "You're subscribed! Insights coming your way." });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Failed to subscribe.' });
    }
  });

  // Get campaign features
  app.get('/api/software/features', async (req, res) => {
    try {
      const features = await dbAll<SoftwareFeature>('SELECT * FROM software_features ORDER BY order_num ASC');
      res.json(features);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Get pricing plans
  app.get('/api/software/pricing', async (req, res) => {
    try {
      const pricing = await dbAll<PricingPlan>('SELECT * FROM pricing_plans');
      res.json(pricing.map(p => ({
        ...p,
        features: JSON.parse(p.features)
      })));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Get music releases
  app.get('/api/music/releases', async (req, res) => {
    try {
      const releases = await dbAll<MusicRelease>('SELECT * FROM music_releases ORDER BY id DESC');
      res.json(releases);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Get artists
  app.get('/api/music/artists', async (req, res) => {
    try {
      const artists = await dbAll<Artist>('SELECT * FROM artists ORDER BY featured DESC, name ASC');
      res.json(artists);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --- AUTH ENDPOINTS ---

  // Admin login
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      const user = await dbGet<User>('SELECT * FROM users WHERE email = ?', [email]);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password!);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
          email: user.email,
          isDefaultPassword: user.is_default === 1,
          message: 'Login successful'
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Change password
  app.post('/api/auth/change-password', authenticateToken, async (req: any, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Current and new passwords are required.' });
      }

      const user = await dbGet<User>('SELECT * FROM users WHERE id = ?', [req.user.id]);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password!);
      if (!isMatch) {
        return res.status(400).json({ error: 'Incorrect current password.' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await dbRun(
        'UPDATE users SET password = ?, is_default = 0 WHERE id = ?',
        [hashedNewPassword, req.user.id]
      );

      res.json({ success: true, message: 'Password updated successfully. Warning dismissed.' });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --- SECURED ADMIN CRUD ENDPOINTS ---

  // File upload route (images/audio)
  app.post('/api/upload', authenticateToken, upload.single('file'), (req: any, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const publicUrl = `/uploads/${req.file.filename}`;
    res.json({ url: publicUrl });
  });

  // Admin Dashboard stats
  app.get('/api/admin/stats', authenticateToken, async (req, res) => {
    try {
      const featureResult = await dbGet<{ cnt: number }>('SELECT COUNT(*) as cnt FROM software_features');
      const pricingResult = await dbGet<{ cnt: number }>('SELECT COUNT(*) as cnt FROM pricing_plans');
      const releaseResult = await dbGet<{ cnt: number }>('SELECT COUNT(*) as cnt FROM music_releases');
      const artistResult = await dbGet<{ cnt: number }>('SELECT COUNT(*) as cnt FROM artists');
      const messageTotal = await dbGet<{ cnt: number }>('SELECT COUNT(*) as cnt FROM contact_messages');
      const messageUnread = await dbGet<{ cnt: number }>("SELECT COUNT(*) as cnt FROM contact_messages WHERE status = 'Unread'");

      res.json({
        features: featureResult?.cnt || 0,
        plans: pricingResult?.cnt || 0,
        releases: releaseResult?.cnt || 0,
        artists: artistResult?.cnt || 0,
        messages: {
          total: messageTotal?.cnt || 0,
          unread: messageUnread?.cnt || 0
        }
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Software Feature CRUD
  app.post('/api/admin/software/features', authenticateToken, async (req, res) => {
    try {
      const { title, description, benefits, icon, order_num } = req.body;
      const result = await dbRun(
        'INSERT INTO software_features (title, description, benefits, icon, order_num) VALUES (?, ?, ?, ?, ?)',
        [title, description, benefits, icon, order_num || 0]
      );
      res.json({ id: result.lastID, title, description, benefits, icon, order_num });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put('/api/admin/software/features/:id', authenticateToken, async (req, res) => {
    try {
      const { title, description, benefits, icon, order_num } = req.body;
      const { id } = req.params;
      await dbRun(
        'UPDATE software_features SET title = ?, description = ?, benefits = ?, icon = ?, order_num = ? WHERE id = ?',
        [title, description, benefits, icon, order_num, id]
      );
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete('/api/admin/software/features/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      await dbRun('DELETE FROM software_features WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Software Pricing CRUD
  app.post('/api/admin/software/pricing', authenticateToken, async (req, res) => {
    try {
      const { name, price, billing, features, popular } = req.body;
      const featuresJSON = JSON.stringify(features || []);
      const result = await dbRun(
        'INSERT INTO pricing_plans (name, price, billing, features, popular) VALUES (?, ?, ?, ?, ?)',
        [name, price, billing, featuresJSON, popular ? 1 : 0]
      );
      res.json({ id: result.lastID, name, price, billing, features, popular });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put('/api/admin/software/pricing/:id', authenticateToken, async (req, res) => {
    try {
      const { name, price, billing, features, popular } = req.body;
      const { id } = req.params;
      const featuresJSON = JSON.stringify(features || []);
      await dbRun(
        'UPDATE pricing_plans SET name = ?, price = ?, billing = ?, features = ?, popular = ? WHERE id = ?',
        [name, price, billing, featuresJSON, popular ? 1 : 0, id]
      );
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete('/api/admin/software/pricing/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      await dbRun('DELETE FROM pricing_plans WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Music Release CRUD
  app.post('/api/admin/music/releases', authenticateToken, async (req, res) => {
    try {
      const { title, artist, audio_url, cover_url, release_date, buy_url } = req.body;
      const result = await dbRun(
        'INSERT INTO music_releases (title, artist, audio_url, cover_url, release_date, buy_url) VALUES (?, ?, ?, ?, ?, ?)',
        [title, artist, audio_url, cover_url, release_date, buy_url]
      );
      res.json({ id: result.lastID, title, artist, audio_url, cover_url, release_date, buy_url });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put('/api/admin/music/releases/:id', authenticateToken, async (req, res) => {
    try {
      const { title, artist, audio_url, cover_url, release_date, buy_url } = req.body;
      const { id } = req.params;
      await dbRun(
        'UPDATE music_releases SET title = ?, artist = ?, audio_url = ?, cover_url = ?, release_date = ?, buy_url = ? WHERE id = ?',
        [title, artist, audio_url, cover_url, release_date, buy_url, id]
      );
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete('/api/admin/music/releases/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      await dbRun('DELETE FROM music_releases WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Artist CRUD
  app.post('/api/admin/music/artists', authenticateToken, async (req, res) => {
    try {
      const { name, bio, image_url, genre, featured } = req.body;
      const result = await dbRun(
        'INSERT INTO artists (name, bio, image_url, genre, featured) VALUES (?, ?, ?, ?, ?)',
        [name, bio, image_url, genre, featured ? 1 : 0]
      );
      res.json({ id: result.lastID, name, bio, image_url, genre, featured });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put('/api/admin/music/artists/:id', authenticateToken, async (req, res) => {
    try {
      const { name, bio, image_url, genre, featured } = req.body;
      const { id } = req.params;
      await dbRun(
        'UPDATE artists SET name = ?, bio = ?, image_url = ?, genre = ?, featured = ? WHERE id = ?',
        [name, bio, image_url, genre, featured ? 1 : 0, id]
      );
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete('/api/admin/music/artists/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      await dbRun('DELETE FROM artists WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Contact Message CRUD
  app.get('/api/admin/contact/messages', authenticateToken, async (req, res) => {
    try {
      const messages = await dbAll<ContactMessage>('SELECT * FROM contact_messages ORDER BY id DESC');
      res.json(messages);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put('/api/admin/contact/messages/:id/status', authenticateToken, async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
      await dbRun('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete('/api/admin/contact/messages/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      await dbRun('DELETE FROM contact_messages WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Newsletter subscribers list
  app.get('/api/admin/subscribers', authenticateToken, async (req, res) => {
    try {
      const subscribers = await dbAll<SubscribeEmail>('SELECT * FROM subscribe_emails ORDER BY id DESC');
      res.json(subscribers);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete('/api/admin/subscribers/:id', authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      await dbRun('DELETE FROM subscribe_emails WHERE id = ?', [id]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --- VITE DEV AND PROD MIDDLEWARE SETUP ---

  // Subdomain detection middleware
  app.use((req: any, res: any, next: any) => {
    const host = req.headers.host || '';
    req.subdomain = host.startsWith('label.') ? 'label' : 'main';
    next();
  });

  if (process.env.NODE_ENV !== 'production') {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: any, res) => {
      let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
      html = html.replace('</head>', `<script>window.__SUBDOMAIN__="${req.subdomain}";</script></head>`);

      if (req.subdomain === 'label') {
        const labelTitle = escHtml('StoryShout Records \u2014 Independent Music Label | Lagos');
        const labelDesc = escHtml('Independent alternative music label from Lekki, Lagos. Stream our latest releases and explore the artist roster.');
        html = html
          .replace(/<title>[^<]*<\/title>/, `<title>${labelTitle}</title>`)
          .replace(/(<meta name="description" content=")[^"]*(")/g, `$1${labelDesc}$2`)
          .replace(/(<link rel="canonical" href=")[^"]*(")/g, `$1${LABEL_URL}/$2`)
          .replace(/(<meta property="og:url" content=")[^"]*(")/g, `$1${LABEL_URL}/$2`)
          .replace(/(<meta property="og:title" content=")[^"]*(")/g, `$1${labelTitle}$2`)
          .replace(/(<meta property="og:description" content=")[^"]*(")/g, `$1${labelDesc}$2`)
          .replace(/(<meta property="og:image" content=")[^"]*(")/g, `$1${OG_IMAGE}$2`)
          .replace(/(<meta name="twitter:url" content=")[^"]*(")/g, `$1${LABEL_URL}/$2`)
          .replace(/(<meta name="twitter:title" content=")[^"]*(")/g, `$1${labelTitle}$2`)
          .replace(/(<meta name="twitter:description" content=")[^"]*(")/g, `$1${labelDesc}$2`)
          .replace(/(<meta name="twitter:image" content=")[^"]*(")/g, `$1${OG_IMAGE}$2`);
      } else {
        html = injectOgMeta(html, resolveRouteMeta(req.path));
      }

      res.send(html);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[StoryShout Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((e) => {
  console.error('[StoryShout Server] Initialization crash:', e);
});
