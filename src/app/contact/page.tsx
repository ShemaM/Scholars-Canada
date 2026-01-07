'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactForm } from '@/lib/actions';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const result = await submitContactForm(formData);
      
      if (result.error) {
        setStatus('error');
        setErrorMessage(result.error);
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-4 block">Contact</span>
            <h1 className="text-5xl md:text-6xl font-black font-serif mb-6">Get in Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Have questions about our programs, want to volunteer, or interested in partnering with us? 
              We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-black font-serif text-slate-900 mb-8">Contact Information</h2>
              <p className="text-lg text-slate-600 mb-10">
                Reach out to us with any questions, suggestions, or if you&apos;re interested in 
                getting involved with MSNC. We aim to respond to all inquiries within 48 hours.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Email Us</h3>
                    <p className="text-slate-600">info@msncanada.org</p>
                    <p className="text-slate-500 text-sm mt-1">For general inquiries and information</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Call Us</h3>
                    <p className="text-slate-600">+1 (XXX) XXX-XXXX</p>
                    <p className="text-slate-500 text-sm mt-1">Available during business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Location</h3>
                    <p className="text-slate-600">
                      Greater Toronto Area<br />
                      Ontario, Canada
                    </p>
                    <p className="text-slate-500 text-sm mt-1">Events held at various locations</p>
                  </div>
                </div>
              </div>

              {/* Social/Additional Info */}
              <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-slate-900 mb-3">Want to Partner with Us?</h3>
                <p className="text-slate-600 text-sm">
                  We welcome partnerships with schools, community organizations, businesses, and 
                  professionals who share our commitment to empowering youth through education.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-black font-serif text-slate-900 mb-6">Send us a Message</h2>
              
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      placeholder="Your name" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                      placeholder="your@email.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subject *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="programs">Programs & Events</option>
                      <option value="membership">Membership</option>
                      <option value="volunteer">Volunteer Opportunities</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Message *</label>
                    <textarea 
                      rows={5} 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" 
                      placeholder="How can we help you?"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-4 rounded-xl">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-blue-700 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}