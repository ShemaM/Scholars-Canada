'use server';

import { supabase } from './supabase';
import { revalidatePath } from 'next/cache';

// ============================================
// CONSTANTS
// ============================================

const MAX_USER_INTERESTS = 10;
const MAX_STRING_LENGTH = 1000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;

// Database error codes - exported for use in client components
export const DB_ERROR_CODES = {
  UNIQUE_VIOLATION: '23505',
  TABLE_NOT_FOUND: '42P01',
} as const;

// ============================================
// INPUT VALIDATION & SANITIZATION HELPERS
// ============================================

/**
 * Sanitize string input to prevent XSS attacks
 * Removes potentially harmful HTML/script tags and encodes special characters
 */
function sanitizeString(input: string | undefined | null, maxLength = MAX_STRING_LENGTH): string {
  if (!input) return '';
  
  let sanitized = input.trim();
  
  // HTML entity encode special characters
  sanitized = sanitized.replace(/[<>'"&]/g, (char) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
      '&': '&amp;',
    };
    return entities[char] || char;
  });
  
  // Remove dangerous URL schemes (javascript, vbscript, data)
  sanitized = sanitized.replace(/javascript\s*:/gi, '');
  sanitized = sanitized.replace(/vbscript\s*:/gi, '');
  sanitized = sanitized.replace(/data\s*:/gi, '');
  
  // Remove event handlers - use loop to catch repeated patterns
  let prevLength;
  do {
    prevLength = sanitized.length;
    sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  } while (sanitized.length !== prevLength);
  
  return sanitized.slice(0, maxLength);
}

/**
 * Sanitize name - more restrictive than general strings
 */
function sanitizeName(input: string | undefined | null): string {
  if (!input) return '';
  // Allow only letters, spaces, hyphens, and apostrophes in names
  return input
    .trim()
    .replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '')
    .slice(0, MAX_NAME_LENGTH);
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= MAX_EMAIL_LENGTH;
}

/**
 * Validate phone number (basic validation for Canadian format)
 */
function sanitizePhone(phone: string | undefined | null): string | null {
  if (!phone) return null;
  // Remove non-numeric characters except + for international
  const cleaned = phone.replace(/[^\d+\-() ]/g, '').slice(0, MAX_PHONE_LENGTH);
  return cleaned || null;
}

/**
 * Validate membership type
 */
function isValidMembershipType(type: string): type is 'student' | 'professional' | 'mentor' | 'supporter' {
  return ['student', 'professional', 'mentor', 'supporter'].includes(type);
}

// ============================================
// MEMBER / SUBSCRIPTION ACTIONS
// ============================================

export async function registerMember(formData: {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  city?: string;
  province?: string;
  membership_type: 'student' | 'professional' | 'mentor' | 'supporter';
  interests?: string[];
}) {
  try {
    // Validate required email
    const email = sanitizeString(formData.email).toLowerCase();
    if (!email || !isValidEmail(email)) {
      return { error: 'Please provide a valid email address.' };
    }

    // Validate membership type
    if (!isValidMembershipType(formData.membership_type)) {
      return { error: 'Invalid membership type.' };
    }

    // Sanitize all inputs
    const sanitizedData = {
      email,
      first_name: sanitizeName(formData.first_name) || null,
      last_name: sanitizeName(formData.last_name) || null,
      phone: sanitizePhone(formData.phone),
      city: sanitizeString(formData.city, MAX_NAME_LENGTH) || null,
      province: sanitizeString(formData.province, MAX_NAME_LENGTH) || null,
      membership_type: formData.membership_type,
      interests: (formData.interests || []).map(i => sanitizeString(i, 50)).filter(Boolean).slice(0, MAX_USER_INTERESTS),
      is_active: true,
    };

    const { data, error } = await supabase
      .from('members')
      .insert([sanitizedData])
      .select();

    if (error) {
      if (error.code === DB_ERROR_CODES.UNIQUE_VIOLATION) {
        return { error: 'This email is already registered.' };
      }
      throw error;
    }

    revalidatePath('/');
    return { data, success: true };
  } catch (error) {
    console.error('Error registering member:', error);
    return { error: 'Failed to register. Please try again.' };
  }
}

// ============================================
// CONTACT FORM ACTIONS
// ============================================

export async function submitContactForm(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    // Validate required fields
    const name = sanitizeString(formData.name);
    const email = sanitizeString(formData.email).toLowerCase();
    const subject = sanitizeString(formData.subject);
    const message = sanitizeString(formData.message);

    if (!name || name.length < 2) {
      return { error: 'Please provide your name.' };
    }

    if (!email || !isValidEmail(email)) {
      return { error: 'Please provide a valid email address.' };
    }

    if (!subject) {
      return { error: 'Please select a subject.' };
    }

    if (!message || message.length < 10) {
      return { error: 'Please provide a message (at least 10 characters).' };
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name,
        email,
        subject,
        message,
        is_read: false,
      }])
      .select();

    if (error) throw error;

    return { data, success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { error: 'Failed to send message. Please try again.' };
  }
}

// ============================================
// EVENT REGISTRATION ACTIONS
// ============================================

export async function registerForEvent(formData: {
  event_id: number | string;
  name: string;
  email: string;
  phone?: string;
}) {
  try {
    // Validate inputs
    const name = sanitizeString(formData.name);
    const email = sanitizeString(formData.email).toLowerCase();
    const phone = sanitizePhone(formData.phone);
    const eventId = formData.event_id;

    if (!name || name.length < 2) {
      return { error: 'Please provide your name.' };
    }

    if (!email || !isValidEmail(email)) {
      return { error: 'Please provide a valid email address.' };
    }

    if (!eventId) {
      return { error: 'Invalid event.' };
    }

    const { data, error } = await supabase
      .from('event_registrations')
      .insert([{
        event_id: eventId,
        name,
        email,
        phone,
      }])
      .select();

    if (error) {
      if (error.code === DB_ERROR_CODES.UNIQUE_VIOLATION) {
        return { error: 'You are already registered for this event.' };
      }
      throw error;
    }

    revalidatePath('/events');
    return { data, success: true };
  } catch (error) {
    console.error('Error registering for event:', error);
    return { error: 'Failed to register. Please try again.' };
  }
}

// ============================================
// FETCH DATA ACTIONS
// ============================================

export async function getUpcomingEvents(limit = 6) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_published', true)
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return data || [];
}

export async function getActivePrograms() {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching programs:', error);
    return [];
  }
  return data || [];
}

export async function getFeaturedResources(limit = 6) {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching resources:', error);
    return [];
  }
  return data || [];
}

export async function getTeamMembers() {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
  return data || [];
}

export async function getLatestAnnouncements(limit = 4) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .is('deleted_at', null)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
  return data || [];
}

// ============================================
// LEGACY ACTIONS (for backward compatibility)
// ============================================

export async function likeArticle(articleId: number) {
  const { data, error } = await supabase
    .from('posts')
    .select('likes')
    .eq('id', articleId)
    .single();

  if (error) {
    console.error('Error fetching likes', error);
    return { error: 'Could not fetch likes' };
  }

  const newLikes = (data.likes || 0) + 1;

  const { error: updateError } = await supabase
    .from('posts')
    .update({ likes: newLikes })
    .eq('id', articleId);

  if (updateError) {
    console.error('Error updating likes', updateError);
    return { error: 'Could not update likes' };
  }

  revalidatePath('/');
  return { likes: newLikes };
}

interface Comment {
  id: number;
  created_at: string;
  content: string;
  author: string;
}

export async function addComment(articleId: number, comment: string, author: string): Promise<{ data?: Comment[] | null; error?: string | null; }> {
  if (!comment.trim()) {
    return { error: 'Comment cannot be empty' };
  }

  const { data, error } = await supabase
    .from('comments')
    .insert([
      { post_id: articleId, content: comment, author: author || "Anonymous" },
    ])
    .select();

  if (error) {
    console.error('Error adding comment', error);
    return { error: 'Could not add comment' };
  }
  
  revalidatePath('/');
  return { data };
}

export async function getComments(articleId: number): Promise<{ data?: Comment[] | null; error?: string | null; }> {
    const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', articleId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching comments', error);
        return { error: 'Could not fetch comments' };
    }

    return { data };
}
