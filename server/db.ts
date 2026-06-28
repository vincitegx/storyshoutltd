import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';

const DB_FILE = path.join(process.cwd(), 'storyshout_db.json');

export interface User {
  id: number;
  email: string;
  password?: string;
  is_default: number;
}

export interface SoftwareFeature {
  id?: number;
  title: string;
  description: string;
  benefits: string;
  icon: string;
  order_num: number;
}

export interface PricingPlan {
  id?: number;
  name: string;
  price: string;
  billing: string;
  features: string; // JSON string array
  popular: number;
}

export interface MusicRelease {
  id?: number;
  title: string;
  artist: string;
  audio_url: string;
  cover_url: string;
  release_date: string;
  buy_url: string;
}

export interface Artist {
  id?: number;
  name: string;
  bio: string;
  image_url: string;
  genre: string;
  featured: number;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: string;
}

export interface SubscribeEmail {
  id?: number;
  email: string;
  created_at: string;
}

interface DBState {
  users: User[];
  software_features: SoftwareFeature[];
  pricing_plans: PricingPlan[];
  music_releases: MusicRelease[];
  artists: Artist[];
  contact_messages: ContactMessage[];
  subscribe_emails: SubscribeEmail[];
  lastIds: Record<string, number>;
}

let dbState: DBState = {
  users: [],
  software_features: [],
  pricing_plans: [],
  music_releases: [],
  artists: [],
  contact_messages: [],
  subscribe_emails: [],
  lastIds: {
    users: 0,
    software_features: 0,
    pricing_plans: 0,
    music_releases: 0,
    artists: 0,
    contact_messages: 0,
    subscribe_emails: 0,
  }
};

function saveDb() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(dbState, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing JSON DB to file:', err);
  }
}

async function seedDefaultData() {
  // Check admin user
  if (dbState.users.length === 0) {
    const hashedPassword = await bcrypt.hash('StoryShout2026!', 10);
    dbState.lastIds.users++;
    dbState.users.push({
      id: dbState.lastIds.users,
      email: 'admin@storyshoutltd.com',
      password: hashedPassword,
      is_default: 1
    });
  }

  // Check features — plain English, no technical implementation details
  if (dbState.software_features.length === 0) {
    const features: SoftwareFeature[] = [
      {
        title: 'Video Campaign Creation',
        description: 'Upload your video, pick a campaign tier, and launch. StoryShout automatically processes your video and publishes it across Facebook, Instagram, WhatsApp, Snapchat, and Telegram so your content reaches supporters wherever they are.',
        benefits: 'One-click multi-platform publishing, automatic video processing, campaign performance tracking.',
        icon: 'Video',
        order_num: 1,
      },
      {
        title: 'Supporter Tiers & Earnings',
        description: 'Supporters earn coins by engaging with your campaign content on social media. Three tiers — Starter, Micro-Influencer, and Influencer — determine how supporters earn and when they can withdraw. The more they engage, the more they earn.',
        benefits: 'Rewards real engagement, fair earning structure across all follower levels, transparent payout rules.',
        icon: 'Users',
        order_num: 2,
      },
      {
        title: 'Multi-Currency Wallet & Payouts',
        description: 'Deposit funds in your local currency via Stripe, PayPal, Flutterwave, or Paystack. The platform converts deposits to coins for campaign funding. Earned coins can be withdrawn back to your bank account or mobile wallet in your preferred currency.',
        benefits: 'Multiple payment gateways, local currency support for Nigeria, Ghana, US, UK, and EU, transparent conversion rates.',
        icon: 'Wallet',
        order_num: 3,
      },
    ];

    for (const f of features) {
      dbState.lastIds.software_features++;
      dbState.software_features.push({
        id: dbState.lastIds.software_features,
        ...f
      });
    }
  }

  // Check pricing — coin-based, no hardcoded fiat values
  if (dbState.pricing_plans.length === 0) {
    const plans: PricingPlan[] = [
      {
        name: 'Starter',
        price: 'Free',
        billing: 'no cost',
        features: JSON.stringify([
          'Up to 3 free campaigns per month',
          'Basic publishing to all social platforms',
          'Standard wallet features',
          'Email support within 48 hours'
        ]),
        popular: 0,
      },
      {
        name: 'Growth',
        price: 'Pay As You Go',
        billing: 'per campaign',
        features: JSON.stringify([
          'Unlimited paid campaigns',
          'All 5 social platforms',
          'Full supporter tier access',
          'Priority coin processing',
          'Chat support within 4 hours',
          'Basic analytics dashboard'
        ]),
        popular: 0,
      },
      {
        name: 'Professional',
        price: 'Volume-Based',
        billing: 'per campaign',
        features: JSON.stringify([
          'Everything in Growth',
          'Exclusive campaign types',
          'Advanced analytics and reports',
          'API access for integrations',
          'Dedicated account manager',
          'Bulk campaign discounts'
        ]),
        popular: 1,
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        billing: 'tailored plan',
        features: JSON.stringify([
          'Unlimited everything',
          'White-label options',
          'Custom integrations',
          'Uptime guarantee',
          '24/7 priority support',
          'Dedicated infrastructure'
        ]),
        popular: 0,
      },
    ];

    for (const p of plans) {
      dbState.lastIds.pricing_plans++;
      dbState.pricing_plans.push({
        id: dbState.lastIds.pricing_plans,
        ...p
      });
    }
  }

  // Check artists — kept for admin panel, not publicly visible
  if (dbState.artists.length === 0) {
    const artists: Artist[] = [
      {
        name: 'David Ogbodu',
        bio: 'Founder of StoryShout Limited. Software engineer and creative technologist building the future of video campaign monetization for African creators.',
        genre: 'Alternative Afro-Fusion',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
        featured: 1,
      },
      {
        name: 'StoryShout Collective',
        bio: 'A fluid collective of sound designers, visual developers, and alternative beat-makers exploring procedurally mixed live soundscapes.',
        genre: 'Experimental Afro-Electronic',
        image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
        featured: 1,
      },
    ];

    for (const a of artists) {
      dbState.lastIds.artists++;
      dbState.artists.push({
        id: dbState.lastIds.artists,
        ...a
      });
    }
  }

  // Check music_releases — kept for admin panel, not publicly visible
  if (dbState.music_releases.length === 0) {
    const releases: MusicRelease[] = [
      {
        title: 'Onyeka (Sound That Moves)',
        artist: 'David Ogbodu',
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        cover_url: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&auto=format&fit=crop&q=80',
        release_date: '2026-04-18',
        buy_url: 'https://bandcamp.com',
      },
      {
        title: 'Lagos Horizon',
        artist: 'StoryShout Collective',
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        cover_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80',
        release_date: '2026-05-30',
        buy_url: 'https://spotify.com',
      },
      {
        title: 'Anthem of the Unbound',
        artist: 'David Ogbodu & StoryShout Collective',
        audio_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        cover_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80',
        release_date: '25th June 2026',
        buy_url: 'https://music.apple.com',
      },
    ];

    for (const r of releases) {
      dbState.lastIds.music_releases++;
      dbState.music_releases.push({
        id: dbState.lastIds.music_releases,
        ...r
      });
    }
  }
}

export async function initDb(): Promise<any> {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      dbState = JSON.parse(data);
      if (!dbState.users) dbState.users = [];
      if (!dbState.software_features) dbState.software_features = [];
      if (!dbState.pricing_plans) dbState.pricing_plans = [];
      if (!dbState.music_releases) dbState.music_releases = [];
      if (!dbState.artists) dbState.artists = [];
      if (!dbState.contact_messages) dbState.contact_messages = [];
      if (!dbState.subscribe_emails) dbState.subscribe_emails = [];
      if (!dbState.lastIds) {
        dbState.lastIds = {
          users: Math.max(0, ...dbState.users.map(u => u.id)),
          software_features: Math.max(0, ...dbState.software_features.map(f => f.id || 0)),
          pricing_plans: Math.max(0, ...dbState.pricing_plans.map(p => p.id || 0)),
          music_releases: Math.max(0, ...dbState.music_releases.map(r => r.id || 0)),
          artists: Math.max(0, ...dbState.artists.map(a => a.id || 0)),
          contact_messages: Math.max(0, ...dbState.contact_messages.map(m => m.id || 0)),
          subscribe_emails: Math.max(0, ...dbState.subscribe_emails.map(s => s.id || 0)),
        };
      }
      if (!dbState.lastIds.subscribe_emails) dbState.lastIds.subscribe_emails = 0;
    } catch (err) {
      console.error('Error loading JSON DB, resetting:', err);
    }
  }

  await seedDefaultData();
  saveDb();
  console.log('[JSON Database] Pure JS/TS engine initialized and seeded successfully.');
  return null;
}

export async function dbAll<T>(sql: string, params: any[] = []): Promise<T[]> {
  const norm = sql.trim().toLowerCase().replace(/\s+/g, ' ');

  if (norm.startsWith('select * from software_features')) {
    const list = [...dbState.software_features];
    list.sort((a, b) => (a.order_num || 0) - (b.order_num || 0));
    return list as unknown as T[];
  }

  if (norm.startsWith('select * from pricing_plans')) {
    return [...dbState.pricing_plans] as unknown as T[];
  }

  if (norm.startsWith('select * from music_releases')) {
    const list = [...dbState.music_releases];
    list.sort((a, b) => (b.id || 0) - (a.id || 0));
    return list as unknown as T[];
  }

  if (norm.startsWith('select * from artists')) {
    const list = [...dbState.artists];
    list.sort((a, b) => {
      if ((b.featured || 0) !== (a.featured || 0)) {
        return (b.featured || 0) - (a.featured || 0);
      }
      return a.name.localeCompare(b.name);
    });
    return list as unknown as T[];
  }

  if (norm.startsWith('select * from contact_messages')) {
    const list = [...dbState.contact_messages];
    list.sort((a, b) => (b.id || 0) - (a.id || 0));
    return list as unknown as T[];
  }

  if (norm.startsWith('select * from subscribe_emails')) {
    const list = [...dbState.subscribe_emails];
    list.sort((a, b) => (b.id || 0) - (a.id || 0));
    return list as unknown as T[];
  }

  throw new Error(`[JSON Database] dbAll query not supported/mapped: ${sql}`);
}

export async function dbGet<T>(sql: string, params: any[] = []): Promise<T | undefined> {
  const norm = sql.trim().toLowerCase().replace(/\s+/g, ' ');

  if (norm.startsWith('select * from users where email = ?')) {
    const email = params[0];
    const user = dbState.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user as unknown as T;
  }
  if (norm.startsWith('select * from users where id = ?')) {
    const id = Number(params[0]);
    const user = dbState.users.find(u => u.id === id);
    return user as unknown as T;
  }

  if (norm.startsWith('select count(*) as cnt from software_features')) {
    return { cnt: dbState.software_features.length } as unknown as T;
  }
  if (norm.startsWith('select count(*) as cnt from pricing_plans')) {
    return { cnt: dbState.pricing_plans.length } as unknown as T;
  }
  if (norm.startsWith('select count(*) as cnt from music_releases')) {
    return { cnt: dbState.music_releases.length } as unknown as T;
  }
  if (norm.startsWith('select count(*) as cnt from artists')) {
    return { cnt: dbState.artists.length } as unknown as T;
  }
  if (norm.startsWith('select count(*) as cnt from contact_messages where status = \'unread\'')) {
    const unread = dbState.contact_messages.filter(m => m.status === 'Unread');
    return { cnt: unread.length } as unknown as T;
  }
  if (norm.startsWith('select count(*) as cnt from contact_messages')) {
    return { cnt: dbState.contact_messages.length } as unknown as T;
  }

  if (norm.startsWith('select * from subscribe_emails where email = ?')) {
    const email = params[0];
    const sub = dbState.subscribe_emails.find(s => s.email.toLowerCase() === email.toLowerCase());
    return sub as unknown as T;
  }
  if (norm.startsWith('select count(*) as cnt from subscribe_emails')) {
    return { cnt: dbState.subscribe_emails.length } as unknown as T;
  }

  throw new Error(`[JSON Database] dbGet query not supported/mapped: ${sql}`);
}

export async function dbRun(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
  const norm = sql.trim().toLowerCase().replace(/\s+/g, ' ');

  if (norm.startsWith('pragma')) {
    return { lastID: 0, changes: 0 };
  }

  // INSERT INTO subscribe_emails
  if (norm.startsWith('insert into subscribe_emails')) {
    const [email, created_at] = params;
    dbState.lastIds.subscribe_emails = (dbState.lastIds.subscribe_emails || 0) + 1;
    const newSub: SubscribeEmail = {
      id: dbState.lastIds.subscribe_emails,
      email,
      created_at
    };
    dbState.subscribe_emails.push(newSub);
    saveDb();
    return { lastID: newSub.id!, changes: 1 };
  }

  // INSERT INTO contact_messages
  if (norm.startsWith('insert into contact_messages')) {
    const [name, email, subject, message, created_at] = params;
    dbState.lastIds.contact_messages++;
    const newMsg: ContactMessage = {
      id: dbState.lastIds.contact_messages,
      name,
      email,
      subject,
      message,
      created_at,
      status: 'Unread'
    };
    dbState.contact_messages.push(newMsg);
    saveDb();
    return { lastID: newMsg.id, changes: 1 };
  }

  // INSERT INTO users
  if (norm.startsWith('insert into users')) {
    const [email, password] = params;
    dbState.lastIds.users++;
    const newUser: User = {
      id: dbState.lastIds.users,
      email,
      password,
      is_default: 1
    };
    dbState.users.push(newUser);
    saveDb();
    return { lastID: newUser.id, changes: 1 };
  }

  // INSERT INTO software_features
  if (norm.startsWith('insert into software_features')) {
    const [title, description, benefits, icon, order_num] = params;
    dbState.lastIds.software_features++;
    const newFeat: SoftwareFeature = {
      id: dbState.lastIds.software_features,
      title,
      description,
      benefits,
      icon,
      order_num: Number(order_num || 0)
    };
    dbState.software_features.push(newFeat);
    saveDb();
    return { lastID: newFeat.id!, changes: 1 };
  }

  // INSERT INTO pricing_plans
  if (norm.startsWith('insert into pricing_plans')) {
    const [name, price, billing, features, popular] = params;
    dbState.lastIds.pricing_plans++;
    const newPlan: PricingPlan = {
      id: dbState.lastIds.pricing_plans,
      name,
      price,
      billing,
      features,
      popular: popular ? 1 : 0
    };
    dbState.pricing_plans.push(newPlan);
    saveDb();
    return { lastID: newPlan.id!, changes: 1 };
  }

  // INSERT INTO music_releases
  if (norm.startsWith('insert into music_releases')) {
    const [title, artist, audio_url, cover_url, release_date, buy_url] = params;
    dbState.lastIds.music_releases++;
    const newRelease: MusicRelease = {
      id: dbState.lastIds.music_releases,
      title,
      artist,
      audio_url,
      cover_url,
      release_date,
      buy_url
    };
    dbState.music_releases.push(newRelease);
    saveDb();
    return { lastID: newRelease.id!, changes: 1 };
  }

  // INSERT INTO artists
  if (norm.startsWith('insert into artists')) {
    const [name, bio, image_url, genre, featured] = params;
    dbState.lastIds.artists++;
    const newArtist: Artist = {
      id: dbState.lastIds.artists,
      name,
      bio,
      image_url,
      genre,
      featured: featured ? 1 : 0
    };
    dbState.artists.push(newArtist);
    saveDb();
    return { lastID: newArtist.id!, changes: 1 };
  }

  // UPDATE users
  if (norm.startsWith('update users set password = ?, is_default = 0 where id = ?')) {
    const [password, id] = params;
    const userIndex = dbState.users.findIndex(u => u.id === Number(id));
    if (userIndex !== -1) {
      dbState.users[userIndex].password = password;
      dbState.users[userIndex].is_default = 0;
      saveDb();
      return { lastID: dbState.users[userIndex].id, changes: 1 };
    }
    return { lastID: 0, changes: 0 };
  }

  // UPDATE software_features
  if (norm.startsWith('update software_features set title = ?, description = ?, benefits = ?, icon = ?, order_num = ? where id = ?')) {
    const [title, description, benefits, icon, order_num, id] = params;
    const idx = dbState.software_features.findIndex(f => f.id === Number(id));
    if (idx !== -1) {
      dbState.software_features[idx] = {
        id: Number(id),
        title,
        description,
        benefits,
        icon,
        order_num: Number(order_num)
      };
      saveDb();
      return { lastID: Number(id), changes: 1 };
    }
    return { lastID: 0, changes: 0 };
  }

  // UPDATE pricing_plans
  if (norm.startsWith('update pricing_plans set name = ?, price = ?, billing = ?, features = ?, popular = ? where id = ?')) {
    const [name, price, billing, features, popular, id] = params;
    const idx = dbState.pricing_plans.findIndex(p => p.id === Number(id));
    if (idx !== -1) {
      dbState.pricing_plans[idx] = {
        id: Number(id),
        name,
        price,
        billing,
        features,
        popular: popular ? 1 : 0
      };
      saveDb();
      return { lastID: Number(id), changes: 1 };
    }
    return { lastID: 0, changes: 0 };
  }

  // UPDATE music_releases
  if (norm.startsWith('update music_releases set title = ?, artist = ?, audio_url = ?, cover_url = ?, release_date = ?, buy_url = ? where id = ?')) {
    const [title, artist, audio_url, cover_url, release_date, buy_url, id] = params;
    const idx = dbState.music_releases.findIndex(r => r.id === Number(id));
    if (idx !== -1) {
      dbState.music_releases[idx] = {
        id: Number(id),
        title,
        artist,
        audio_url,
        cover_url,
        release_date,
        buy_url
      };
      saveDb();
      return { lastID: Number(id), changes: 1 };
    }
    return { lastID: 0, changes: 0 };
  }

  // UPDATE artists
  if (norm.startsWith('update artists set name = ?, bio = ?, image_url = ?, genre = ?, featured = ? where id = ?')) {
    const [name, bio, image_url, genre, featured, id] = params;
    const idx = dbState.artists.findIndex(a => a.id === Number(id));
    if (idx !== -1) {
      dbState.artists[idx] = {
        id: Number(id),
        name,
        bio,
        image_url,
        genre,
        featured: featured ? 1 : 0
      };
      saveDb();
      return { lastID: Number(id), changes: 1 };
    }
    return { lastID: 0, changes: 0 };
  }

  // UPDATE contact_messages status
  if (norm.startsWith('update contact_messages set status = ? where id = ?')) {
    const [status, id] = params;
    const idx = dbState.contact_messages.findIndex(m => m.id === Number(id));
    if (idx !== -1) {
      dbState.contact_messages[idx].status = status;
      saveDb();
      return { lastID: Number(id), changes: 1 };
    }
    return { lastID: 0, changes: 0 };
  }

  // DELETE FROM
  if (norm.startsWith('delete from')) {
    const tableMatch = norm.match(/delete from\s+(\w+)\s+where\s+id\s*=\s*\?/);
    if (tableMatch) {
      const table = tableMatch[1];
      const id = Number(params[0]);
      if (table && table in dbState) {
        const list = (dbState as any)[table] as any[];
        const originalLength = list.length;
        const filtered = list.filter((item: any) => item.id !== id);
        (dbState as any)[table] = filtered;
        const changes = originalLength - filtered.length;
        if (changes > 0) {
          saveDb();
        }
        return { lastID: id, changes };
      }
    }
  }

  throw new Error(`[JSON Database] dbRun query not supported/mapped: ${sql}`);
}

