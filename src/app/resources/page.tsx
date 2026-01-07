import { ExternalLink, FileText, Video, GraduationCap, Briefcase, Globe, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Resource } from '@/lib/definitions';

export const revalidate = 60;

// Sample resources for display when database is empty
const sampleResources = [
  {
    id: 1,
    title: "Ontario Student Assistance Program (OSAP)",
    description: "Financial aid program for Ontario students attending post-secondary education. Includes grants and loans.",
    category: 'scholarship',
    resource_type: 'link',
    url: "https://www.ontario.ca/page/osap-ontario-student-assistance-program",
    file_url: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Canadian Universities Guide",
    description: "Comprehensive guide to applying to Canadian universities, including admission requirements and deadlines.",
    category: 'academic',
    resource_type: 'link',
    url: "https://www.universitystudy.ca/",
    file_url: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Settlement Services for Newcomers",
    description: "Information about settlement services available for newcomers to Canada, including language training and employment support.",
    category: 'immigration',
    resource_type: 'link',
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants.html",
    file_url: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Resume Writing Tips for New Canadians",
    description: "Best practices for crafting a Canadian-style resume that highlights your skills and experience.",
    category: 'career',
    resource_type: 'document',
    url: "#",
    file_url: null,
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Scholarships Canada Database",
    description: "Search thousands of scholarships available for students in Canada based on various criteria.",
    category: 'scholarship',
    resource_type: 'link',
    url: "https://www.scholarshipscanada.com/",
    file_url: null,
    is_featured: true,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    title: "English Language Learning Resources",
    description: "Free online resources for improving English language skills for academic and professional success.",
    category: 'academic',
    resource_type: 'link',
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/settle-canada/learn-english-french.html",
    file_url: null,
    is_featured: false,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

const categoryIcons: Record<string, typeof GraduationCap> = {
  scholarship: GraduationCap,
  academic: BookOpen,
  career: Briefcase,
  immigration: Globe,
  other: FileText,
};

const categoryColors: Record<string, string> = {
  scholarship: 'bg-amber-100 text-amber-700',
  academic: 'bg-blue-100 text-blue-700',
  career: 'bg-green-100 text-green-700',
  immigration: 'bg-purple-100 text-purple-700',
  other: 'bg-slate-100 text-slate-700',
};

export default async function ResourcesPage() {
  // Fetch resources from database
  const { data: dbResources } = await supabase
    .from('resources')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  const resources = dbResources && dbResources.length > 0 ? dbResources : sampleResources;
  
  // Group resources by category
  const groupedResources = resources.reduce((acc: Record<string, Resource[]>, resource: Resource) => {
    const category = resource.category || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  // Featured resources
  const featuredResources = resources.filter((r: Resource) => r.is_featured).slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm mb-4 block">Resources</span>
            <h1 className="text-5xl md:text-6xl font-black font-serif mb-6">Resource Library</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Access curated resources to support your academic journey, career development, and successful integration in Canada.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-black font-serif text-slate-900 mb-12">Featured Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredResources.map((resource: Resource) => {
                  const Icon = categoryIcons[resource.category] || FileText;
                  const colorClass = categoryColors[resource.category] || categoryColors.other;
                  
                  return (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all"
                    >
                      <div className="flex items-start gap-6">
                        <div className={`h-14 w-14 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
                          <Icon className="h-7 w-7" />
                        </div>
                        <div className="flex-1">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${colorClass}`}>
                            {resource.category}
                          </span>
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-slate-600 mb-4 leading-relaxed">{resource.description}</p>
                          <span className="inline-flex items-center gap-2 text-blue-700 font-bold text-sm">
                            {resource.resource_type === 'video' ? (
                              <>Watch Video <Video className="h-4 w-4" /></>
                            ) : resource.resource_type === 'document' ? (
                              <>Download <FileText className="h-4 w-4" /></>
                            ) : (
                              <>Visit Site <ExternalLink className="h-4 w-4" /></>
                            )}
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Resources by Category */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black font-serif text-slate-900 mb-12">All Resources</h2>
            
            <div className="space-y-16">
              {Object.entries(groupedResources).map(([category, categoryResources]) => {
                const Icon = categoryIcons[category] || FileText;
                const colorClass = categoryColors[category] || categoryColors.other;
                const resourceList = categoryResources as Resource[];
                
                return (
                  <div key={category}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 capitalize">{category} Resources</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {resourceList.map((resource: Resource) => (
                        <a
                          key={resource.id}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group bg-white rounded-xl p-6 border border-slate-100 hover:shadow-md hover:border-blue-200 transition-all"
                        >
                          <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                            {resource.title}
                          </h4>
                          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{resource.description}</p>
                          <span className="inline-flex items-center gap-2 text-blue-700 font-bold text-xs">
                            {resource.resource_type === 'video' ? (
                              <>Watch <Video className="h-3 w-3" /></>
                            ) : resource.resource_type === 'document' ? (
                              <>Download <FileText className="h-3 w-3" /></>
                            ) : (
                              <>Visit <ExternalLink className="h-3 w-3" /></>
                            )}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black font-serif mb-6">Have a Resource to Share?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Know of a valuable resource that could help other Mulenge youth? Let us know and we&apos;ll add it to our library.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-4 rounded-full text-lg transition-all"
            >
              Submit a Resource <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
