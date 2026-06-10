import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, Music, Disc, 
  ExternalLink, Calendar, Send, Star, Radio, BookOpen, Headset 
} from 'lucide-react';
import { MusicRelease, Artist } from '../types';

export default function MusicPage() {
  const [releases, setReleases] = useState<MusicRelease[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<MusicRelease | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [relRes, artRes] = await Promise.all([
          fetch('/api/music/releases'),
          fetch('/api/music/artists')
        ]);
        
        if (relRes.ok) {
          const relData = await relRes.json();
          setReleases(relData);
          if (relData.length > 0) {
            // Set first track as default player track
            setCurrentTrack(relData[0]);
          }
        }
        if (artRes.ok) {
          const artData = await artRes.json();
          setArtists(artData);
        }
      } catch (err) {
        console.error('Failed to fetch music content, using fallbacks:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Handle Play/Pause event
  const togglePlay = () => {
    if (!currentTrack || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio play request failed:', err);
      });
    }
  };

  // Play a specific release track from list
  const selectTrack = (release: MusicRelease) => {
    setCurrentTrack(release);
    setIsPlaying(false); // Reset while loading
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.warn('Audio play request failed on selection:', err);
        });
      }
    }, 100);
  };

  // Skip tracks forward/backward
  const skipTrack = (direction: 'next' | 'prev') => {
    if (!currentTrack || releases.length <= 1) return;
    const currentIndex = releases.findIndex(r => r.id === currentTrack.id);
    let nextIndex = currentIndex;

    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % releases.length;
    } else {
      nextIndex = (currentIndex - 1 + releases.length) % releases.length;
    }
    selectTrack(releases[nextIndex]);
  };

  // Update timestamps
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    skipTrack('next');
  };

  // Seek bar click
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  // Volume slider
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="py-12 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Head */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs bg-brand-gold/10 border border-brand-gold/30 px-3.5 py-1.5 rounded-full text-brand-gold font-mono uppercase tracking-widest font-bold">
            Record Label & Sound Agency
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 dark:text-white leading-tight">
            StoryShout Records
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Independent sound, uncompromised fidelity. Amplifying Lagos and West African alternative narratives globally.
          </p>
        </div>

        {/* Dynamic Studio Audio Player and Album listings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          
          {/* Cover/Player Card (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-slate-900 border border-brand-gold/20 rounded-2xl text-white shadow-2xl relative overflow-hidden min-h-[460px]">
            <div className="absolute top-0 right-0 p-8 text-brand-gold/5 pointer-events-none">
              <Disc size={200} className="animate-spin duration-10000" />
            </div>

            {currentTrack ? (
              <div className="relative z-10 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-brand-gold font-mono text-xs uppercase tracking-widest mb-4">
                    <Radio size={14} className="animate-pulse" />
                    <span>Now Streaming</span>
                  </div>

                  <div className="grid grid-cols-12 gap-4 items-center mb-6">
                    <div className="col-span-4 select-none">
                      <img 
                        src={currentTrack.cover_url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300"} 
                        alt={currentTrack.title} 
                        referrerPolicy="no-referrer"
                        className="w-full aspect-square rounded-lg object-cover border border-brand-gold/30 shadow"
                      />
                    </div>
                    <div className="col-span-8">
                      <h3 className="font-display font-bold text-lg text-white truncate">{currentTrack.title}</h3>
                      <p className="text-slate-400 text-xs truncate mt-0.5">{currentTrack.artist}</p>
                      {currentTrack.release_date && (
                        <p className="text-slate-500 font-mono text-[10px] mt-2 flex items-center space-x-1">
                          <Calendar size={10} />
                          <span>Released: {currentTrack.release_date}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Audio Engine element */}
                <audio 
                  ref={audioRef}
                  src={currentTrack.audio_url}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={handleAudioEnded}
                />

                {/* Progress Controls */}
                <div className="space-y-4">
                  {/* Timeline slider */}
                  <div className="space-y-1">
                    <input 
                      type="range"
                      min={0}
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeekChange}
                      className="w-full accent-brand-gold bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
                    />
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Player controls */}
                  <div className="flex justify-between items-center bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    {/* Previous Button */}
                    <button 
                      onClick={() => skipTrack('prev')}
                      className="p-1.5 text-slate-400 hover:text-white transition-colors"
                      title="Previous Track"
                    >
                      <SkipBack size={18} />
                    </button>
                    
                    {/* Play/Pause Button */}
                    <button 
                      onClick={togglePlay}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-gold hover:bg-amber-400 text-slate-950 transition-all font-black"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-1" fill="currentColor" />}
                    </button>

                    {/* Next Button */}
                    <button 
                      onClick={() => skipTrack('next')}
                      className="p-1.5 text-slate-400 hover:text-white transition-colors"
                      title="Next Track"
                    >
                      <SkipForward size={18} />
                    </button>

                    <div className="h-4 w-px bg-slate-800" />

                    {/* Volume Dial */}
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Volume2 size={16} />
                      <input 
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 accent-brand-gold bg-slate-800 rounded-lg appearance-none h-1 cursor-pointer"
                      />
                    </div>
                  </div>

                  {currentTrack.buy_url && (
                    <a 
                      href={currentTrack.buy_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center space-x-2 w-full py-3 border border-brand-gold/30 hover:border-brand-gold hover:bg-brand-gold/5 bg-slate-950/45 text-brand-gold rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all"
                    >
                      <span>Get Release Offline / Stream</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow text-slate-500">
                <Music size={40} className="animate-pulse" />
                <p className="text-xs font-mono mt-2">No release selected.</p>
              </div>
            )}
          </div>

          {/* Release List (7 columns) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Latest Catalog Releases
            </h3>
            
            {loading ? (
              <div className="space-y-3 py-10">
                <div className="h-10 bg-slate-200 dark:bg-slate-800 animate-pulse rounded"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-800 animate-pulse rounded"></div>
                <div className="h-10 bg-slate-200 dark:bg-slate-800 animate-pulse rounded"></div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-[460px] overflow-y-auto pr-2 space-y-3">
                {releases.map((r, index) => {
                  const isActive = currentTrack?.id === r.id;
                  return (
                    <div 
                      key={r.id || index}
                      onClick={() => selectTrack(r)}
                      className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all ${
                        isActive 
                          ? 'bg-brand-gold/10 border-brand-gold/30 text-brand-gold' 
                          : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-4 min-w-0">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800">
                          <img 
                            src={r.cover_url || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100"} 
                            alt={r.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          {isActive && isPlaying && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <span className="flex space-x-0.5 items-end h-3">
                                <span className="w-0.5 h-2 bg-brand-gold animate-bounce"></span>
                                <span className="w-0.5 h-3 bg-brand-gold animate-bounce delay-100"></span>
                                <span className="w-0.5 h-1 px-[1px] bg-brand-gold animate-bounce delay-200"></span>
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-display font-bold text-sm truncate">{r.title}</h4>
                          <p className="text-xs text-slate-400 truncate font-sans">{r.artist}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-xs">
                        {isActive && isPlaying ? (
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#F3A738]">Streaming</span>
                        ) : (
                          <div className={`p-2 rounded-full border transition-transform ${
                            isActive 
                              ? 'border-brand-gold/30 bg-brand-gold text-slate-950' 
                              : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:scale-105'
                          }`}>
                            <Play size={10} fill={isActive && !isPlaying ? "currentColor" : "none"} />
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

        {/* Featured Artists section */}
        <div id="artists" className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display font-bold text-3xl text-slate-900 dark:text-white">
              The Roster
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Meet our boundary-pushing creators synthesizing local Afro-cultures and global engineering parameters.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {artists.map((a, index) => (
                <div 
                  key={a.id || index}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-center md:items-start"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <img 
                      src={a.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"} 
                      alt={a.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-3 text-center md:text-left">
                    <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                      <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">{a.name}</h3>
                      {a.featured === 1 && (
                        <span className="flex items-center text-[9px] font-mono bg-brand-gold/10 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded-full uppercase">
                          <Star size={8} className="mr-1 fill-brand-gold" /> Featured
                        </span>
                      )}
                    </div>
                    <span className="block text-xs font-mono text-brand-teal uppercase tracking-wider">{a.genre}</span>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Studio Services */}
        <div id="services" className="mb-24 py-16 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Studio Services & Publishing Guild
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              We leverage our system assets, modern acoustics setups, and transparent distribution conduits to assist other labels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Disc size={24} />, title: "Production & Composition", text: "State of the art analogue hybrid vocal booths & synth setups in Lagos supervised by Grammy-adjacent audio engineers." },
              { icon: <Headset size={24} />, title: "Alternative Mixing & Dolby", text: "Specialized post-production mixing tuned to match high-density mobile streams, standard headphones & car acoustics." },
              { icon: <Radio size={24} />, title: "Global Aggregated Publishing", text: "Pushing raw WAV and metadata parameters to Apple, Spotify, Audiomack, and Amazon with transparent, real-time split ledgers." },
              { icon: <BookOpen size={24} />, title: "Creative Branding & Mentoring", text: "Providing solid legal advice, campaign coordination, and sound engineering blueprints to independent African talent." }
            ].map((s, idx) => (
              <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center space-y-4">
                <div className="inline-flex p-3 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                  {s.icon}
                </div>
                <h4 className="font-display font-bold text-slate-950 dark:text-white text-base">{s.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Submitting Music Pitch */}
        <div className="p-8 md:p-12 bg-gradient-to-r from-[#0C0E14] via-brand-navy to-[#0C0E14] border border-brand-gold/20 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(243,167,56,0.06),transparent)]" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Are you a sound creator with an alternative wave?
            </h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              We are constantly seeking daring, independent vocalists, engineers, and producers to coordinate with. Submit your Spotify link, cassette link, or drive demo directly to our review desk.
            </p>
            <div className="pt-4 animate-bounce">
              <button 
                onClick={() => navigate('/contact?subject=Music%20Inquiry')}
                className="bg-brand-gold hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-xl transition-all shadow-xl hover:shadow-brand-gold/10 inline-flex items-center space-x-2"
              >
                <span>Submit Your Demo For Review</span>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
