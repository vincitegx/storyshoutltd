import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import {
  Play, Pause, SkipForward, SkipBack, Volume2, Music,
  ExternalLink, Calendar, Send, Star, Radio, Disc,
  BookOpen, Headset, ArrowRight, Check,
} from 'lucide-react';
import { MusicRelease, Artist } from '../types';

const GRADIENT = 'linear-gradient(135deg, #FF5F2E 0%, #FF8A00 100%)';

const SERVICES = [
  {
    icon: <Disc size={20} />,
    title: 'Production & Composition',
    text: 'Analogue hybrid vocal booths and synth setups in Lagos, supervised by Grammy-adjacent audio engineers.',
  },
  {
    icon: <Headset size={20} />,
    title: 'Mixing & Dolby Mastering',
    text: 'Post-production mixing tuned for mobile streams, headphones, and car acoustics.',
  },
  {
    icon: <Radio size={20} />,
    title: 'Global Aggregated Publishing',
    text: 'Pushing to Apple, Spotify, Audiomack, and Amazon with transparent, real-time split ledgers.',
  },
  {
    icon: <BookOpen size={20} />,
    title: 'Creative Branding & Mentoring',
    text: 'Legal guidance, campaign coordination, and sound engineering blueprints for independent African talent.',
  },
];

export default function MusicPage() {
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [artists,  setArtists]  = useState<Artist[]>([]);
  const [loading,  setLoading]  = useState(true);

  const [currentTrack, setCurrentTrack] = useState<MusicRelease | null>(null);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [duration,     setDuration]     = useState(0);
  const [volume,       setVolume]       = useState(0.8);

  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const navigate  = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [relRes, artRes] = await Promise.all([
          fetch('/api/music/releases'),
          fetch('/api/music/artists'),
        ]);
        if (relRes.ok) {
          const relData = await relRes.json();
          setReleases(relData);
          if (relData.length > 0) setCurrentTrack(relData[0]);
        }
        if (artRes.ok) setArtists(await artRes.json());
      } catch (err) {
        console.error('Failed to fetch music content:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const togglePlay = () => {
    if (!currentTrack || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  };

  const selectTrack = (release: MusicRelease) => {
    setCurrentTrack(release);
    setIsPlaying(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
      }
    }, 100);
  };

  const skipTrack = (direction: 'next' | 'prev') => {
    if (!currentTrack || releases.length <= 1) return;
    const idx  = releases.findIndex(r => r.id === currentTrack.id);
    const next = direction === 'next'
      ? (idx + 1) % releases.length
      : (idx - 1 + releases.length) % releases.length;
    selectTrack(releases[next]);
  };

  const handleTimeUpdate      = () => { if (audioRef.current) setCurrentTime(audioRef.current.currentTime); };
  const handleLoadedMetadata  = () => { if (audioRef.current) setDuration(audioRef.current.duration); };
  const handleAudioEnded      = ()  => { setIsPlaying(false); skipTrack('next'); };
  const handleSeekChange      = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = val;
    setCurrentTime(val);
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const formatTime = (t: number) => {
    if (isNaN(t)) return '0:00';
    return `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
  };

  return (
    <>
      <Helmet>
        <title>StoryShout Records — Independent Music Label | Lagos, Nigeria</title>
        <meta name="description" content="StoryShout Records is an independent alternative music label from Lekki, Lagos. Stream releases, explore our artist roster, and submit your demo for review. West African sound, global reach." />
        <link rel="canonical" href="https://label.storyshoutltd.com/" />
        <meta property="og:url" content="https://label.storyshoutltd.com/" />
        <meta property="og:title" content="StoryShout Records — Independent Music Label | Lagos" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ── DARK HERO ── */}
      <section className="bg-[#1A0F08] text-white pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,95,46,0.08) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(255,138,0,0.04) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#FF5F2E] uppercase block mb-6">
                Record Label & Sound Agency · Lekki, Lagos
              </span>
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.04] tracking-tight">
                StoryShout<br />
                <span className="text-[#FF5F2E]">Records.</span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-[#FF5F2E]/40 pl-5">
                Independent sound, uncompromised fidelity. Amplifying Lagos and West African alternative narratives to global audiences.
              </p>
              <div className="flex flex-wrap gap-3 mt-7">
                <a
                  href="#roster"
                  className="inline-flex items-center space-x-2 text-sm font-bold text-white px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_rgba(255,95,46,0.35)]"
                  style={{ background: GRADIENT }}
                >
                  <span>Meet the Roster</span>
                  <ArrowRight size={14} />
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white border border-white/15 bg-white/6 hover:bg-white/10 px-5 py-2.5 rounded-xl transition-all"
                >
                  Submit a Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLAYER + CATALOG ── */}
      <section className="bg-[#FBF7F4] py-20 border-b border-[#EDE8E3]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-lg mb-12">
            <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              Now Streaming
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
              Latest catalog<br />releases.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Player card */}
            <div className="lg:col-span-5">
              <div className="bg-[#1A0F08] text-white rounded-2xl p-7 relative overflow-hidden h-full flex flex-col min-h-[460px]"
                style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.20)' }}>
                <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03]">
                  <Disc size={240} className="text-[#FF5F2E]" style={{ animation: 'spin 20s linear infinite' }} />
                </div>

                {currentTrack ? (
                  <div className="relative z-10 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center space-x-2 text-[#FF5F2E] text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-5">
                        <Radio size={12} className="animate-pulse" />
                        <span>Now Streaming</span>
                      </div>

                      <div className="grid grid-cols-12 gap-4 items-center mb-6">
                        <div className="col-span-4">
                          <img
                            src={currentTrack.cover_url || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300'}
                            alt={currentTrack.title}
                            referrerPolicy="no-referrer"
                            className="w-full aspect-square rounded-xl object-cover border border-white/10"
                            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
                          />
                        </div>
                        <div className="col-span-8">
                          <h3 className="font-display font-bold text-lg text-white truncate">{currentTrack.title}</h3>
                          <p className="text-slate-400 text-xs truncate mt-0.5">{currentTrack.artist}</p>
                          {currentTrack.release_date && (
                            <p className="text-slate-500 font-mono text-[10px] mt-2 flex items-center space-x-1">
                              <Calendar size={10} />
                              <span>{currentTrack.release_date}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <audio
                      ref={audioRef}
                      src={currentTrack.audio_url}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={handleAudioEnded}
                    />

                    <div className="space-y-4">
                      {/* Seek bar */}
                      <div className="space-y-1">
                        <input
                          type="range"
                          min={0}
                          max={duration || 0}
                          value={currentTime}
                          onChange={handleSeekChange}
                          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-[#2D3748]"
                          style={{ accentColor: '#FF5F2E' }}
                        />
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex justify-between items-center bg-[#0D1117] p-4 rounded-xl border border-white/6">
                        <button onClick={() => skipTrack('prev')} className="p-1.5 text-slate-400 hover:text-white transition-colors">
                          <SkipBack size={18} />
                        </button>
                        <button
                          onClick={togglePlay}
                          className="w-12 h-12 flex items-center justify-center rounded-full text-white transition-all hover:scale-105"
                          style={{ background: GRADIENT, boxShadow: '0 4px 16px rgba(255,95,46,0.4)' }}
                        >
                          {isPlaying
                            ? <Pause size={20} fill="currentColor" />
                            : <Play size={20} className="ml-0.5" fill="currentColor" />}
                        </button>
                        <button onClick={() => skipTrack('next')} className="p-1.5 text-slate-400 hover:text-white transition-colors">
                          <SkipForward size={18} />
                        </button>
                        <div className="h-4 w-px bg-white/10" />
                        <div className="flex items-center space-x-2 text-slate-400">
                          <Volume2 size={14} />
                          <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={volume}
                            onChange={handleVolumeChange}
                            className="w-16 h-1 rounded-full appearance-none cursor-pointer bg-[#2D3748]"
                            style={{ accentColor: '#FF5F2E' }}
                          />
                        </div>
                      </div>

                      {currentTrack.buy_url && (
                        <a
                          href={currentTrack.buy_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center space-x-2 w-full py-2.5 border border-[#FF5F2E]/25 hover:border-[#FF5F2E]/60 bg-[#FF5F2E]/6 hover:bg-[#FF5F2E]/10 text-[#FF8A00] rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider transition-all"
                        >
                          <span>Stream / Buy Release</span>
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center flex-1 text-slate-600 space-y-2">
                    <Music size={36} className="animate-pulse" />
                    <p className="text-xs font-mono">No release loaded.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Track list */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-[#EDE8E3] rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
                <div className="px-6 py-4 border-b border-[#EDE8E3]">
                  <h3 className="font-display font-bold text-[#1A0F08]">Catalog Releases</h3>
                </div>
                {loading ? (
                  <div className="p-8 space-y-3">
                    {[1, 2, 3].map(i => <div key={i} className="h-14 bg-[#F5F0EC] animate-pulse rounded-xl" />)}
                  </div>
                ) : releases.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 text-sm font-mono">No releases yet.</div>
                ) : (
                  <div className="divide-y divide-[#F5F0EC] max-h-[420px] overflow-y-auto">
                    {releases.map((r, idx) => {
                      const isActive = currentTrack?.id === r.id;
                      return (
                        <div
                          key={r.id || idx}
                          onClick={() => selectTrack(r)}
                          className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-colors ${
                            isActive
                              ? 'bg-[#FFF4EE]'
                              : 'hover:bg-[#FBF7F4]'
                          }`}
                        >
                          <div className="flex items-center space-x-4 min-w-0">
                            <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-[#EDE8E3]">
                              <img
                                src={r.cover_url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100'}
                                alt={r.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              {isActive && isPlaying && (
                                <div className="absolute inset-0 bg-[#1A0F08]/50 flex items-center justify-center">
                                  <span className="flex space-x-0.5 items-end h-3">
                                    <span className="w-0.5 h-2 bg-[#FF5F2E] animate-bounce" />
                                    <span className="w-0.5 h-3 bg-[#FF5F2E] animate-bounce delay-100" />
                                    <span className="w-0.5 h-1 bg-[#FF5F2E] animate-bounce delay-200" />
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className={`font-display font-bold text-sm truncate ${isActive ? 'text-[#FF5F2E]' : 'text-[#1A0F08]'}`}>
                                {r.title}
                              </h4>
                              <p className="text-xs text-slate-400 truncate mt-0.5">{r.artist}</p>
                            </div>
                          </div>
                          <div className="shrink-0 ml-4">
                            {isActive && isPlaying ? (
                              <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-wider">Playing</span>
                            ) : (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                                isActive
                                  ? 'border-[#FF5F2E]/30 bg-[#FF5F2E] text-white'
                                  : 'border-[#EDE8E3] text-slate-300 hover:border-[#FF5F2E]/30 hover:text-[#FF5F2E]'
                              }`}>
                                <Play size={10} fill="currentColor" className="ml-0.5" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTIST ROSTER ── */}
      <section id="roster" className="scroll-mt-24 bg-white py-24 md:py-32 border-t border-[#EDE8E3]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-lg mb-14">
            <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              Artist Roster
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
              The voices<br />behind the sound.
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#FF5F2E] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {artists.map((a, idx) => (
                <motion.div
                  key={a.id || idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 2) * 0.08 }}
                  className="bg-[#FBF7F4] border border-[#EDE8E3] rounded-2xl p-7 flex items-start space-x-6"
                  style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-[#EDE8E3] shrink-0">
                    <img
                      src={a.image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'}
                      alt={a.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <h3 className="font-display font-bold text-xl text-[#1A0F08]">{a.name}</h3>
                      {a.featured === 1 && (
                        <span
                          className="text-[8px] font-mono font-bold text-white uppercase tracking-[0.15em] px-2 py-0.5 rounded-full inline-flex items-center space-x-1"
                          style={{ background: GRADIENT }}
                        >
                          <Star size={7} className="fill-white" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>
                    <span className="block text-[9px] font-mono font-bold tracking-[0.18em] uppercase text-[#FF5F2E]">{a.genre}</span>
                    <p className="text-slate-500 text-sm leading-relaxed">{a.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── STUDIO SERVICES ── */}
      <section id="services" className="bg-[#FBF7F4] border-t border-[#EDE8E3] py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-lg mb-14">
            <span className="text-[9px] font-mono font-bold text-[#FF5F2E] uppercase tracking-[0.2em] block mb-3">
              Studio Services
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#1A0F08] leading-tight">
              What we<br />bring to the studio.
            </h2>
            <p className="text-slate-500 text-sm mt-4 leading-relaxed">
              We leverage system assets, modern acoustics, and transparent distribution to serve independent labels and artists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                className="bg-white border border-[#EDE8E3] rounded-2xl p-8 flex items-start space-x-5"
                style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF4EE] text-[#FF5F2E] border border-[#FF5F2E]/15 flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-[#1A0F08]">{s.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO SUBMISSION CTA ── */}
      <section id="demo" className="scroll-mt-24 bg-[#1A0F08] py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,95,46,0.07) 0%, transparent 65%)' }} />
        <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center space-y-8">
          <div className="space-y-5">
            <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#FF5F2E] uppercase block">
              Demo Submissions
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-tight">
              Are you a sound creator<br />
              <span className="text-[#FF5F2E]">with an alternative wave?</span>
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              We are constantly seeking daring, independent vocalists, engineers, and producers. Submit your Spotify link, SoundCloud, or drive demo to our review desk.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-lg mx-auto">
            {[
              'All genres considered',
              'Response within 5 business days',
              'No label lock-in required',
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs text-slate-400">
                <Check size={12} className="text-[#FF5F2E] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/contact?subject=Music%20Inquiry')}
            className="inline-flex items-center space-x-2 text-white font-bold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-all shadow-[0_4px_20px_rgba(255,95,46,0.4)]"
            style={{ background: GRADIENT }}
          >
            <span>Submit Your Demo for Review</span>
            <Send size={16} />
          </button>
        </div>
      </section>
    </>
  );
}
