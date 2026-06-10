# StoryShout Limited - Official Digital Workspace

> **"Code That Speaks. Sound That Moves."**

This is the production-ready, full-stack website and back-office administrative cockpit for **StoryShout Limited**—a modern Nigerian hybrid operating high-performance campaign SaaS software and representing independent alternative musical talent from Lekki, Lagos.

---

## 🎨 Creative Identity & Visual Palette

- **Primary Colors**: 
  - Deep Outer Space Navy (`#0B0C10`)
  - Electric Teal (`#45A29E`)
  - Neon Cyan Core (`#66FCF1`)
  - Accent Gold (`#F3A738`) – utilized primarily for artistic musical elements
- **Typography & Font pairings**:
  - Headings / Display: **Space Grotesk**
  - Body copy / General: **DM Sans** & **Inter**
- **Vibe & Design philosophy**: Clean, sophisticated, high-contrast, robust and fluid micro-transitions. High-contrast light modes paired with deep cosmic-grade dark canvases.

---

## ⚡ Tech Stack Architecture

The portal leverages a modern, unified, **single-process Full-Stack architecture**:

- **Frontend client**: 
  - React 19 + Vite + TypeScript (bundler)
  - Tailwind CSS v4 (native compiler plugins)
  - React Router DOM (client routing)
  - `motion/react` (micro-interactions & page entrances)
  - `lucide-react` (high-end SVG icon matrices)
- **Backend Services (Express)**:
  - Node.js + Express.js API routes (API layers served before assets)
  - In development mode, Vite's Dev Server is embedded directly as middleware (`createViteServer`) to handle hot module resolution.
  - In production mode, the server compiles standard SPA files into `/dist` and serves asset builds statically.
- **Database Persistence**:
  - File-based SQLite (`storyshout.db`).
  - Asynchronous promise-driven wrappers.
  - Auto-seeded with master features, pricing structures, roster profiles, and music releases on first initialization.
- **Security & Media Handlers**:
  - JWT authorization tokens with 24-hour expiry.
  - BCryptJS password hash rounds.
  - Multer multipart storage engine pointing to local `/uploads` serving images and MP3 files concurrently.

---

## 🏗️ Folder and Key Files Structure

```bash
├── package.json          # Dependency packages (full-stack scripts)
├── server.ts             # Express server entry (JWT gates, Multer configurations, Vite endpoints)
├── tsconfig.json         # Strict TypeScript compiler definitions
├── vite.config.ts        # Client optimization aliasing and variables
├── metadata.json         # Platform manifest structures
├── storyshout.db         # Generated SQLite local binary (created on startup)
├── uploads/              # Multer media storage folder (created programmatically)
├── server/
│   └── db.ts             # Database schema migrations, asynchronous helpers, and default seeds
└── src/
    ├── main.tsx          # Client boot script 
    ├── App.tsx           # Global React Routing engine and dark/light toggles
    ├── index.css         # Theme imports and custom scrollbars
    ├── types.ts          # Shared TypeScript type interfaces
    ├── components/
    │   └── Layout.tsx    # Responsive global Header/Footer and navigation utilities
    └── pages/
        ├── Home.tsx      # Dual-CTA split visual homepage with cycling tagline
        ├── Software.tsx  # Product feature breakdowns, process timeline, and pricing tiers
        ├── Music.tsx     # Label catalog releases and HTML5 Audio Player widget
        ├── About.tsx     # Creative mission profile & David Ogbodu's bio spotlight
        └── Contact.tsx   # Subject-based validated contact form mapped to SQLite
```

---

## 🚀 Execution & Command Reference

The codebase compiles both front-end developments and API endpoints inside a synchronized server, meaning **the entire system boots cleanly utilizing a single command**:

### 1. Installation

Install all required Node dependencies:

```bash
npm install
```

### 2. Run Local Development Server

Run the development server natively on host `0.0.0.0` and port `3000`:

```bash
npm run dev
```

*Note: In development, Express automatically boots Vite in middleware Mode, meaning client code updates will Hot-Reload natively.*

### 3. Build & Compile for Production

To compile files before cloud deployment, run:

```bash
npm run build
```

This triggers:
1. `vite build` - Bundling client-side JSX assets into statically optimized files inside `/dist/`.
2. `esbuild server.ts --bundle --platform=node ...` - Bundling the typescript Express backend into a single, self-contained CommonJS (`.cjs`) executable inside `/dist/server.cjs` to ensure cold starts are near-instantaneous.

### 4. Boot Production Server

Run the standalone Compiled release:

```bash
npm run start
```

---

## 🔒 Master Administrative Credentials

We pre-seeded a default security profile on database creation to let you inspect dashboards immediately:

- **Login Endpoint**: `/admin/login`
- **Email**: `admin@storyshoutltd.com`
- **Password**: `StoryShout2026!`

### Security Enforcement Notice
When logging in with these default credentials, a persistent warning banner is presented: `"WARNING: You are currently utilizing the default seeding password..."`. 

To revoke this warning, go to **Credentials Security Settings** tab under the back-office sidebar, enter the default password, and submit a custom strong password. Once updated, the database resets the security state and the warning is permanently dismissed.

---

## 🌐 Custom Domain Mapping to `storyshoutltd.com`

To publish this website live on storyshoutltd.com, execute these standard infrastructure steps:

### Phase 1: DNS Records Mapping
Access your domain registrar DNS zone file editor (GoDaddy, Namecheap, Cloudflare, etc.) and specify records pointing to your hosting container:

1. **A Record (Apex Domain)**:
   - Name: `@`
   - Type: `A`
   - Value: `<YOUR_CLOUD_STATION_IP>`
   - TTL: `Auto / 3600`
2. **CNAME Record (Subdomain)**:
   - Name: `www`
   - Type: `CNAME`
   - Value: `storyshoutltd.com.`
   - TTL: `Auto`

### Phase 2: Reverse Proxy (Nginx Setup)
If running on a virtual private server, configure `/etc/nginx/sites-available/storyshout` to route port `3000` traffic out safely:

```nginx
server {
    listen 80;
    server_name storyshoutltd.com www.storyshoutltd.com;

    # Dynamic uploads and attachments routing adjustments
    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Phase 3: HTTPS SSL Cryptography (Let's Encrypt Certbot)
Generate verified, free SSL certificates of authority to secure payment transfers, login entries, and data conduits:

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d storyshoutltd.com -d www.storyshoutltd.com
```

### Phase 4: Environment Configurations
Once the custom domain is active, edit your production `.env` parameters to support correct endpoints callbacks:

```env
APP_URL="https://storyshoutltd.com"
JWT_SECRET="YOUR_RANDOM_STRICT_GUID"
```
