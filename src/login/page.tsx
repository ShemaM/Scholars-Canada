'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, AlertCircle, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { mockUser } from '@/lib/mockdata';

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Input validation
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail || !password) {
      setErrorMsg('Please enter both email and password.');
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Password minimum length check
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      // Mock authentication - accept any valid email/password for demo
      if (trimmedEmail === mockUser.email || trimmedEmail.endsWith('@msncanada.org')) {
        // Simulate successful login
        router.refresh(); 
        router.push('/admin');
      } else {
        throw new Error('Invalid credentials. Try admin@msncanada.org');
      }

    } catch (error: unknown) {
      if (error instanceof Error && error.message) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg(String(error) || 'Invalid login credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <div className="text-center">
          <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-7 w-7 text-blue-700" />
          </div>
          <h2 className="text-3xl font-black font-serif text-slate-900">Admin Sign In</h2>
          <p className="mt-2 text-sm text-slate-600">
            MSNC Administration Portal
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm font-bold">
            <AlertCircle size={16} />
            {errorMsg}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email"
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                placeholder="admin@msncanada.org" 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password"
                autoComplete="current-password"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                placeholder="Enter your password" 
              />
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="animate-spin h-4 w-4" />}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}