import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Mail, MapPin, Building, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [campaignPlan, setCampaignPlan] = useState('');
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  // Prefill fields based on search parameters
  useEffect(() => {
    const rawSubject = searchParams.get('subject');
    const rawPlan = searchParams.get('plan');

    if (rawSubject) {
      setFormData((prev) => ({ ...prev, subject: rawSubject }));
    }
    if (rawPlan) {
      setCampaignPlan(rawPlan);
      setFormData((prev) => ({ 
        ...prev, 
        message: `Hello StoryShout team, I am interested in seeking information regarding the "${rawPlan}" SaaS pricing tier.` 
      }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please specify your name, email, and input message parameters.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Synchronizing message with Lagos database node...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'Your message has been logged in our system. David Ogbodu or a solutions engineer will touch base shortly.',
        });
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          message: '',
        });
        setCampaignPlan('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Connection pipeline timed out. Please retry.' });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: 'Failed to connect with backend server nodes. Please check server connections.' });
    }
  };

  return (
    <div className="py-12 md:py-20 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Editorial Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-mono font-bold bg-[#45A29E]/10 text-brand-teal px-3 py-1 rounded-full uppercase tracking-widest border border-brand-teal/20">
          Reach Our Desk
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
          How can we help?
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Submit software requests, artist rosters inquiry, or administrative briefs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
        
        {/* Contact Info Frame (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 border border-brand-teal/20 flex flex-col justify-between shadow-xl relative overflow-hidden min-h-[380px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(69,162,158,0.1),transparent)] pointer-events-none" />
          
          <div className="space-y-8 relative z-10">
            <h3 className="font-display font-bold text-2xl text-white">Lagos Head Office</h3>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              We coordinate our engineering cycles and audio development reviews in our dedicated Lekki creative center.
            </p>

            <div className="space-y-5 text-sm font-sans text-slate-350">
              <div className="flex items-start space-x-3.5">
                <MapPin size={18} className="text-brand-teal shrink-0 mt-0.5" />
                <span>Lekki Phase I, Lagos, Nigeria.</span>
              </div>
              <div className="flex items-start space-x-3.5">
                <Mail size={18} className="text-brand-teal shrink-0 mt-0.5" />
                <span className="hover:underline hover:text-brand-teal cursor-pointer">contact@storyshoutltd.com</span>
              </div>
              <div className="flex items-start space-x-3.5">
                <Building size={18} className="text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white text-xs uppercase tracking-wider">StoryShout Limited</p>
                  <p className="text-xs text-slate-400">RC: 1987542-NIG</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 relative z-10 mt-6 md:mt-0">
            <div className="text-xs text-slate-400 font-mono">
              OFFICE HOURS <br />
              <span className="text-white">Monday - Friday</span> 9AM - 5PM WAT
            </div>
          </div>
        </div>

        {/* Input Form Frame (7 cols) */}
        <form onSubmit={handleFormSubmit} className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white mb-2">Send a Secure Message</h3>
          
          <AnimatePresence mode="wait">
            {status.type === 'success' && (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-start space-x-3 text-xs"
              >
                <CheckCircle size={16} className="shrink-0 mt-0.5 text-emerald-500" />
                <span>{status.message}</span>
              </motion.div>
            )}

            {status.type === 'error' && (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 rounded-xl flex items-start space-x-3 text-xs"
              >
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-500" />
                <span>{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
              <input 
                id="contact-name"
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g. Kola Alabi"
                className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl focus:border-brand-teal transition-all text-sm outline-none text-slate-900 dark:text-white"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <input 
                id="contact-email"
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="e.g. kolalabi@company.com"
                className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl focus:border-brand-teal transition-all text-sm outline-none text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Subject Dropdown */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Subject Category</label>
            <select 
              id="contact-subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl focus:border-brand-teal transition-all text-sm outline-none text-slate-900 dark:text-white cursor-pointer"
            >
              <option value="General Inquiry">General Company Inquiry</option>
              <option value="Software Inquiry">StoryShout SaaS (Software Demo/Sign-up)</option>
              <option value="Music Inquiry">StoryShout Records (Audio submissions/roster)</option>
            </select>
          </div>

          {campaignPlan && (
            <div className="p-3 bg-brand-teal/5 border border-brand-teal/20 text-brand-teal text-xs font-mono rounded-lg flex justify-between items-center">
              <span>ACTIVE INQUIRY PLAN:</span>
              <span className="font-bold font-sans uppercase">{campaignPlan}</span>
            </div>
          )}

          {/* Message Textarea */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Your Message</label>
            <textarea 
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="State details regarding your campaign scope, budget, timeline, or music audio link parameters here..."
              className="w-full bg-[#F8F9FA] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl focus:border-brand-teal transition-all text-sm outline-none text-slate-900 dark:text-white resize-none"
            />
          </div>

          {/* Submit */}
          <button 
            id="contact-submit"
            type="submit" 
            disabled={status.type === 'loading'}
            className="w-full bg-brand-teal hover:bg-brand-teal-light disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold p-3.5 rounded-xl transition-all shadow hover:shadow-brand-teal/10 flex items-center justify-center space-x-2"
          >
            {status.type === 'loading' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900"></div>
                <span>Securing Connections...</span>
              </>
            ) : (
              <>
                <span>Secure-Submit Query</span>
                <Send size={15} />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
