import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, LayoutDashboard, Server, Music, Mail, Settings, 
  LogOut, ExternalLink, Plus, Edit, Trash2, Check, RefreshCw, 
  Upload, Eye, Search, Filter, Play, CheckCircle, Smartphone, Sliders 
} from 'lucide-react';
import { SoftwareFeature, PricingPlan, MusicRelease, Artist, ContactMessage, DashboardStats } from '../types';

type TabType = 'dashboard' | 'software' | 'music' | 'messages' | 'settings';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  
  // Storage data
  const [features, setFeatures] = useState<SoftwareFeature[]>([]);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // State indicators
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  // Change password forms
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  
  // Toggle Password Warning
  const [showWarning, setShowWarning] = useState(false);
  const adminEmail = localStorage.getItem('storyshout_admin_email') || 'Admin';

  // State modals or inline creation templates
  const [editingFeature, setEditingFeature] = useState<SoftwareFeature | null>(null);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [editingRelease, setEditingRelease] = useState<MusicRelease | null>(null);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);

  // Upload progress indicators
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: 'idle' | 'uploading' | 'completed' | 'failed' }>({});

  const [featureForm, setFeatureForm] = useState<SoftwareFeature>({ title: '', description: '', benefits: '', icon: 'Send', order_num: 1 });
  const [planForm, setPlanForm] = useState<{ id?: number; name: string; price: string; billing: string; featuresText: string; popular: boolean }>({
    name: '', price: '', billing: 'per month', featuresText: '', popular: false
  });
  const [releaseForm, setReleaseForm] = useState<MusicRelease>({ title: '', artist: '', audio_url: '', cover_url: '', release_date: '', buy_url: '' });
  const [artistForm, setArtistForm] = useState<Artist>({ name: '', bio: '', image_url: '', genre: '', featured: 0 });

  const navigate = useNavigate();

  // Guard routing
  useEffect(() => {
    const token = localStorage.getItem('storyshout_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    const warning = localStorage.getItem('storyshout_default_password_warning') === 'true';
    setShowWarning(warning);

    fetchAdminData();
  }, [navigate]);

  async function fetchAdminData() {
    setLoading(true);
    setActionError('');
    const token = localStorage.getItem('storyshout_admin_token');
    
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const [statsRes, featRes, planRes, relRes, artRes, msgRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/software/features'),
        fetch('/api/software/pricing'),
        fetch('/api/music/releases'),
        fetch('/api/music/artists'),
        fetch('/api/admin/contact/messages', { headers })
      ]);

      if (statsRes.status === 401 || msgRes.status === 401) {
        // Token expired
        localStorage.clear();
        navigate('/admin/login');
        return;
      }

      if (statsRes.ok) setStats(await statsRes.json());
      if (featRes.ok) setFeatures(await featRes.json());
      if (planRes.ok) setPlans(await planRes.json());
      if (relRes.ok) setReleases(await relRes.json());
      if (artRes.ok) setArtists(await artRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());

    } catch (e: any) {
      setActionError('Failures in synchronizing core admin parameters.');
    } finally {
      setLoading(false);
    }
  }

  // File Uploader mechanism
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldKey: string, formSetter: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus(prev => ({ ...prev, [fieldKey]: 'uploading' }));
    
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('storyshout_admin_token');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) throw new Error('Multer storage reject.');
      const data = await res.json();
      
      formSetter((prev: any) => ({ ...prev, [fieldKey]: data.url }));
      setUploadStatus(prev => ({ ...prev, [fieldKey]: 'completed' }));
      dismissBannerShortly('Completed file upload successfully.');
    } catch (err: any) {
      setUploadStatus(prev => ({ ...prev, [fieldKey]: 'failed' }));
      setActionError('File uploading failed. Max size is 15MB.');
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  const dismissBannerShortly = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 4000);
  };

  // SOFTWARE FEATURE HANDLERS
  const submitFeature = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');
    const token = localStorage.getItem('storyshout_admin_token');
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    };

    try {
      if (editingFeature) {
        // Edit existing feature
        const res = await fetch(`/api/admin/software/features/${editingFeature.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(featureForm)
        });
        if (!res.ok) throw new Error('Update failed.');
        dismissBannerShortly('Feature customized successfully.');
        setEditingFeature(null);
      } else {
        // Creating new feature
        const res = await fetch('/api/admin/software/features', {
          method: 'POST',
          headers,
          body: JSON.stringify(featureForm)
        });
        if (!res.ok) throw new Error('Creation failed.');
        dismissBannerShortly('Feature created successfully.');
      }
      setFeatureForm({ title: '', description: '', benefits: '', icon: 'Send', order_num: 1 });
      fetchAdminData();
    } catch (err: any) {
      setActionError(err.message || 'Operation failed.');
    }
  };

  const deleteFeature = async (id: number) => {
    if (!window.confirm('Confirm delete of this Campaign SaaS Feature?')) return;
    const token = localStorage.getItem('storyshout_admin_token');
    try {
      const res = await fetch(`/api/admin/software/features/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Deletion failed.');
      dismissBannerShortly('Feature deleted successfully.');
      fetchAdminData();
    } catch (err: any) {
      setActionError(err.message || 'Deletion failure.');
    }
  };

  // PRICING MANAGEMENT
  const submitPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');
    const token = localStorage.getItem('storyshout_admin_token');
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    };

    const parsedFeatures = planForm.featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const payload = {
      name: planForm.name,
      price: planForm.price,
      billing: planForm.billing,
      features: parsedFeatures,
      popular: planForm.popular ? 1 : 0
    };

    try {
      if (editingPlan) {
        const res = await fetch(`/api/admin/software/pricing/${editingPlan.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Update failed.');
        dismissBannerShortly('Pricing customized successfully.');
        setEditingPlan(null);
      } else {
        const res = await fetch('/api/admin/software/pricing', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Insertion failed.');
        dismissBannerShortly('Pricing Tier created.');
      }
      setPlanForm({ name: '', price: '', billing: 'per month', featuresText: '', popular: false });
      fetchAdminData();
    } catch (err: any) {
      setActionError(err.message || 'Operation failed.');
    }
  };

  const deletePlan = async (id: number) => {
    if (!window.confirm('Delete this Pricing Tier?')) return;
    const token = localStorage.getItem('storyshout_admin_token');
    try {
      const res = await fetch(`/api/admin/software/pricing/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Deletion failed.');
      dismissBannerShortly('Pricing Tier deleted.');
      fetchAdminData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // MUSIC RELEASES CRUD
  const submitRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!releaseForm.audio_url || !releaseForm.cover_url) {
      setActionError('Audio and cover art URL references are mandatory. Please upload respective files.');
      return;
    }

    setActionError('');
    const token = localStorage.getItem('storyshout_admin_token');
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    };

    try {
      if (editingRelease) {
        const res = await fetch(`/api/admin/music/releases/${editingRelease.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(releaseForm)
        });
        if (!res.ok) throw new Error('Release customization failed.');
        dismissBannerShortly('Roster Release updated.');
        setEditingRelease(null);
      } else {
        const res = await fetch('/api/admin/music/releases', {
          method: 'POST',
          headers,
          body: JSON.stringify(releaseForm)
        });
        if (!res.ok) throw new Error('Release addition failed.');
        dismissBannerShortly('Roster Release created.');
      }
      setReleaseForm({ title: '', artist: '', audio_url: '', cover_url: '', release_date: '', buy_url: '' });
      setUploadStatus({});
      fetchAdminData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  const deleteRelease = async (id: number) => {
    if (!window.confirm('Remove this Release from records catalogue?')) return;
    const token = localStorage.getItem('storyshout_admin_token');
    try {
      const res = await fetch(`/api/admin/music/releases/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed deletion.');
      dismissBannerShortly('Catalogue release deleted.');
      fetchAdminData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // ARTIST CRUD
  const submitArtist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistForm.image_url) {
      setActionError('An Artist profile image upload is required.');
      return;
    }

    setActionError('');
    const token = localStorage.getItem('storyshout_admin_token');
    const headers = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    };

    try {
      if (editingArtist) {
        const res = await fetch(`/api/admin/music/artists/${editingArtist.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(artistForm)
        });
        if (!res.ok) throw new Error('Artist customization failed.');
        dismissBannerShortly('Roster artist modified.');
        setEditingArtist(null);
      } else {
        const res = await fetch('/api/admin/music/artists', {
          method: 'POST',
          headers,
          body: JSON.stringify(artistForm)
        });
        if (!res.ok) throw new Error('Artist addition failed.');
        dismissBannerShortly('New Artist added to roster.');
      }
      setArtistForm({ name: '', bio: '', image_url: '', genre: '', featured: 0 });
      setUploadStatus({});
      fetchAdminData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  const deleteArtist = async (id: number) => {
    if (!window.confirm('Delete this Artist from record label roster?')) return;
    const token = localStorage.getItem('storyshout_admin_token');
    try {
      const res = await fetch(`/api/admin/music/artists/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed deleting.');
      dismissBannerShortly('Artist removed from roster.');
      fetchAdminData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // MESSAGE MANAGEMENT
  const toggleMessageStatus = async (id: number, currentStatus: string) => {
    const token = localStorage.getItem('storyshout_admin_token');
    const nextStatus = currentStatus === 'Unread' ? 'Read' : 'Unread';
    try {
      const res = await fetch(`/api/admin/contact/messages/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: nextStatus })
      });
      if (!res.ok) throw new Error('Failed custom action.');
      fetchAdminData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!window.confirm('Delete this Message?')) return;
    const token = localStorage.getItem('storyshout_admin_token');
    try {
      const res = await fetch(`/api/admin/contact/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed client delete.');
      dismissBannerShortly('Message deleted.');
      fetchAdminData();
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // PASSWORD SETTINGS CHANGES (Dismiss Warning!)
  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError('');
    
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setActionError('Specify both current and brand-new passwords.');
      return;
    }

    const token = localStorage.getItem('storyshout_admin_token');

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(passwordForm)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password rejected.');

      localStorage.setItem('storyshout_default_password_warning', 'false');
      setShowWarning(false);
      setPasswordForm({ currentPassword: '', newPassword: '' });
      dismissBannerShortly('Password updated. Dev default security flag is now closed.');
    } catch (err: any) {
      setActionError(err.message);
    }
  };

  // Filter lists
  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.message?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterOption === 'all') return matchesSearch;
    return matchesSearch && m.status === filterOption;
  });

  return (
    <div className="min-h-screen bg-[#F4F6F8] dark:bg-brand-navy dark:text-slate-100 flex flex-col md:flex-row transition-colors duration-200">
      
      {/* Sidebar Navigation (Dashboard Controls) */}
      <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 flex flex-col justify-between p-6 border-r border-[#45A29E]/10">
        <div className="space-y-8">
          
          {/* Label Title */}
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-black text-xs p-1.5 rounded-md bg-brand-teal text-slate-900">SS</span>
              <span className="font-display font-bold text-base text-white">StoryShout Portals</span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-wider truncate">ACCOUNT: {adminEmail}</p>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col space-y-1 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'dashboard' ? 'bg-brand-teal text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard Core</span>
            </button>

            <button 
              onClick={() => setActiveTab('software')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'software' ? 'bg-brand-teal text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Server size={18} />
              <span>Manage Software</span>
            </button>

            <button 
              onClick={() => setActiveTab('music')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'music' ? 'bg-brand-teal text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Music size={18} />
              <span>Manage Music</span>
            </button>

            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'messages' ? 'bg-brand-teal text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
              id="admin-sidebar-messages"
            >
              <Mail size={18} />
              <span>Contact Messages</span>
              {messages.filter(m => m.status === 'Unread').length > 0 && (
                <span className="ml-auto bg-brand-gold text-slate-950 text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
                  {messages.filter(m => m.status === 'Unread').length}
                </span>
              )}
            </button>

            <button 
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'settings' ? 'bg-brand-teal text-slate-950 shadow-md font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Settings size={18} />
              <span>Access Settings</span>
            </button>
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-slate-800 mt-8 space-y-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-brand-teal transition-colors"
          >
            <ExternalLink size={13} />
            <span>Go to Public Site</span>
          </Link>
          <button 
            id="admin-logout-button"
            onClick={logout}
            className="flex items-center space-x-2 text-xs font-mono text-rose-400 hover:text-rose-500 transition-colors w-full text-left"
          >
            <LogOut size={13} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-grow p-6 md:p-10 font-sans max-w-7xl mx-auto w-full">
        
        {/* Default Admin seed credentials Banner WARNING */}
        {showWarning && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-start space-x-3 text-xs shadow-inner animate-pulse">
            <ShieldAlert size={18} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">SECURITY WARNING: Pre-seeded Credentials Flag</p>
              <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                You are currently utilizing default pre-seeded credentials. Please navigate to the <button onClick={() => setActiveTab('settings')} className="underline font-bold text-brand-teal hover:text-brand-teal-light">Access Settings</button> tab to update credentials; this action will permanently dismiss this warning.
              </p>
            </div>
          </div>
        )}

        {/* Action success/error banners */}
        <AnimatePresence mode="wait">
          {actionError && (
            <motion.div 
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mb-4 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs rounded-xl flex items-center space-x-2"
            >
              <ShieldAlert size={14} />
              <span>{actionError}</span>
            </motion.div>
          )}

          {actionSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mb-4 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2"
            >
              <CheckCircle size={14} />
              <span>{actionSuccess}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Overlay */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-brand-teal"></div>
            <p className="text-xs font-mono text-slate-400 mt-3">Synthesizing admin workspace parameters...</p>
          </div>
        ) : (
          <div>
            
            {/* VIEW TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && stats && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-extrabold text-2.5xl text-slate-900 dark:text-white">Workspace Overview</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Aggregate logs and operational statistics</p>
                </div>

                {/* Stats Grid cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono text-slate-400">SOFTWARE FEATURES</p>
                      <h4 className="font-display font-black text-2xl mt-1 text-slate-900 dark:text-white">{stats.features}</h4>
                    </div>
                    <div className="p-3 bg-brand-teal/10 text-brand-teal border border-brand-teal/20 rounded-xl"><Server size={20} /></div>
                  </div>

                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono text-slate-400">ACTIVE PRICING TIERS</p>
                      <h4 className="font-display font-black text-2xl mt-1 text-slate-900 dark:text-white">{stats.plans}</h4>
                    </div>
                    <div className="p-3 bg-brand-teal/10 text-brand-teal border border-brand-teal/20 rounded-xl"><Sliders size={20} /></div>
                  </div>

                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono text-slate-400">ROSTER ARTISTS</p>
                      <h4 className="font-display font-black text-2xl mt-1 text-slate-900 dark:text-white">{stats.artists}</h4>
                    </div>
                    <div className="p-3 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 rounded-xl"><Music size={20} /></div>
                  </div>

                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-mono text-slate-400">UNREAD MESSAGES</p>
                      <h4 className="font-display font-black text-2xl mt-1 text-slate-900 dark:text-white">{stats.messages.unread}</h4>
                    </div>
                    <div className="p-3 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded-xl"><Mail size={20} /></div>
                  </div>
                </div>

                {/* Quick actions listing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* SaaS Features review */}
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-4">Core SaaS Features</h3>
                    <div className="space-y-3">
                      {features.map(f => (
                        <div key={f.id} className="flex justify-between items-center text-xs p-3 bg-[#F8F9FA] dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl">
                          <span className="font-medium text-slate-800 dark:text-slate-200">{f.title}</span>
                          <span className="font-mono text-slate-400 text-[10px]">ORDER: {f.order_num}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Latest Releases review */}
                  <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mb-4">Latest releases</h3>
                    <div className="space-y-3">
                      {releases.slice(0, 3).map(r => (
                        <div key={r.id} className="flex justify-between items-center text-xs p-3 bg-[#F8F9FA] dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl">
                          <span className="font-medium text-slate-800 dark:text-slate-200">{r.title}</span>
                          <span className="font-mono text-[10px] text-brand-gold">{r.artist}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW TAB 2: MANAGE SOFTWARE (SaaS CRUD) */}
            {activeTab === 'software' && (
              <div className="space-y-12">
                
                {/* Manage features Section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">SaaS Catalog Features</h2>
                      <p className="text-xs text-slate-500">Add or edit key functional features</p>
                    </div>
                    {editingFeature && (
                      <button 
                        onClick={() => {
                          setEditingFeature(null);
                          setFeatureForm({ title: '', description: '', benefits: '', icon: 'Send', order_num: 1 });
                        }}
                        className="text-xs font-mono text-indigo-500 hover:underline"
                      >
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  <form onSubmit={submitFeature} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">
                      {editingFeature ? `Edit Feature: ${editingFeature.title}` : 'Add New SaaS Feature'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Title</label>
                        <input 
                          type="text" 
                          required
                          value={featureForm.title}
                          onChange={(e) => setFeatureForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Robust Delivery Analytics" 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Benefits Summary</label>
                        <input 
                          type="text" 
                          value={featureForm.benefits}
                          onChange={(e) => setFeatureForm(prev => ({ ...prev, benefits: e.target.value }))}
                          placeholder="e.g. High carrier rates..." 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Order Position</label>
                        <input 
                          type="number" 
                          value={featureForm.order_num}
                          onChange={(e) => setFeatureForm(prev => ({ ...prev, order_num: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Description text</label>
                        <input 
                          type="text" 
                          required
                          value={featureForm.description}
                          onChange={(e) => setFeatureForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="State features details..." 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Lucide Icon Alias</label>
                        <select 
                          value={featureForm.icon}
                          onChange={(e) => setFeatureForm(prev => ({ ...prev, icon: e.target.value }))}
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs cursor-pointer text-slate-900 dark:text-white"
                        >
                          <option value="Send">Send (Sms Broadcast)</option>
                          <option value="Sparkles">Sparkles (AI adaptors)</option>
                          <option value="BarChart3">BarChart3 (Analytics)</option>
                          <option value="Server">Server (System core)</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="bg-brand-navy hover:bg-[#151722] dark:bg-brand-teal dark:hover:bg-brand-teal-light text-white dark:text-slate-950 font-bold px-4 py-2 text-xs rounded-xl transition-all inline-flex items-center space-x-1.5"
                    >
                      <Check size={14} />
                      <span>{editingFeature ? 'Commit Edits' : 'Save New Feature'}</span>
                    </button>
                  </form>

                  {/* List features in Table */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <table className="w-full text-left font-sans text-xs">
                      <thead className="bg-[#F8F9FA] dark:bg-slate-950 text-slate-400 font-mono">
                        <tr>
                          <th className="p-4">ICON</th>
                          <th className="p-4">TITLE</th>
                          <th className="p-4">DESCRIPTION</th>
                          <th className="p-4">ORDER</th>
                          <th className="p-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {features.map(f => (
                          <tr key={f.id} className="border-t border-slate-100 dark:border-slate-800">
                            <td className="p-4 font-mono text-brand-teal font-semibold">{f.icon}</td>
                            <td className="p-4 font-bold text-slate-900 dark:text-white">{f.title}</td>
                            <td className="p-4 text-slate-500 truncate max-w-sm">{f.description}</td>
                            <td className="p-4 font-mono">{f.order_num}</td>
                            <td className="p-4 text-right space-x-2">
                              <button 
                                onClick={() => {
                                  setEditingFeature(f);
                                  setFeatureForm(f);
                                }}
                                className="p-1.5 hover:text-brand-teal transition-colors"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                onClick={() => deleteFeature(f.id!)}
                                className="p-1.5 hover:text-rose-500 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Manage Pricing section */}
                <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Active pricing tiers</h2>
                      <p className="text-xs text-slate-500">Add or modify SaaS customer subscription matrices</p>
                    </div>
                    {editingPlan && (
                      <button 
                        onClick={() => {
                          setEditingPlan(null);
                          setPlanForm({ name: '', price: '', billing: 'per month', featuresText: '', popular: false });
                        }}
                        className="text-xs font-mono text-indigo-500 hover:underline"
                      >
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  {/* Pricing Input Form */}
                  <form onSubmit={submitPlan} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">
                      {editingPlan ? `Edit Pricing: ${editingPlan.name}` : 'Add New Pricing Tier'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Plan Name</label>
                        <input 
                          type="text" 
                          required
                          value={planForm.name}
                          onChange={(e) => setPlanForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Pro SaaS Elite" 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Price Level (Naira/USD)</label>
                        <input 
                          type="text" 
                          required
                          value={planForm.price}
                          onChange={(e) => setPlanForm(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="e.g. ₦45,000" 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Billing Interval</label>
                        <input 
                          type="text" 
                          required
                          value={planForm.billing}
                          onChange={(e) => setPlanForm(prev => ({ ...prev, billing: e.target.value }))}
                          placeholder="e.g. per month" 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1 flex items-center pt-5">
                        <label className="flex items-center space-x-2 text-xs font-medium cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={planForm.popular}
                            onChange={(e) => setPlanForm(prev => ({ ...prev, popular: e.target.checked }))}
                            className="accent-brand-teal"
                          />
                          <span>Highlight as Popular</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1 pb-1">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Features List (Specify each benefit on a new line)</label>
                      <textarea 
                        rows={3}
                        required
                        value={planForm.featuresText}
                        onChange={(e) => setPlanForm(prev => ({ ...prev, featuresText: e.target.value }))}
                        placeholder="e.g.&#10;50,000 active contacts&#10;Dolby composition splitting&#10;Full SLA Support..." 
                        className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="bg-brand-navy hover:bg-[#151722] dark:bg-brand-teal dark:hover:bg-brand-teal-light text-white dark:text-slate-950 font-bold px-4 py-2 text-xs rounded-xl transition-all inline-flex items-center space-x-1.5"
                    >
                      <Check size={14} />
                      <span>{editingPlan ? 'Commit Pricing Edits' : 'Save Pricing Tier'}</span>
                    </button>
                  </form>

                  {/* List pricing tiers Table */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <table className="w-full text-left font-sans text-xs">
                      <thead className="bg-[#F8F9FA] dark:bg-slate-950 text-slate-400 font-mono">
                        <tr>
                          <th className="p-4">NAME</th>
                          <th className="p-4">PRICE</th>
                          <th className="p-4">INTERVAL</th>
                          <th className="p-4">BEST-SELLER</th>
                          <th className="p-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plans.map(p => (
                          <tr key={p.id} className="border-t border-slate-100 dark:border-slate-800">
                            <td className="p-4 font-bold text-slate-900 dark:text-white">{p.name}</td>
                            <td className="p-4 font-mono font-bold text-brand-teal">{p.price}</td>
                            <td className="p-4 text-slate-400">{p.billing}</td>
                            <td className="p-4">
                              {p.popular === 1 ? (
                                <span className="bg-brand-teal/15 text-brand-teal px-2 py-0.5 rounded text-[10px] font-mono">POPULAR</span>
                              ) : (
                                <span className="text-slate-450">-</span>
                              )}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button 
                                onClick={() => {
                                  setEditingPlan(p);
                                  setPlanForm({
                                    id: p.id,
                                    name: p.name,
                                    price: p.price,
                                    billing: p.billing || 'per month',
                                    featuresText: p.features.join('\n'),
                                    popular: p.popular === 1
                                  });
                                }}
                                className="p-1.5 hover:text-brand-teal transition-colors"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                onClick={() => deletePlan(p.id!)}
                                className="p-1.5 hover:text-rose-500 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

              </div>
            )}

            {/* VIEW TAB 3: MANAGE MUSIC (Releases & Artists CRUD) */}
            {activeTab === 'music' && (
              <div className="space-y-12">
                
                {/* Manage Releases section */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">StoryShout Catalogue Releases</h2>
                      <p className="text-xs text-slate-500">Upload raw audio tracks, covers, and publish directly</p>
                    </div>
                    {editingRelease && (
                      <button 
                        onClick={() => {
                          setEditingRelease(null);
                          setReleaseForm({ title: '', artist: '', audio_url: '', cover_url: '', release_date: '', buy_url: '' });
                          setUploadStatus({});
                        }}
                        className="text-xs font-mono text-indigo-500 hover:underline"
                      >
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  <form onSubmit={submitRelease} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">
                      {editingRelease ? `Edit Release: ${editingRelease.title}` : 'Deliver New Roster Release'}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Track Title</label>
                        <input 
                          type="text" 
                          required
                          value={releaseForm.title}
                          onChange={(e) => setReleaseForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Onyeka (Remix)" 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Roster Artist(s)</label>
                        <input 
                          type="text" 
                          required
                          value={releaseForm.artist}
                          onChange={(e) => setReleaseForm(prev => ({ ...prev, artist: e.target.value }))}
                          placeholder="e.g. David Ogbodu" 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Release Date</label>
                        <input 
                          type="text" 
                          value={releaseForm.release_date || ''}
                          onChange={(e) => setReleaseForm(prev => ({ ...prev, release_date: e.target.value }))}
                          placeholder="e.g. 2026-06-18" 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Audio File upload */}
                      <div className="space-y-1.5 p-4 bg-[#F8F9FA] dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex justify-between select-none">
                          <span>MP3 Audio Track Reference</span>
                          <span className="text-brand-teal">{uploadStatus.audio_url === 'uploading' ? 'Uploading...' : uploadStatus.audio_url === 'completed' ? 'Uploaded' : ''}</span>
                        </label>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="text" 
                            required
                            readOnly
                            value={releaseForm.audio_url}
                            placeholder="Upload MP3 file..."
                            className="bg-white dark:bg-slate-900 p-2 border border-slate-250 dark:border-slate-700/60 rounded text-xs select-all outline-none flex-grow"
                          />
                          <label className="p-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded cursor-pointer transition-all flex items-center space-x-1 shrink-0 text-slate-700 dark:text-white">
                            <Upload size={14} />
                            <input 
                              type="file" 
                              accept="audio/mp3, audio/mpeg" 
                              onChange={(e) => handleFileUpload(e, 'audio_url', setReleaseForm)}
                              className="hidden" 
                            />
                          </label>
                        </div>
                      </div>

                      {/* Cover Photo upload */}
                      <div className="space-y-1.5 p-4 bg-[#F8F9FA] dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex justify-between select-none">
                          <span>Cover Art Image Reference</span>
                          <span className="text-brand-teal">{uploadStatus.cover_url === 'uploading' ? 'Uploading...' : uploadStatus.cover_url === 'completed' ? 'Uploaded' : ''}</span>
                        </label>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="text" 
                            required
                            readOnly
                            value={releaseForm.cover_url}
                            placeholder="Upload image file..."
                            className="bg-white dark:bg-slate-900 p-2 border border-slate-250 dark:border-slate-700/60 rounded text-xs select-all outline-none flex-grow"
                          />
                          <label className="p-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded cursor-pointer transition-all flex items-center space-x-1 shrink-0 text-slate-700 dark:text-white">
                            <Upload size={14} />
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileUpload(e, 'cover_url', setReleaseForm)}
                              className="hidden" 
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Purchase/External Stream URL link</label>
                      <input 
                        type="url" 
                        value={releaseForm.buy_url || ''}
                        onChange={(e) => setReleaseForm(prev => ({ ...prev, buy_url: e.target.value }))}
                        placeholder="e.g. https://spotify.com..." 
                        className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="bg-brand-navy hover:bg-[#151722] dark:bg-brand-teal dark:hover:bg-brand-teal-light text-white dark:text-slate-950 font-bold px-4 py-2 text-xs rounded-xl transition-all inline-flex items-center space-x-1.5"
                    >
                      <Check size={14} />
                      <span>{editingRelease ? 'Commit Release' : 'Publish Catalogue Release'}</span>
                    </button>
                  </form>

                  {/* List Releases in table */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <table className="w-full text-left font-sans text-xs">
                      <thead className="bg-[#F8F9FA] dark:bg-slate-950 text-slate-400 font-mono">
                        <tr>
                          <th className="p-4">COVER</th>
                          <th className="p-4">TRACK NAME</th>
                          <th className="p-4">ARTIST</th>
                          <th className="p-4">RELEASE DATE</th>
                          <th className="p-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {releases.map(r => (
                          <tr key={r.id} className="border-t border-slate-100 dark:border-slate-800">
                            <td className="p-4">
                              <img src={r.cover_url} className="w-9 h-9 rounded object-cover border" alt="Cover" />
                            </td>
                            <td className="p-4 font-bold text-slate-900 dark:text-white">{r.title}</td>
                            <td className="p-4">{r.artist}</td>
                            <td className="p-4 font-mono">{r.release_date}</td>
                            <td className="p-4 text-right space-x-2">
                              <a href={r.audio_url} target="_blank" rel="noreferrer" className="p-1 text-slate-400 hover:text-brand-teal transition-colors" title="Listen Track">
                                <Play size={12} className="inline" />
                              </a>
                              <button 
                                onClick={() => {
                                  setEditingRelease(r);
                                  setReleaseForm(r);
                                }}
                                className="p-1.5 hover:text-brand-teal transition-colors"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                onClick={() => deleteRelease(r.id!)}
                                className="p-1.5 hover:text-rose-500 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Manage Artists section */}
                <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Active Roster Artists</h2>
                      <p className="text-xs text-slate-500">Manage directory bios and image galleries</p>
                    </div>
                    {editingArtist && (
                      <button 
                        onClick={() => {
                          setEditingArtist(null);
                          setArtistForm({ name: '', bio: '', image_url: '', genre: '', featured: 0 });
                          setUploadStatus({});
                        }}
                        className="text-xs font-mono text-indigo-500 hover:underline"
                      >
                        Cancel Editing
                      </button>
                    )}
                  </div>

                  {/* Add / Edit Form */}
                  <form onSubmit={submitArtist} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4">
                    <h3 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200">
                      {editingArtist ? `Edit Artist: ${editingArtist.name}` : 'Introduce Roster Artist'}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Artist/Band Name</label>
                        <input 
                          type="text" 
                          required
                          value={artistForm.name}
                          onChange={(e) => setArtistForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. David Ogbodu" 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Style Genre</label>
                        <input 
                          type="text" 
                          required
                          value={artistForm.genre}
                          onChange={(e) => setArtistForm(prev => ({ ...prev, genre: e.target.value }))}
                          placeholder="e.g. Alternative Afrobeat" 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1 flex items-center pt-5">
                        <label className="flex items-center space-x-2 text-xs font-medium cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            checked={artistForm.featured === 1}
                            onChange={(e) => setArtistForm(prev => ({ ...prev, featured: e.target.checked ? 1 : 0 }))}
                            className="accent-brand-gold"
                          />
                          <span>Highlight as Featured Artist</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Bio input (2 columns) */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Short Bio story</label>
                        <input 
                          type="text" 
                          required
                          value={artistForm.bio}
                          onChange={(e) => setArtistForm(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Specify brief story details..." 
                          className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg text-xs font-sans text-slate-900 dark:text-white"
                        />
                      </div>

                      {/* Image Upload container */}
                      <div className="space-y-1.5 p-3.5 bg-[#F8F9FA] dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl">
                        <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex justify-between select-none">
                          <span>Avatar Profile Image</span>
                          <span className="text-brand-teal">{uploadStatus.image_url === 'uploading' ? 'Uploading...' : uploadStatus.image_url === 'completed' ? 'Uploaded' : ''}</span>
                        </label>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="text" 
                            required
                            readOnly
                            value={artistForm.image_url}
                            placeholder="Upload JPG/PNG..."
                            className="bg-white dark:bg-slate-900 p-1.5 border border-slate-250 dark:border-slate-700/60 rounded text-[11px] select-all outline-none flex-grow"
                          />
                          <label className="p-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded cursor-pointer transition-all flex items-center space-x-1 shrink-0 text-slate-700 dark:text-white">
                            <Upload size={12} />
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileUpload(e, 'image_url', setArtistForm)}
                              className="hidden" 
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="bg-brand-navy hover:bg-[#151722] dark:bg-brand-teal dark:hover:bg-brand-teal-light text-white dark:text-slate-950 font-bold px-4 py-2 text-xs rounded-xl transition-all inline-flex items-center space-x-1.5"
                    >
                      <Check size={14} />
                      <span>{editingArtist ? 'Commit Profile' : 'Acknowledge Artist roster'}</span>
                    </button>
                  </form>

                  {/* List Artists in table */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <table className="w-full text-left font-sans text-xs">
                      <thead className="bg-[#F8F9FA] dark:bg-slate-950 text-slate-400 font-mono">
                        <tr>
                          <th className="p-4">IMAGE</th>
                          <th className="p-4">NAME</th>
                          <th className="p-4">GENRE</th>
                          <th className="p-4">HIGHLIGHTED</th>
                          <th className="p-4 text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {artists.map(a => (
                          <tr key={a.id} className="border-t border-slate-100 dark:border-slate-800">
                            <td className="p-4">
                              <img src={a.image_url} className="w-9 h-9 rounded object-cover border" alt="Avatar" />
                            </td>
                            <td className="p-4 font-bold text-slate-900 dark:text-white">{a.name}</td>
                            <td className="p-4 font-mono text-brand-teal text-[11px]">{a.genre}</td>
                            <td className="p-4">
                              {a.featured === 1 ? (
                                <span className="bg-brand-gold/15 text-brand-gold px-2 py-0.5 rounded text-[10px] font-mono">FEATURED</span>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button 
                                onClick={() => {
                                  setEditingArtist(a);
                                  setArtistForm(a);
                                }}
                                className="p-1.5 hover:text-brand-teal transition-colors"
                              >
                                <Edit size={14} />
                              </button>
                              <button 
                                onClick={() => deleteArtist(a.id!)}
                                className="p-1.5 hover:text-rose-500 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

              </div>
            )}

            {/* VIEW TAB 4: CONTACT MESSAGES */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Contact Submissions Queue</h2>
                    <p className="text-xs text-slate-500 text-slate-450 mt-0.5">Read or manage client queries</p>
                  </div>
                  
                  {/* Search and Filters bar */}
                  <div className="flex gap-2 text-xs">
                    <div className="relative">
                      <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search queries..."
                        className="bg-white dark:bg-slate-900 p-2 pl-9 border dark:border-slate-800 rounded-lg outline-none w-48 text-slate-900 dark:text-white"
                      />
                    </div>
                    <select 
                      value={filterOption}
                      onChange={(e) => setFilterOption(e.target.value)}
                      className="bg-white dark:bg-slate-900 p-2 border dark:border-slate-800 rounded-lg outline-none cursor-pointer text-slate-900 dark:text-white"
                    >
                      <option value="all">View All Status</option>
                      <option value="Unread">Queue: Unread</option>
                      <option value="Read">Queue: Read</option>
                    </select>
                  </div>
                </div>

                {/* Submissions Grid cards */}
                <div className="space-y-4">
                  {filteredMessages.length === 0 ? (
                    <div className="p-12 text-center bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-3xl text-slate-450">
                      <Mail size={32} className="mx-auto text-slate-400/60 mb-2" />
                      <span className="text-sm">Empty inbox queue. No inquiries correspond with descriptors.</span>
                    </div>
                  ) : (
                    filteredMessages.map(m => (
                      <div 
                        key={m.id}
                        className={`p-6 rounded-2xl border transition-all ${
                          m.status === 'Unread' 
                            ? 'bg-white dark:bg-slate-900 border-l-4 border-l-brand-teal border-slate-100 dark:border-slate-800 shadow-sm' 
                            : 'bg-slate-50 dark:bg-slate-900/45 border-slate-100 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">{m.name}</h4>
                              <span className="text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-300 px-2 py-0.5 rounded">
                                {m.subject}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-mono mt-0.5">{m.email} • {new Date(m.created_at).toLocaleString()}</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => toggleMessageStatus(m.id, m.status)}
                              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-lg border transition-all ${
                                m.status === 'Unread' 
                                  ? 'border-brand-teal text-brand-teal hover:bg-brand-teal/5' 
                                  : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-350'
                              }`}
                            >
                              {m.status === 'Unread' ? 'Mark Read' : 'Mark Unread'}
                            </button>
                            <button 
                              onClick={() => deleteMessage(m.id)}
                              className="p-1.5 border border-transparent rounded-lg hover:border-rose-500 hover:bg-rose-500/5 text-slate-400 hover:text-rose-500 transition-all"
                              title="Delete Submission"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/50 p-4 rounded-xl leading-relaxed whitespace-pre-wrap font-sans border border-slate-100/40 dark:border-slate-800/40">
                          {m.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

            {/* VIEW TAB 5: ACCESS SETTINGS (Password Update) */}
            {activeTab === 'settings' && (
              <div className="max-w-md space-y-6">
                <div>
                  <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">Credentials Security Settings</h2>
                  <p className="text-xs text-slate-500">Modify master system credentials to seal access</p>
                </div>

                <form onSubmit={updatePassword} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Current Secret Password</label>
                    <input 
                      type="password" 
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="e.g. StoryShout2026!" 
                      className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-3 rounded-xl text-xs outline-none text-slate-905 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Brand New Password</label>
                    <input 
                      type="password" 
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Specify a robust passphrase..." 
                      className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-3 rounded-xl text-xs outline-none text-slate-905 dark:text-white"
                    />
                    <span className="block text-[10px] text-slate-400 font-mono">Minimum 8 characters with numbers & specials recommended.</span>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-brand-navy hover:bg-[#151722] dark:bg-brand-teal dark:hover:bg-brand-teal-light text-white dark:text-slate-950 font-bold p-3 rounded-xl transition-all font-mono text-xs uppercase"
                  >
                    Seal New Master Password
                  </button>
                </form>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
