import Link from 'next/link';
import { Mail, Shield, GraduationCap, Users, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 border-t border-gray-300 pt-12 pb-8 mt-auto font-sans">
      <div className="container mx-auto px-4">
        
        {/* Mission Statement */}
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 italic leading-relaxed font-serif">
            Mulenge Scholars&apos; Network Canada is dedicated to supporting and uplifting Mulenge youth 
            through mentorship, academic guidance, and leadership development.
          </p>
        </div>

        {/* Streamlined Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-gray-200 pb-12">
          
          {/* Column 1: Programs */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-[11px] text-gray-900 tracking-[0.2em] mb-4">
              <BookOpen className="h-4 w-4 text-blue-700" />
              Programs
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <li><Link href="/programs" className="text-gray-600 hover:text-blue-700 transition-colors">Academic Support</Link></li>
              <li><Link href="/programs" className="text-gray-600 hover:text-blue-700 transition-colors">Mentorship</Link></li>
              <li><Link href="/programs" className="text-gray-600 hover:text-blue-700 transition-colors">Career Development</Link></li>
              <li><Link href="/programs" className="text-gray-600 hover:text-blue-700 transition-colors">Leadership Training</Link></li>
              <li><Link href="/resources" className="text-gray-600 hover:text-blue-700 transition-colors">Resources</Link></li>
              <li><Link href="/events" className="text-blue-700 font-bold hover:text-blue-600 transition-colors">Events</Link></li>
            </ul>
          </div>

          {/* Column 2: About MSNC */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-[11px] text-gray-900 tracking-[0.2em] mb-4">
              <Users className="h-4 w-4 text-blue-700" />
              About Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/mission" className="text-gray-600 hover:text-blue-700 transition-colors">Our Mission & Vision</Link></li>
              <li><Link href="/team" className="text-gray-600 hover:text-blue-700 transition-colors">Leadership Team</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-700 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="flex items-center gap-2 font-bold uppercase text-[11px] text-gray-900 tracking-[0.2em] mb-4">
              <Mail className="h-4 w-4 text-blue-700" />
              Stay Connected
            </h4>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Join our network to receive updates on events, programs, and opportunities for Mulenge youth.
            </p>
            <Link href="/subscribe" className="inline-block px-5 py-2.5 bg-blue-700 text-white text-[11px] font-bold uppercase tracking-widest rounded hover:bg-blue-800 transition-all shadow-md">
              Join MSNC
            </Link>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-blue-700" />
            <p>&copy; {new Date().getFullYear()} Mulenge Scholars&apos; Network Canada. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-blue-700 flex items-center gap-1">
              <Shield className="h-3.5 w-3.5" />
              <span>Privacy Policy</span>
            </Link>
            <Link href="/terms" className="hover:text-blue-700">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}