// ============================================
// MOCK DATA FOR DEVELOPMENT
// This file replaces Supabase database calls with static mock data
// ============================================

import { Event, Resource, SupabaseArticle, Member, TeamMember, Program } from './definitions';

// ============================================
// MOCK POSTS/ARTICLES
// ============================================
export const mockPosts: SupabaseArticle[] = [
  {
    id: 1,
    title: "MSNC Launches New Academic Mentorship Program",
    summary: "The Mulenge Scholars' Network Canada is proud to announce our new academic mentorship initiative connecting students with professionals across Canada.",
    category: "news",
    slug: "msnc-launches-academic-mentorship-program",
    image_url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    author_name: "MSNC Editorial",
    created_at: new Date().toISOString(),
    is_published: true,
    deleted_at: null,
    content: "<p>The Mulenge Scholars' Network Canada (MSNC) is excited to announce the launch of our comprehensive academic mentorship program. This initiative aims to connect Mulenge youth with experienced professionals and academics who can provide guidance on navigating the Canadian education system.</p><p>The program will offer:</p><ul><li>One-on-one mentorship sessions</li><li>Study skills workshops</li><li>University application guidance</li><li>Scholarship information sessions</li></ul>",
    image_caption: "Students and mentors at MSNC event",
    image_credit: "MSNC Media",
    likes: 42,
  },
  {
    id: 2,
    title: "Annual Community Celebration Success",
    summary: "Over 200 community members gathered for our annual celebration showcasing Mulenge culture and recognizing outstanding youth achievements.",
    category: "announcement",
    slug: "annual-community-celebration-success",
    image_url: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
    author_name: "MSNC Communications",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    deleted_at: null,
    content: "<p>Last weekend's annual community celebration was a tremendous success, bringing together over 200 members of the Mulenge community in Canada.</p><p>The event featured traditional dance performances, cultural presentations, and an awards ceremony recognizing outstanding youth achievements in academics and community service.</p>",
    image_caption: "Community members at the celebration",
    image_credit: "MSNC Media",
    likes: 78,
  },
  {
    id: 3,
    title: "Scholarship Opportunities for 2025",
    summary: "Important information about scholarship opportunities available to Mulenge students pursuing post-secondary education in Canada.",
    category: "update",
    slug: "scholarship-opportunities-2025",
    image_url: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
    author_name: "MSNC Academic Team",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    deleted_at: null,
    content: "<p>As the new academic year approaches, MSNC has compiled a comprehensive list of scholarship opportunities for Mulenge students.</p><p>Key deadlines and application requirements are detailed in this announcement. We encourage all eligible students to apply.</p>",
    image_caption: "Students studying",
    image_credit: "Pexels",
    likes: 156,
  },
  {
    id: 4,
    title: "Youth Leadership Workshop Series",
    summary: "Join us for a three-part leadership workshop series designed to develop essential skills for future community leaders.",
    category: "news",
    slug: "youth-leadership-workshop-series",
    image_url: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg",
    author_name: "MSNC Programs",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    deleted_at: null,
    content: "<p>MSNC is launching an exciting new leadership workshop series aimed at developing the next generation of community leaders.</p>",
    image_caption: "Leadership workshop session",
    image_credit: "MSNC Media",
    likes: 34,
  },
  {
    id: 5,
    title: "Draft: Upcoming Career Fair",
    summary: "Draft announcement for the upcoming career fair event.",
    category: "announcement",
    slug: "upcoming-career-fair-draft",
    image_url: null,
    author_name: "MSNC Team",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: false,
    deleted_at: null,
    content: "<p>Draft content for the career fair announcement...</p>",
    likes: 0,
  },
];

// ============================================
// MOCK EVENTS
// ============================================
export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Academic Success Workshop: Navigating Canadian Universities",
    slug: "academic-success-workshop",
    description: "Learn strategies for succeeding in Canadian post-secondary education, including study tips, resource navigation, and academic planning.",
    content: "<p>Join us for a comprehensive workshop on academic success strategies...</p>",
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
    content: "<p>An evening of networking and career exploration...</p>",
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
    content: "<p>A full-day seminar focused on leadership development...</p>",
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
  {
    id: 4,
    title: "Cultural Heritage Celebration",
    slug: "cultural-heritage-celebration",
    description: "A celebration of Mulenge cultural heritage featuring traditional performances, food, and community activities.",
    content: "<p>Join us for our annual cultural celebration...</p>",
    image_url: null,
    event_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    event_time: "12:00 PM - 6:00 PM EST",
    location: "Toronto Community Hall",
    is_virtual: false,
    virtual_link: null,
    registration_url: null,
    max_attendees: 200,
    is_published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// MOCK RESOURCES
// ============================================
export const mockResources: Resource[] = [
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

// ============================================
// MOCK TEAM MEMBERS
// ============================================
export const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Jean-Pierre Mulenge",
    role: "President",
    bio: "Community leader with over 15 years of experience in youth development and education advocacy.",
    image_url: null,
    email: "president@msncanada.org",
    linkedin_url: null,
    order_index: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Marie Uwimana",
    role: "Vice President",
    bio: "Education consultant passionate about supporting immigrant youth in achieving academic success.",
    image_url: null,
    email: "vp@msncanada.org",
    linkedin_url: null,
    order_index: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Emmanuel Nziza",
    role: "Programs Director",
    bio: "Experienced program manager dedicated to creating impactful community initiatives.",
    image_url: null,
    email: "programs@msncanada.org",
    linkedin_url: null,
    order_index: 3,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

// ============================================
// MOCK PROGRAMS
// ============================================
export const mockPrograms: Program[] = [
  {
    id: 1,
    title: "Academic Mentorship Program",
    slug: "academic-mentorship",
    description: "One-on-one mentorship connecting students with academic and professional mentors.",
    content: "<p>Our flagship mentorship program pairs students with experienced mentors...</p>",
    image_url: null,
    category: 'academic',
    is_active: true,
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Career Development Workshop Series",
    slug: "career-development",
    description: "Monthly workshops focusing on career exploration, job skills, and professional networking.",
    content: "<p>Comprehensive career development program for youth...</p>",
    image_url: null,
    category: 'career',
    is_active: true,
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Youth Leadership Initiative",
    slug: "youth-leadership",
    description: "Leadership training program developing the next generation of community leaders.",
    content: "<p>Intensive leadership development program...</p>",
    image_url: null,
    category: 'leadership',
    is_active: true,
    order_index: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// MOCK MEMBERS/SUBSCRIBERS
// ============================================
export const mockMembers: Member[] = [
  {
    id: 1,
    email: "student1@example.com",
    first_name: "Alice",
    last_name: "Mulenge",
    phone: "416-555-0101",
    city: "Toronto",
    province: "Ontario",
    membership_type: 'student',
    interests: ['academic', 'career'],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    email: "mentor1@example.com",
    first_name: "Bob",
    last_name: "Nziza",
    phone: "416-555-0102",
    city: "Mississauga",
    province: "Ontario",
    membership_type: 'mentor',
    interests: ['mentorship', 'leadership'],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// MOCK COMMENTS
// ============================================
export interface MockComment {
  id: string;
  content: string;
  user_id: string;
  post_id: number;
  created_at: string;
  author: string;
  profiles: {
    full_name: string | null;
    username: string | null;
    avatar_url: string | null;
  } | null;
}

export const mockComments: MockComment[] = [
  {
    id: '1',
    content: "This is a great initiative! Looking forward to participating.",
    user_id: 'user-1',
    post_id: 1,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: "Community Member",
    profiles: {
      full_name: "Community Member",
      username: "member1",
      avatar_url: null,
    },
  },
  {
    id: '2',
    content: "Thank you MSNC for organizing these events!",
    user_id: 'user-2',
    post_id: 1,
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    author: "Supporter",
    profiles: {
      full_name: "Supporter",
      username: "supporter1",
      avatar_url: null,
    },
  },
];

// ============================================
// MOCK SITE SETTINGS
// ============================================
export const mockSiteSettings = {
  id: 1,
  public_comments: true,
  maintenance_mode: false,
  auto_publishing: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// ============================================
// MOCK USER (for authentication simulation)
// ============================================
export const mockUser = {
  id: 'mock-user-id-123',
  email: 'admin@msncanada.org',
  user_metadata: {
    full_name: 'Admin User',
    display_name: 'Admin',
  },
};

// ============================================
// IN-MEMORY STATE (for simulating database operations)
// These use let because they can be modified during runtime
// ============================================
let postsState = [...mockPosts];
const membersState = [...mockMembers];
const commentsState = [...mockComments];

// ============================================
// MOCK DATABASE OPERATIONS
// ============================================

// Posts operations
export function getPosts() {
  return postsState.filter(p => p.deleted_at === null);
}

export function getPublishedPosts() {
  return postsState.filter(p => p.is_published && p.deleted_at === null);
}

export function getPostBySlug(category: string, slug: string) {
  return postsState.find(
    p => p.category?.toLowerCase() === category.toLowerCase() && p.slug === slug && p.deleted_at === null
  );
}

export function getPostById(id: number | string) {
  return postsState.find(p => p.id === Number(id));
}

export function getPostsByCategory(category: string) {
  return postsState.filter(
    p => p.category?.toLowerCase() === category.toLowerCase() && p.is_published && p.deleted_at === null
  );
}

export function searchPosts(query: string) {
  const lowerQuery = query.toLowerCase();
  return postsState.filter(
    p =>
      p.deleted_at === null &&
      p.is_published &&
      (p.title.toLowerCase().includes(lowerQuery) || p.summary.toLowerCase().includes(lowerQuery))
  );
}

export function getDeletedPosts() {
  return postsState.filter(p => p.deleted_at !== null);
}

export function deletePost(id: number) {
  const post = postsState.find(p => p.id === id);
  if (post) {
    post.deleted_at = new Date().toISOString();
  }
  return post;
}

export function restorePost(id: number) {
  const post = postsState.find(p => p.id === id);
  if (post) {
    post.deleted_at = null;
  }
  return post;
}

export function permanentDeletePost(id: number) {
  postsState = postsState.filter(p => p.id !== id);
}

export function createPost(post: Partial<SupabaseArticle>) {
  const newPost: SupabaseArticle = {
    id: Math.max(0, ...postsState.map(p => Number(p.id))) + 1,
    title: post.title || '',
    summary: post.summary || '',
    category: post.category || 'news',
    slug: post.slug || '',
    image_url: post.image_url || null,
    author_name: post.author_name || null,
    created_at: new Date().toISOString(),
    is_published: post.is_published || false,
    deleted_at: null,
    content: post.content || '',
    image_caption: post.image_caption,
    image_credit: post.image_credit,
    likes: 0,
  };
  postsState.push(newPost);
  return newPost;
}

export function updatePost(id: number | string, updates: Partial<SupabaseArticle>) {
  const post = postsState.find(p => p.id === Number(id));
  if (post) {
    Object.assign(post, updates);
  }
  return post;
}

// Events operations
export function getEvents() {
  return mockEvents.filter(e => e.is_published);
}

export function getUpcomingEventsData(limit = 6) {
  const today = new Date().toISOString().split('T')[0];
  return mockEvents
    .filter(e => e.is_published && e.event_date >= today)
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
    .slice(0, limit);
}

// Resources operations
export function getResources() {
  return mockResources.filter(r => r.is_active);
}

export function getFeaturedResourcesData(limit = 6) {
  return mockResources
    .filter(r => r.is_active && r.is_featured)
    .slice(0, limit);
}

// Programs operations
export function getActivePrograms() {
  return mockPrograms.filter(p => p.is_active);
}

// Members operations
export function getMembers() {
  return membersState.filter(m => m.is_active);
}

export function addMember(member: Partial<Member>) {
  const existing = membersState.find(m => m.email === member.email);
  if (existing) {
    return { error: 'Email already registered', data: null };
  }
  const newMember: Member = {
    id: Math.max(0, ...membersState.map(m => Number(m.id))) + 1,
    email: member.email || '',
    first_name: member.first_name || null,
    last_name: member.last_name || null,
    phone: member.phone || null,
    city: member.city || null,
    province: member.province || null,
    membership_type: member.membership_type || 'supporter',
    interests: member.interests || [],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  membersState.push(newMember);
  return { data: newMember, error: null };
}

// Comments operations
export function getCommentsForPost(postId: number) {
  return commentsState.filter(c => c.post_id === postId);
}

export function addComment(postId: number, content: string, author: string) {
  const newComment: MockComment = {
    id: String(Math.max(0, ...commentsState.map(c => Number(c.id))) + 1),
    content,
    user_id: 'mock-user',
    post_id: postId,
    created_at: new Date().toISOString(),
    author,
    profiles: {
      full_name: author,
      username: author.toLowerCase().replace(/\s/g, ''),
      avatar_url: null,
    },
  };
  commentsState.push(newComment);
  return newComment;
}

// Like operations
export function likePostById(postId: number) {
  const post = postsState.find(p => p.id === postId);
  if (post) {
    post.likes = (post.likes || 0) + 1;
    return { likes: post.likes };
  }
  return { error: 'Post not found' };
}
