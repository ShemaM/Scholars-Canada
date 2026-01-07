'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, User, X, GraduationCap } from 'lucide-react';
import SubscribeModal from './SubscribeModal';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Navigation Links for MSNC
  const navLinks = [
    { name: 'About', href: '/mission' },
    { name: 'Programs', href: '/programs' },
    { name: 'Team', href: '/team' },
    { name: 'Resources', href: '/resources' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header 
        className="sticky top-0 z-50 w-full border-b backdrop-blur-md"
        style={{ 
          borderColor: 'var(--color-msnc-sky, #99C7F1)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          
          {/* Left: Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
              aria-label="Open Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <Link href="/" className="flex items-center gap-2">
              <div 
                className="h-8 w-8 rounded-sm flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-msnc-navy, #0E4977)' }}
              >
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold font-serif tracking-tight hidden sm:block" style={{ color: 'var(--color-msnc-navy, #0E4977)' }}>MSNC</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-600">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="transition-colors hover:opacity-80"
                style={{ color: 'var(--color-msnc-steel, #658CA9)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-msnc-royal, #097CDA)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-msnc-steel, #658CA9)'}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <div className="relative">
                {isSearchOpen ? (
                   <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-slate-300 rounded-full pl-4 pr-2 py-1 shadow-lg w-64 transition-all">
                      <input 
                        autoFocus
                        type="text" 
                        placeholder="Search..." 
                        className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 font-sans"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => !searchQuery && setIsSearchOpen(false)}
                      />
                      <button type="button" aria-label="Close search" onClick={() => setIsSearchOpen(false)} className="p-1 text-slate-400 hover:text-[var(--color-msnc-royal)]">
                        <X className="h-4 w-4" />
                      </button>
                   </form>
                ) : (
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                )}
            </div>

            <Link href="/login" className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <User className="h-5 w-5" />
            </Link>

            {/* Join Button triggers Modal */}
            <button 
              onClick={() => setIsSubscribeOpen(true)}
              className="hidden sm:block ml-2 rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--color-msnc-navy, #0E4977)' }}
            >
              Join Us
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 md:hidden animate-in slide-in-from-top-10 duration-200">
           <nav className="flex flex-col gap-6 text-xl font-black font-serif text-slate-900">
             {navLinks.map((link) => (
               <Link 
                 key={link.href} 
                 href={link.href} 
                 onClick={() => setIsMenuOpen(false)}
                 className="border-b border-slate-100 pb-2"
               >
                 {link.name}
               </Link>
             ))}
             <Link 
               href="/login" 
               onClick={() => setIsMenuOpen(false)} 
               className="pt-4"
               style={{ color: 'var(--color-msnc-royal, #097CDA)' }}
             >
               Sign In
             </Link>
           </nav>
        </div>
      )}

      {/* RENDER THE MODAL */}
      <SubscribeModal 
        isOpen={isSubscribeOpen} 
        onClose={() => setIsSubscribeOpen(false)} 
      />
    </>
  );
}