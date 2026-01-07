import { Mail, Linkedin, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getTeamMembers } from '@/lib/actions';
import { TeamMember } from '@/lib/definitions';

export const revalidate = 60;

// Default team members for display when database is empty
const defaultTeamMembers = [
  {
    id: 1,
    name: "Leadership Position",
    role: "President",
    bio: "Leading MSNC's mission to empower Mulenge youth through education and community building.",
    image_url: null,
    email: null,
    linkedin_url: null,
    initials: "LP",
  },
  {
    id: 2,
    name: "Leadership Position",
    role: "Vice President",
    bio: "Supporting organizational initiatives and coordinating program development.",
    image_url: null,
    email: null,
    linkedin_url: null,
    initials: "VP",
  },
  {
    id: 3,
    name: "Leadership Position",
    role: "Academic Coordinator",
    bio: "Overseeing academic mentorship programs and educational resources.",
    image_url: null,
    email: null,
    linkedin_url: null,
    initials: "AC",
  },
  {
    id: 4,
    name: "Leadership Position",
    role: "Events Coordinator",
    bio: "Planning and organizing community events, workshops, and networking sessions.",
    image_url: null,
    email: null,
    linkedin_url: null,
    initials: "EC",
  },
  {
    id: 5,
    name: "Leadership Position",
    role: "Communications Lead",
    bio: "Managing communications, social media, and community outreach.",
    image_url: null,
    email: null,
    linkedin_url: null,
    initials: "CL",
  },
  {
    id: 6,
    name: "Leadership Position",
    role: "Membership Coordinator",
    bio: "Welcoming new members and ensuring an engaging member experience.",
    image_url: null,
    email: null,
    linkedin_url: null,
    initials: "MC",
  },
];

export default async function TeamPage() {
  // Fetch team members from database
  const dbTeamMembers = await getTeamMembers();
  const teamMembers = dbTeamMembers && dbTeamMembers.length > 0 ? dbTeamMembers : defaultTeamMembers;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-4 block">Our Team</span>
            <h1 className="text-5xl md:text-6xl font-black font-serif mb-6">Leadership Team</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Meet the dedicated individuals working to empower Mulenge youth across Canada.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member: TeamMember | typeof defaultTeamMembers[0]) => {
              const initials = 'initials' in member 
                ? member.initials 
                : member.name.split(' ').map(n => n[0]).join('').toUpperCase();
              
              return (
                <div 
                  key={member.id} 
                  className="bg-white p-8 rounded-2xl text-center border border-slate-100 hover:shadow-lg transition-all group"
                >
                  {member.image_url ? (
                    <div className="h-28 w-28 rounded-full overflow-hidden mx-auto mb-6 border-4 border-slate-100 relative">
                      <Image 
                        src={member.image_url} 
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                  ) : (
                    <div className="h-28 w-28 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black text-blue-700 font-serif group-hover:from-blue-700 group-hover:to-blue-600 group-hover:text-white transition-all">
                      {initials}
                    </div>
                  )}
                  <h3 className="text-xl font-bold font-serif text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-4">{member.role}</p>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-4">
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all"
                        title="Email"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a 
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-all"
                        title="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join the Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="h-8 w-8 text-blue-700" />
            </div>
            <h2 className="text-4xl font-black font-serif text-slate-900 mb-6">Join Our Team</h2>
            <p className="text-xl text-slate-600 mb-8">
              Interested in making a difference? We&apos;re always looking for passionate individuals 
              to help us empower Mulenge youth. Volunteer opportunities are available in various roles.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full text-lg transition-all"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Advisory Board (Placeholder) */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-blue-700 font-bold uppercase tracking-widest text-sm mb-4 block">Coming Soon</span>
            <h2 className="text-3xl font-black font-serif text-slate-900 mb-6">Advisory Board</h2>
            <p className="text-lg text-slate-600">
              We are in the process of establishing an advisory board of professionals and community leaders 
              who will provide strategic guidance to help MSNC achieve its mission.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}