import express from 'express';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
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
  ContactMessage
} from './server/db.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'storyshout_super_secret_key_2026';
const PORT = 3000;

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
      res.json({ success: true, messageId: result.lastID, message: 'Message sent successfully.' });
    } catch (e: any) {
      res.status(500).json({ error: e.message || 'Failed to submit contact message.' });
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

  // --- VITE DEV AND PROD MIDDLEWARE SETUP ---

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
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[StoryShout Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((e) => {
  console.error('[StoryShout Server] Initialization crash:', e);
});
