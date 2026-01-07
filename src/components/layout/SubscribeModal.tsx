'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { X, GraduationCap, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )
  );
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      // Try to insert into members table first, fall back to subscribers
      const { error } = await supabase
        .from('members')
        .insert([{ 
          email,
          first_name: firstName || null,
          membership_type: 'supporter',
          is_active: true,
        }]);

      if (error) {
        // If members table doesn't exist, try subscribers table
        if (error.code === '42P01') {
          const { error: subError } = await supabase
            .from('subscribers')
            .insert([{ email }]);
          
          if (subError) {
            if (subError.code === '23505') {
              throw new Error('You are already registered!');
            }
            throw subError;
          }
        } else if (error.code === '23505') {
          throw new Error('You are already registered!');
        } else {
          throw error;
        }
      }

      setStatus('success');
      setEmail('');
      setFirstName('');
      
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);

    } catch (err: unknown) {
      setStatus('error');
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Something went wrong. Try again.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={24} />
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">Join MSNC</h2>
          <p className="text-slate-500 mt-2">
            Become part of Mulenge Scholars&apos; Network Canada and access programs, events, and resources.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="text-green-500 mb-2 flex justify-center"><CheckCircle size={48} /></div>
            <h3 className="text-xl font-bold text-slate-900">Welcome to MSNC!</h3>
            <p className="text-slate-500">Thank you for joining our community.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div>
                <label htmlFor="modal-first-name" className="sr-only">First Name</label>
                <input
                  id="modal-first-name"
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  disabled={status === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="modal-email" className="sr-only">Email Address</label>
                <input
                  id="modal-email"
                  type="email"
                  placeholder="Email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  disabled={status === 'loading'}
                  required
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Processing...' : 'Join Now'}
              </button>
              
              <p className="text-xs text-center text-slate-400 mt-4">
                We respect your privacy. No spam, ever.
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-center text-sm text-slate-600 mb-3">
                Want to learn more about membership options?
              </p>
              <Link 
                href="/subscribe"
                onClick={onClose}
                className="flex items-center justify-center gap-2 text-blue-700 font-bold text-sm hover:text-blue-800 transition-colors"
              >
                View Full Membership Page <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}