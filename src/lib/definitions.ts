// ============================================
// MSNC Type Definitions
// ============================================

// Team/Leadership Members
export interface TeamMember {
  id: number | string;
  name: string;
  role: string;
  bio: string;
  image_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

// Programs
export interface Program {
  id: number | string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string | null;
  category: 'academic' | 'career' | 'leadership' | 'community' | 'cultural';
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

// Events
export interface Event {
  id: number | string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string | null;
  event_date: string;
  event_time: string | null;
  location: string;
  is_virtual: boolean;
  virtual_link: string | null;
  registration_url: string | null;
  max_attendees: number | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// Resources
export interface Resource {
  id: number | string;
  title: string;
  description: string;
  category: 'scholarship' | 'academic' | 'career' | 'immigration' | 'other';
  resource_type: 'link' | 'document' | 'video';
  url: string;
  file_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

// Members/Subscribers
export interface Member {
  id: number | string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  city: string | null;
  province: string | null;
  membership_type: 'student' | 'professional' | 'mentor' | 'supporter';
  interests: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Contact Form Submissions
export interface ContactSubmission {
  id: number | string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Event Registrations
export interface EventRegistration {
  id: number | string;
  event_id: number | string;
  member_id: number | string | null;
  name: string;
  email: string;
  phone: string | null;
  created_at: string;
}

// News/Announcements (repurposed from posts)
export interface Announcement {
  id: number | string;
  title: string;
  summary: string;
  content: string;
  slug: string;
  image_url: string | null;
  category: 'news' | 'announcement' | 'success-story' | 'update';
  author_name: string | null;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// Legacy support for existing posts table
export interface SupabaseArticle {
  id: number | string;
  title: string;
  summary: string;
  category: string;
  slug: string;
  image_url: string | null;
  author_name: string | null;
  created_at: string;
  is_published: boolean;
  deleted_at: string | null;
  content?: string;
  image_caption?: string;
  image_credit?: string;
  likes?: number;
}