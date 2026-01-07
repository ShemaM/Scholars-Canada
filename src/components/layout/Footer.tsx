import Link from 'next/link';
import { Mail, Shield, GraduationCap, Users, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer 
      className="text-white pt-12 pb-8 mt-auto font-sans"
      style={{ backgroundColor: 'var(--color-msnc-navy, #0E4977)' }}
    >
      <div className="container mx-auto px-4">
        
        {/* Mission Statement */}
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <p className="text-lg italic leading-relaxed font-serif" style={{ color: 'var(--color-msnc-sky, #99C7F1)' }}>
            Mulenge Scholars&apos; Network Canada is dedicated to supporting and uplifting Mulenge youth 
            through mentorship, academic guidance, and leadership development.
          </p>
        </div>

        {/* Streamlined Navigation Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b pb-12"
          style={{ borderColor: 'var(--color-msnc-steel, #658CA9)' }}
        >
          
          {/* Column 1: Programs */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-[11px] text-white tracking-[0.2em] mb-4">
              <BookOpen className="h-4 w-4" style={{ color: 'var(--color-msnc-yellow, #F7D116)' }} />
              Programs
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <li><Link href="/programs" className="transition-colors hover:text-white" style={{ color: 'var(--color-msnc-sky, #99C7F1)' }}>Academic Support</Link></li>
              <li><Link href="/programs" className="transition-colors hover:text-white" style={{ color: 'var(--color-msnc-sky, #99C7F1)' }}>Mentorship</Link></li>
              <li><Link href="/programs" className="transition-colors hover:text-white" style={{ color: 'var(--color-msnc-sky, #99C7F1)' }}>Career Development</Link></li>
              <li><Link href="/programs" className="transition-colors hover:text-white" style={{ color: 'var(--color-msnc-sky, #99C7F1)' }}>Leadership Training</Link></li>
              <li><Link href="/resources" className="transition-colors hover:text-white" style={{ color: 'var(--color-msnc-sky, #99C7F1)' }}>Resources</Link></li>
              <li><Link href="/events" className="font-bold transition-colors hover:text-white" style={{ color: 'var(--color-msnc-yellow, #F7D116)' }}>Events</Link></li>
            </ul>
          </div>

          {/* Column 2: About MSNC */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-[11px] text-white tracking-[0.2em] mb-4">
              <Users className="h-4 w-4" style={{ color: 'var(--color-msnc-yellow, #F7D116)' }} />
              About Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/mission" className="transition-colors hover:text-white" style={{ color: 'var(--color-msnc-sky, #99C7F1)' }}>Our Mission & Vision</Link></li>
              <li><Link href="/team" className="transition-colors hover:text-white" style={{ color: 'var(--color-msnc-sky, #99C7F1)' }}>Leadership Team</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-white" style={{ color: 'var(--color-msnc-sky, #99C7F1)' }}>Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-[11px] text-white tracking-[0.2em] mb-4">
              <Mail className="h-4 w-4" style={{ color: 'var(--color-msnc-yellow, #F7D116)' }} />
              Stay Connected
            </h4>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-msnc-sky, #99C7F1)' }}>
              Join our network to receive updates on events, programs, and opportunities for Mulenge youth.
            </p>
            <Link 
              href="/subscribe" 
              className="inline-block px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded transition-all shadow-md hover:opacity-90"
              style={{ 
                backgroundColor: 'var(--color-msnc-yellow, #F7D116)', 
                color: 'var(--color-msnc-navy, #0E4977)' 
              }}
            >
              Join MSNC
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] font-medium" style={{ color: 'var(--color-msnc-steel, #658CA9)' }}>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" style={{ color: 'var(--color-msnc-yellow, #F7D116)' }} />
            <p>&copy; {new Date().getFullYear()} Mulenge Scholars&apos; Network Canada. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white flex items-center gap-1 transition-colors">
              <Shield className="h-3.5 w-3.5" />
              <span>Privacy Policy</span>
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}