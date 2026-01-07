import { BookOpen, Target, Users, GraduationCap, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getActivePrograms } from '@/lib/actions';
import { Program } from '@/lib/definitions';

export const revalidate = 60;

// Default programs if none exist in database
const defaultPrograms = [
  {
    id: 1,
    title: "Academic Mentorship Program",
    slug: "academic-mentorship",
    description: "One-on-one mentorship connecting students with experienced academics and professionals who guide them through their educational journey.",
    content: "",
    image_url: null,
    category: 'academic' as const,
    icon: BookOpen,
    features: [
      "Personalized academic guidance",
      "Study skills and time management",
      "Course selection advice",
      "University application support"
    ]
  },
  {
    id: 2,
    title: "Career Development Workshops",
    slug: "career-development",
    description: "Interactive workshops designed to help youth explore career options, develop professional skills, and prepare for the Canadian job market.",
    content: "",
    image_url: null,
    category: 'career' as const,
    icon: Target,
    features: [
      "Resume writing and interview prep",
      "Networking skills",
      "Professional communication",
      "Industry exploration sessions"
    ]
  },
  {
    id: 3,
    title: "Leadership Academy",
    slug: "leadership-academy",
    description: "A comprehensive leadership development program that empowers youth to become confident leaders in their communities and beyond.",
    content: "",
    image_url: null,
    category: 'leadership' as const,
    icon: Users,
    features: [
      "Public speaking training",
      "Project management skills",
      "Team building exercises",
      "Community leadership projects"
    ]
  },
  {
    id: 4,
    title: "Scholarship & Financial Aid Guidance",
    slug: "scholarship-guidance",
    description: "Support in identifying and applying for scholarships, grants, and financial aid opportunities for post-secondary education.",
    content: "",
    image_url: null,
    category: 'academic' as const,
    icon: GraduationCap,
    features: [
      "Scholarship database access",
      "Application review and feedback",
      "Financial planning advice",
      "Bursary information sessions"
    ]
  },
  {
    id: 5,
    title: "Cultural Heritage Program",
    slug: "cultural-heritage",
    description: "Programs that celebrate and preserve Mulenge cultural identity while promoting successful integration into Canadian society.",
    content: "",
    image_url: null,
    category: 'cultural' as const,
    icon: Heart,
    features: [
      "Cultural events and celebrations",
      "Language preservation initiatives",
      "Intergenerational storytelling",
      "Heritage education workshops"
    ]
  }
];

export default async function ProgramsPage() {
  // Try to fetch programs from database, fall back to defaults
  const dbPrograms = await getActivePrograms();
  const hasDbPrograms = dbPrograms && dbPrograms.length > 0;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-4 block">Our Programs</span>
            <h1 className="text-5xl md:text-6xl font-black font-serif mb-6">Programs & Initiatives</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive programs designed to support Mulenge youth in their academic, 
              professional, and personal development journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {hasDbPrograms ? (
            // Render dynamic programs from database
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {dbPrograms.map((program: Program) => (
                <div 
                  key={program.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 group"
                >
                  {program.image_url && (
                    <div className="aspect-video bg-slate-200 relative overflow-hidden">
                      <Image 
                        src={program.image_url} 
                        alt={program.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <span className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-3 block">
                      {program.category}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{program.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{program.description}</p>
                    <Link 
                      href={`/programs/${program.slug}`}
                      className="inline-flex items-center gap-2 text-blue-700 font-bold hover:text-blue-800 transition-colors"
                    >
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Render default programs
            <div className="space-y-16 max-w-5xl mx-auto">
              {defaultPrograms.map((program, index) => (
                <div 
                  key={program.id}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                >
                  <div className="flex-1">
                    <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                      <program.icon className="h-7 w-7 text-blue-700" />
                    </div>
                    <span className="text-blue-700 text-xs font-bold uppercase tracking-widest mb-3 block">
                      {program.category}
                    </span>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">{program.title}</h3>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">{program.description}</p>
                    <ul className="space-y-3 mb-8">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700">
                          <div className="h-2 w-2 bg-blue-700 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-blue-700 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-800 transition-colors"
                    >
                      Get Involved <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="flex-1">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center">
                      <program.icon className="h-24 w-24 text-blue-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black font-serif text-slate-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-slate-600 mb-8">
              Join MSNC today and gain access to all our programs and resources designed to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/subscribe" 
                className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full text-lg transition-all"
              >
                Join MSNC
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
