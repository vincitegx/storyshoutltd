import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, HeartPulse, Send, Award, Compass, Music, Server, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12 md:py-24 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-20">
        <div className="md:col-span-8 space-y-4">
          <span className="text-xs bg-brand-teal/10 text-brand-teal border border-brand-teal/20 px-3 py-1 rounded-full font-mono font-bold uppercase tracking-widest">
            Corporate Profile
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-slate-900 dark:text-white leading-none tracking-tight">
            Code That Speaks.<br />
            <span className="text-brand-teal">Sound That Moves.</span>
          </h1>
        </div>
        <div className="md:col-span-4 md:pt-14">
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light border-l-2 border-brand-teal pl-4">
            StoryShout Limited coordinates raw human creative energy and precise technology parameters to establish frictionless media systems.
          </p>
        </div>
      </div>

      {/* Picture Frame / Story Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative rounded-3xl overflow-hidden aspect-4/3 border border-slate-200 dark:border-slate-800 shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80" 
            alt="Collaborative workspace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover dark:brightness-90 duration-500 hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 p-8 text-white z-10 space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-brand-teal uppercase">Collaborative Core</span>
            <p className="font-display font-bold text-lg select-none">Lekki HQ Laboratory, Lagos</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">Our Hybrid Genesis</h2>
            <p className="text-xs font-mono text-brand-teal uppercase tracking-widest">Bridging software and art</p>
          </div>
          
          <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
            StoryShout Limited was established in Lagos, Nigeria as a hybrid collective of software engineers, database admins, and multi-instrumental sound designers. Founded by veteran developer and alternative Afro-genre producer **David Ogbodu**, the firm is built on a fundamental principle: engineering logic is merely creative composition written with syntax.
          </p>

          <p className="text-slate-600 dark:text-slate-355 text-sm leading-relaxed">
            While standard agencies choose simple niches, we have designed an operation that represents software reliability and raw musical talent with equal excellence. We operate our flagship product—the **StoryShout Campaign Management System (SaaS)**—delivering tens of thousands of WhatsApp and SMS template broadcasts for some of the region&rsquo;s most agile startups, while reinvesting profits directly into state-of-the-art recording, production, mixing, and global distribution of our roster artists on **StoryShout Records**.
          </p>
        </div>
      </div>

      {/* Founder Spotlight Block */}
      <div className="p-8 md:p-14 bg-white dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-3xl mb-24 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4 shrink-0 max-w-sm mx-auto md:mx-0">
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-brand-gold/30 shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=450&auto=format&fit=crop&q=80" 
                alt="David Ogbodu" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-brand-gold text-slate-950 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">
                FOUNDER
              </div>
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white">David Ogbodu</h3>
            <p className="text-brand-gold text-xs font-mono uppercase tracking-widest">Founder, Lead Architect & Recording Artist</p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              &quot;As a software engineer, I found that building campaign logic and scaling WhatsApp channels was fundamentally similar to layering synthesizers, drum structures, and guitar leads. StoryShout Limited is my vision for a company that does not force creatives to shut down their logical brain, nor forces code professionals to compress their musical souls.&quot;
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                Lagos Creative Pioneer • DM: david@storyshoutltd.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Values grid */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="font-display font-bold text-2.5xl text-slate-900 dark:text-white">Values That Guide Our Output</h2>
          <p className="text-xs text-slate-500 font-mono mt-1">Our core operational standards are uncompromised</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="text-brand-teal"><Server size={28} /></div>
            <h4 className="font-display font-bold text-slate-950 dark:text-white">Technical Integrity</h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              We do not take shortcuts when building system architectures: SQL schema validations, clean JWT authentication routines, and full telemetry tracking are paramount.
            </p>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="text-brand-gold"><Music size={28} /></div>
            <h4 className="font-display font-bold text-slate-950 dark:text-white">Music Autonomy</h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              We believe label relationships should empower, not restrict. We construct clear, simple split ledger agreements where the artist retains ownership.
            </p>
          </div>

          <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="text-[#38ef7d]"><Sparkles size={28} /></div>
            <h4 className="font-display font-bold text-slate-950 dark:text-white">Operational Transparency</h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              No hidden fees, no opaque algorithms. We communicate clearly with software enterprise accounts and label musicians alike.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
