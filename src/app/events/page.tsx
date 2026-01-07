import { Calendar, MapPin, Clock, Users, Video, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Event } from '@/lib/definitions';

export const revalidate = 60;

// Sample events for display when database is empty
const sampleEvents: Event[] = [
  {
    id: 1,
    title: "Academic Success Workshop: Navigating Canadian Universities",
    slug: "academic-success-workshop",
    description: "Learn strategies for succeeding in Canadian post-secondary education, including study tips, resource navigation, and academic planning.",
    content: "",
    image_url: null,
    event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    event_time: "2:00 PM - 4:00 PM EST",
    location: "Community Center, Toronto",
    is_virtual: false,
    virtual_link: null,
    registration_url: null,
    max_attendees: 50,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Career Networking Night",
    slug: "career-networking-night",
    description: "Connect with professionals from various industries and learn about career opportunities in Canada.",
    content: "",
    image_url: null,
    event_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    event_time: "6:00 PM - 8:00 PM EST",
    location: "Online",
    is_virtual: true,
    virtual_link: "https://zoom.us",
    registration_url: null,
    max_attendees: 100,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Leadership Development Seminar",
    slug: "leadership-seminar",
    description: "Develop essential leadership skills through interactive workshops and group activities.",
    content: "",
    image_url: null,
    event_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    event_time: "10:00 AM - 3:00 PM EST",
    location: "University of Toronto, St. George Campus",
    is_virtual: false,
    virtual_link: null,
    registration_url: null,
    max_attendees: 30,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default async function EventsPage() {
  // Fetch events from database
  const { data: dbEvents } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .order('event_date', { ascending: true });

  const events = dbEvents && dbEvents.length > 0 ? dbEvents : sampleEvents;
  
  // Separate into upcoming and past events
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter((e: Event) => e.event_date >= today);
  const pastEvents = events.filter((e: Event) => e.event_date < today);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-4 block">Events</span>
            <h1 className="text-5xl md:text-6xl font-black font-serif mb-6">Upcoming Events</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join us for workshops, networking sessions, and community gatherings designed to support your growth.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black font-serif text-slate-900 mb-12">Upcoming Events</h2>
            
            {upcomingEvents.length > 0 ? (
              <div className="space-y-8">
                {upcomingEvents.map((event: Event) => (
                  <div 
                    key={event.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 group"
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Date Badge */}
                      <div className="lg:w-48 bg-blue-700 text-white p-6 flex flex-col items-center justify-center text-center">
                        <span className="text-5xl font-black">
                          {new Date(event.event_date).getDate()}
                        </span>
                        <span className="text-lg font-bold uppercase tracking-widest">
                          {new Date(event.event_date).toLocaleDateString('en-CA', { month: 'short' })}
                        </span>
                        <span className="text-blue-200 text-sm">
                          {new Date(event.event_date).getFullYear()}
                        </span>
                      </div>
                      
                      {/* Event Details */}
                      <div className="flex-1 p-8">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          {event.is_virtual ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                              <Video className="h-3 w-3" /> Virtual Event
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                              <Users className="h-3 w-3" /> In-Person
                            </span>
                          )}
                          {event.max_attendees && (
                            <span className="text-slate-500 text-sm">
                              {event.max_attendees} spots available
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">{event.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6">
                          {event.event_time && (
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-700" />
                              {event.event_time}
                            </span>
                          )}
                          <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-blue-700" />
                            {event.is_virtual ? 'Online' : event.location}
                          </span>
                        </div>
                        
                        <Link 
                          href="/contact"
                          className="inline-flex items-center gap-2 bg-blue-700 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-800 transition-colors"
                        >
                          Register Now <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Upcoming Events</h3>
                <p className="text-slate-600 mb-6">Check back soon for new events, or subscribe to stay updated.</p>
                <Link 
                  href="/subscribe"
                  className="inline-flex items-center gap-2 bg-blue-700 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-800 transition-colors"
                >
                  Get Notified
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-black font-serif text-slate-900 mb-12">Past Events</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event: Event) => (
                  <div 
                    key={event.id}
                    className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
                  >
                    <span className="text-slate-500 text-sm font-bold mb-2 block">
                      {new Date(event.event_date).toLocaleDateString('en-CA', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{event.title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black font-serif mb-6">Never Miss an Event</h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter to receive updates on upcoming events, programs, and opportunities.
            </p>
            <Link 
              href="/subscribe" 
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-4 rounded-full text-lg transition-all"
            >
              Subscribe for Updates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
