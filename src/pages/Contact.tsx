import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Send, Mail, MapPin, Building } from 'lucide-react';
import { useToast } from '../components/Toast';

const GRADIENT = 'linear-gradient(135deg, #FF5F2E 0%, #FF8A00 100%)';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [selectedPlan, setSelectedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const rawSubject = searchParams.get('subject');
    const rawPlan    = searchParams.get('plan');
    if (rawSubject) setFormData(prev => ({ ...prev, subject: rawSubject }));
    if (rawPlan) {
      setSelectedPlan(rawPlan);
      setFormData(prev => ({
        ...prev,
        message: `Hi StoryShout team, I'm interested in the "${rawPlan}" plan and would like to learn more.`,
      }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('error', 'Please fill in your name, email, and message.');
      return;
    }
    setIsLoading(true);
    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        showToast('success', "Message sent! We'll be in touch within one business day.");
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        setSelectedPlan('');
      } else {
        showToast('error', data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      showToast('error', 'Could not reach the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact StoryShout — Request a Demo or Join the Waitlist</title>
        <meta name="description" content="Get in touch with StoryShout. Request a live demo, join the beta waitlist, ask about pricing, or explore enterprise and partnership opportunities. Based in Lekki, Lagos." />
        <link rel="canonical" href="https://storyshoutltd.com/contact" />
        <meta property="og:url" content="https://storyshoutltd.com/contact" />
        <meta property="og:title" content="Contact StoryShout — Request a Demo or Join the Waitlist" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ── DARK EDITORIAL HEADER ── */}
      <section className="bg-[#1A0F08] text-white pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,95,46,0.07) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <span className="text-[9px] font-mono font-bold tracking-[0.22em] text-[#FF5F2E] uppercase block mb-6">
                Get In Touch
              </span>
              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-[1.04] tracking-tight">
                Let's build<br />
                <span className="text-[#FF5F2E]">something together.</span>
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-[#FF5F2E]/40 pl-5">
                Demo requests, pricing inquiries, partnership opportunities, and beta onboarding. We review every inquiry within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section className="bg-[#FBF7F4] py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Info panel */}
            <div className="lg:col-span-5">
              <div className="bg-[#1A0F08] text-white rounded-2xl p-8 relative overflow-hidden" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at bottom right, rgba(255,95,46,0.10), transparent 65%)' }} />
                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">StoryShout Limited</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Based in Lekki, Lagos. We respond within one business day.
                    </p>
                  </div>

                  <div className="space-y-5 text-sm">
                    <div className="flex items-start space-x-3.5">
                      <MapPin size={17} className="text-[#FF5F2E] shrink-0 mt-0.5" />
                      <span className="text-slate-300">Lekki Phase I, Lagos, Nigeria</span>
                    </div>
                    <div className="flex items-start space-x-3.5">
                      <Mail size={17} className="text-[#FF5F2E] shrink-0 mt-0.5" />
                      <a href="mailto:infos@storyshoutltd.com" className="text-slate-300 hover:text-[#FF5F2E] transition-colors">
                        infos@storyshoutltd.com
                      </a>
                    </div>
                    <div className="flex items-start space-x-3.5">
                      <Building size={17} className="text-[#FF5F2E] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white text-xs uppercase tracking-wider">StoryShout Limited</p>
                        <p className="text-xs text-slate-400 mt-0.5">RC: 9591364</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#1F2937]">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em]">Office Hours</p>
                    <p className="text-sm text-white mt-1">Monday – Friday, 9AM – 5PM WAT</p>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="mt-5 bg-white border border-[#EDE8E3] rounded-2xl p-6 space-y-3" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-[0.18em]">Common Subjects</p>
                {[
                  { label: 'Request a Demo', value: 'Demo Request' },
                  { label: 'Join the Beta Waitlist', value: 'Join Waitlist' },
                  { label: 'Partnership / Integration', value: 'Partnership' },
                  { label: 'Enterprise Onboarding', value: 'Enterprise' },
                ].map(link => (
                  <button
                    key={link.value}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, subject: link.value }))}
                    className={`block w-full text-left text-sm px-3 py-2.5 rounded-xl transition-colors border ${
                      formData.subject === link.value
                        ? 'bg-[#FFF4EE] text-[#FF5F2E] border-[#FF5F2E]/20 font-bold'
                        : 'text-slate-600 border-transparent hover:bg-[#FBF7F4]'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleFormSubmit}
              className="lg:col-span-7 bg-white border border-[#EDE8E3] rounded-2xl p-8 space-y-5"
              style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}
            >
              <div>
                <h3 className="font-display font-bold text-xl text-[#1A0F08]">Send a Message</h3>
                <p className="text-sm text-slate-400 mt-1">We'll reply to your email — usually same or next business day.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.15em]">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Kola Alabi"
                    className="w-full bg-[#FBF7F4] border border-[#EDE8E3] p-3 rounded-xl focus:border-[#FF5F2E] focus:outline-none transition-colors text-sm text-[#1A0F08] placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.15em]">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. kola@company.com"
                    className="w-full bg-[#FBF7F4] border border-[#EDE8E3] p-3 rounded-xl focus:border-[#FF5F2E] focus:outline-none transition-colors text-sm text-[#1A0F08] placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.15em]">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-[#FBF7F4] border border-[#EDE8E3] p-3 rounded-xl focus:border-[#FF5F2E] focus:outline-none transition-colors text-sm text-[#1A0F08] cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Demo Request">Request a Demo</option>
                  <option value="Join Waitlist">Join the Waitlist</option>
                  <option value="Pricing Inquiry">Pricing Inquiry</option>
                  <option value="Partnership">Partnership / Integration</option>
                  <option value="Enterprise">Enterprise Onboarding</option>
                  <option value="Support">Technical Support</option>
                </select>
              </div>

              {selectedPlan && (
                <div className="p-3 bg-[#FFF4EE] border border-[#FF5F2E]/20 rounded-xl flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500 uppercase tracking-wider">Selected Plan</span>
                  <span className="font-bold text-[#FF5F2E] uppercase">{selectedPlan}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.15em]">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your use case, team size, or what you'd like to see in a demo..."
                  className="w-full bg-[#FBF7F4] border border-[#EDE8E3] p-3 rounded-xl focus:border-[#FF5F2E] focus:outline-none transition-colors text-sm text-[#1A0F08] resize-none placeholder:text-slate-300 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white font-bold p-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,95,46,0.35)] hover:shadow-[0_6px_20px_rgba(255,95,46,0.45)] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ background: GRADIENT }}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
