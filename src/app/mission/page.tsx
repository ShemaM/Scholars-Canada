import { GraduationCap, Target, Users, BookOpen, Heart, Handshake, Globe, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function MissionPage() {
  const objectives = [
    {
      icon: BookOpen,
      title: "Academic Support and Excellence",
      description: "To provide academic mentorship, tutoring, and guidance for secondary and post-secondary students, particularly those in Grades 11 and 12 and beyond, helping them succeed in their studies and make informed educational decisions."
    },
    {
      icon: Target,
      title: "Career and Professional Development",
      description: "To support youth in exploring career pathways through mentorship, skills development, networking opportunities, and guidance on credential upgrading, scholarships, and post-secondary transitions."
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "To cultivate confident, responsible, and community-minded leaders by offering leadership training, committee involvement, and opportunities for youth to take active roles in planning and decision-making."
    },
    {
      icon: Heart,
      title: "Community Empowerment and Engagement",
      description: "To strengthen unity within the Mulenge community by creating safe spaces for dialogue, collaboration, and collective problem-solving that address shared challenges and aspirations."
    },
    {
      icon: GraduationCap,
      title: "Cultural Identity and Belonging",
      description: "To preserve and promote Mulenge cultural identity while supporting successful integration into Canadian society, helping youth maintain pride in their heritage as they pursue personal and professional growth."
    },
    {
      icon: Handshake,
      title: "Partnerships and Collaboration",
      description: "To establish and maintain partnerships with schools, community organizations, professionals, and institutions that align with MSNC's goals of education, empowerment, and community advancement."
    },
    {
      icon: TrendingUp,
      title: "Sustainable Network Growth",
      description: "To build a strong, transparent, and well-governed organization with effective leadership structures, clear communication, and responsible financial management to ensure long-term impact."
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-4 block">About Us</span>
            <h1 className="text-5xl md:text-6xl font-black font-serif mb-6">Our Mission & Vision</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Learn about our commitment to empowering Mulenge youth in Canada through education, mentorship, and community building.
            </p>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Globe className="h-6 w-6 text-blue-700" />
              </div>
              <h2 className="text-3xl font-black font-serif text-slate-900">Our Background</h2>
            </div>
            <div className="prose prose-lg prose-slate max-w-none font-serif">
              <p className="text-lg leading-relaxed text-slate-600">
                Mulenge Scholars&apos; Network Canada (MSNC) was established in response to the growing academic, 
                professional, and social needs of youth from the Mulenge community living in Canada. As members 
                of a diaspora community, many Mulenge youth encounter complex challenges while adapting to a new 
                country, including navigating unfamiliar education systems, upgrading foreign credentials, 
                overcoming language and cultural barriers, and accessing reliable mentorship and career guidance.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Despite strong aspirations and talents, these barriers often limit access to opportunities and 
                slow academic or professional advancement. Recognizing this gap, a group of young Mulenge leaders 
                came together with a shared vision to create a structured, supportive network that would unite 
                Mulenge youth and empower them through education, collaboration, and leadership development.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                MSNC was therefore formed as a community-driven initiative to provide a platform where youth can 
                learn from one another, access mentorship, build academic and professional skills, and strengthen 
                their sense of identity and belonging. By fostering a culture of mutual support and excellence, 
                MSNC aims to promote long-term success for Mulenge youth while preserving cultural values, 
                strengthening community connections, and encouraging positive contributions to Canadian society and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-4 block">Our Vision</span>
            <p className="text-2xl md:text-4xl font-serif leading-relaxed italic">
              &quot;To build a united and empowered community where Mulenge youth discover their potential, 
              thrive academically and professionally, and grow into leaders who contribute meaningfully to society.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-blue-700 font-bold uppercase tracking-widest text-sm mb-4 block">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-black font-serif text-slate-900 mb-8">What Drives Us</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              To support and uplift Mulenge youth in Canada and around the world through mentorship, 
              academic guidance, and leadership development, while fostering partnerships with organizations 
              that share common goals of education, empowerment, and community advancement.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-700 font-bold uppercase tracking-widest text-sm mb-4 block">Our Objectives</span>
            <h2 className="text-4xl font-black font-serif text-slate-900 mb-4">What We Aim to Achieve</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our comprehensive approach addresses the multifaceted needs of Mulenge youth.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {objectives.map((objective, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-slate-100"
              >
                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                    <objective.icon className="h-7 w-7 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {index + 1}. {objective.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{objective.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black font-serif mb-6">Join Our Mission</h2>
            <p className="text-xl text-blue-100 mb-8">
              Be part of a growing network dedicated to empowering Mulenge youth. 
              Together, we can make a lasting difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/subscribe" 
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-4 rounded-full text-lg transition-all"
              >
                Become a Member
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-full text-lg transition-all backdrop-blur-sm"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}