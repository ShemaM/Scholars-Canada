'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { 
  LayoutDashboard, 
  PenTool, 
  FileText, 
  Settings, 
  LogOut, 
  Loader2,
  Calendar,
  Users,
  BookOpen,
  FolderOpen,
  GraduationCap
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  ));
  const [loading, setLoading] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Announcements', href: '/admin/create', icon: <PenTool size={20} /> },
    { name: 'All Posts', href: '/admin/posts', icon: <FileText size={20} /> },
    { name: 'Events', href: '/admin/events', icon: <Calendar size={20} /> },
    { name: 'Programs', href: '/admin/programs', icon: <BookOpen size={20} /> },
    { name: 'Resources', href: '/admin/resources', icon: <FolderOpen size={20} /> },
    { name: 'Members', href: '/admin/members', icon: <Users size={20} /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      router.refresh();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Error signing out');
      setLoading(false);
    }
  };

  return (
    <aside className="w-64 bg-blue-900 text-blue-100 flex flex-col h-screen fixed left-0 top-0 border-r border-blue-800">
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-amber-500 rounded-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-blue-900" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white font-serif tracking-tight">
              MSNC
            </h2>
            <p className="text-xs text-blue-300">Admin Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-bold text-sm ${
                isActive 
                  ? 'bg-amber-500 text-blue-900 shadow-lg' 
                  : 'hover:bg-blue-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-800">
        <button 
          onClick={handleSignOut}
          disabled={loading}
          className="flex items-center gap-3 px-4 py-3 text-blue-300 hover:text-red-400 w-full transition-colors text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
          {loading ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>
    </aside>
  );
}