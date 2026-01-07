'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { 
  getPosts,
  getMembers,
  mockEvents,
  mockPrograms,
} from '@/lib/mockdata';
import { 
  TrendingUp, Users, Calendar, 
  FileText, BookOpen, ArrowUpRight, ArrowDownRight,
  GraduationCap
} from 'lucide-react';


export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalMembers: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalPrograms: 0,
  });

  useEffect(() => {
    // Use mock data
    const posts = getPosts();
    const members = getMembers();
    const events = mockEvents.filter(e => e.is_published);
    const programs = mockPrograms.filter(p => p.is_active);

    const today = new Date().toISOString().split('T')[0];

    setStats({
      totalPosts: posts.length,
      publishedPosts: posts.filter(p => p.is_published).length,
      totalMembers: members.length,
      totalEvents: events.length,
      upcomingEvents: events.filter(e => e.event_date >= today).length,
      totalPrograms: programs.length,
    });
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen pl-72">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 font-serif">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium">Mulenge Scholars&apos; Network Canada</p>
          </div>
        </div>
      </header>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Total Members" 
          value={stats.totalMembers} 
          trend="+12%" 
          isPositive={true} 
          icon={<Users />} 
          color="blue"
        />
        <KPICard 
          title="Upcoming Events" 
          value={stats.upcomingEvents} 
          trend={`${stats.totalEvents} total`}
          isPositive={true} 
          icon={<Calendar />} 
          color="green"
        />
        <KPICard 
          title="Active Programs" 
          value={stats.totalPrograms} 
          trend="Active" 
          isPositive={true} 
          icon={<BookOpen />} 
          color="purple"
        />
        <KPICard 
          title="Announcements" 
          value={stats.publishedPosts} 
          trend={`${stats.totalPosts} total`}
          isPositive={true} 
          icon={<FileText />} 
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* QUICK ACTIONS */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-700" /> Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction href="/admin/create" label="New Announcement" icon={<FileText />} />
            <QuickAction href="/admin/events" label="Manage Events" icon={<Calendar />} />
            <QuickAction href="/admin/programs" label="Edit Programs" icon={<BookOpen />} />
            <QuickAction href="/admin/members" label="View Members" icon={<Users />} />
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div className="bg-blue-900 text-white p-6 rounded-xl shadow-lg">
          <h3 className="font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-amber-400" /> System Status
          </h3>
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-blue-800 rounded-lg border-l-4 border-emerald-500">
              <p className="font-bold text-emerald-400">Database Connected</p>
              <p className="text-blue-300 text-xs">All systems operational</p>
            </div>
            <div className="p-3 bg-blue-800 rounded-lg border-l-4 border-amber-500">
              <p className="font-bold text-amber-400">Content Status</p>
              <p className="text-blue-300 text-xs">{stats.publishedPosts} published announcements</p>
            </div>
            <div className="p-3 bg-blue-800 rounded-lg border-l-4 border-blue-400">
              <p className="font-bold text-blue-300">Membership</p>
              <p className="text-blue-300 text-xs">{stats.totalMembers} active members</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, isPositive, icon, color }: { 
  title: string; 
  value: string | number; 
  trend: string; 
  isPositive: boolean; 
  icon: ReactNode;
  color: 'blue' | 'green' | 'purple' | 'amber';
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          {typeof trend === 'string' && (trend.startsWith('+') || trend.startsWith('-')) ? (
            <>
              {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {trend}
            </>
          ) : (
            <span className="text-slate-500">{trend}</span>
          )}
        </div>
      </div>
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{title}</h3>
      <p className="text-3xl font-black text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function QuickAction({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a 
      href={href}
      className="flex flex-col items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all border border-slate-100 hover:border-blue-200 group"
    >
      <div className="text-slate-400 group-hover:text-blue-700 transition-colors">
        {icon}
      </div>
      <span className="text-xs font-bold text-center">{label}</span>
    </a>
  );
}