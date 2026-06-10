export interface SoftwareFeature {
  id?: number;
  title: string;
  description: string;
  benefits?: string;
  icon: string;
  order_num: number;
}

export interface PricingPlan {
  id?: number;
  name: string;
  price: string;
  billing: string;
  features: string[];
  popular: number;
}

export interface MusicRelease {
  id?: number;
  title: string;
  artist: string;
  audio_url: string;
  cover_url: string;
  release_date?: string;
  buy_url?: string;
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
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: string;
}

export interface DashboardStats {
  features: number;
  plans: number;
  releases: number;
  artists: number;
  messages: {
    total: number;
    unread: number;
  };
}
