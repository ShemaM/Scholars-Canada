import Link from 'next/link';
import { GraduationCap, Users, BookOpen, Target, Heart, Handshake, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const objectives = [
    {
      icon: BookOpen,
      title: "Academic Support",
      description: "Providing academic mentorship, tutoring, and guidance for secondary and post-secondary students."
    },
    {
      icon: Target,
      title: "Career Development",
      description: "Supporting youth in exploring career pathways through mentorship, skills development, and networking."
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "Cultivating confident, responsible, and community-minded leaders through training and involvement."
    },
    {
      icon: Heart,
      title: "Community Empowerment",
      description: "Strengthening unity within the Mulenge community through dialogue and collaboration."
    },
    {
      icon: GraduationCap,
      title: "Cultural Identity",
      description: "Preserving and promoting Mulenge cultural identity while supporting integration into Canadian society."
    },
    {
      icon: Handshake,
      title: "Partnerships",
      description: "Building partnerships with schools, organizations, and institutions that align with our goals."
    }
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="h-8 w-8 text-amber-400" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black mb-6 leading-tight">
              Mulenge Scholars&apos; Network Canada
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Empowering Mulenge youth through mentorship, academic guidance, and leadership development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/subscribe" 
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Join Our Network
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                href="/mission" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full text-lg transition-all backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-blue-700 font-bold uppercase tracking-widest text-sm mb-4 block">Our Vision</span>
            <p className="text-2xl md:text-3xl font-serif text-slate-800 leading-relaxed italic">
              &quot;To build a united and empowered community where Mulenge youth discover their potential, 
              thrive academically and professionally, and grow into leaders who contribute meaningfully to society.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-700 font-bold uppercase tracking-widest text-sm mb-4 block">What We Do</span>
            <h2 className="text-4xl font-serif font-black text-slate-900 mb-4">Our Objectives</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We are committed to supporting Mulenge youth across multiple dimensions of their development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {objectives.map((objective, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 group"
              >
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-700 transition-colors">
                  <objective.icon className="h-6 w-6 text-blue-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{objective.title}</h3>
                <p className="text-slate-600 leading-relaxed">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-4 block">Our Mission</span>
            <p className="text-xl md:text-2xl leading-relaxed text-blue-100">
              To support and uplift Mulenge youth in Canada and around the world through mentorship, 
              academic guidance, and leadership development, while fostering partnerships with organizations 
              that share common goals of education, empowerment, and community advancement.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-black text-slate-900 mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a student seeking guidance, a professional wanting to mentor, 
              or someone looking to support our community, there&apos;s a place for you at MSNC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/subscribe" 
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full text-lg transition-all shadow-lg"
              >
                Become a Member
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 border-2 border-slate-300 hover:border-blue-700 text-slate-700 hover:text-blue-700 font-bold px-8 py-4 rounded-full text-lg transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}