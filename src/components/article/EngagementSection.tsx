'use client';

import { useState, useTransition, useEffect } from 'react';
import { Heart, MessageSquare, Share2, Send, Loader2 } from 'lucide-react';
import { likeArticle, addComment, getComments } from '@/lib/actions';

interface Comment {
  id: number;
  created_at: string;
  content: string;
  author: string;
}

interface EngagementSectionProps {
  articleId: number;
  initialLikes: number;
}

export function EngagementSection({ articleId, initialLikes }: EngagementSectionProps) {
  // Initialize isLiked from localStorage directly in the state initializer
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(() => {
    // Only run on client side
    if (typeof window === 'undefined') return false;
    try {
      const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
      return likedArticles.includes(articleId);
    } catch {
      return false;
    }
  });
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Fetch initial comments
    startTransition(async () => {
        const result = await getComments(articleId);
        if (result.data) {
          setComments(result.data);
        }
      });
  }, [articleId]);

  const handleLike = () => {
    startTransition(async () => {
      if (isLiked) return; // Prevent multiple likes

      const result = await likeArticle(articleId);
      if (result.likes) {
        setLikes(result.likes);
        setIsLiked(true);
        // Store liked state in local storage
        try {
          const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
          localStorage.setItem('likedArticles', JSON.stringify([...likedArticles, articleId]));
        } catch (error) {
          console.error('Error saving liked article to localStorage:', error);
        }
      }
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    startTransition(async () => {
      const result = await addComment(articleId, comment, 'Anonymous'); // Replace with actual user
      if (result && result.data) {
        const newComment = result.data[0];
        setComments([newComment, ...comments]);
        setComment('');
      }
    });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      // User cancelled share or clipboard access denied
      console.error('Share failed:', error);
    }
  };

  return (
    <section className="my-12 border-t border-slate-200 pt-8">
      <div className="flex items-center gap-4 flex-wrap mb-8">
        <button 
          onClick={handleLike}
          disabled={isLiked || isPending}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
            isLiked 
              ? 'bg-blue-50 text-blue-600 border border-blue-100' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 disabled:opacity-50'
          }`}
          aria-label={isLiked ? 'You have liked this article' : 'Like this article'}
        >
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />}
          <span className="font-bold">{likes}</span>
        </button>
        
        <button 
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 transition-colors"
          aria-label="Share this article"
        >
          <Share2 className="h-5 w-5" />
          <span className="font-bold">Share</span>
        </button>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="flex items-center gap-2 text-xl font-bold font-serif text-slate-900 mb-6">
          <MessageSquare className="h-5 w-5" />
          Comments ({comments.length})
        </h3>
        
        <form onSubmit={handleCommentSubmit} className="mb-8 flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Join the conversation..."
            className="flex-1 px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Write a comment"
          />
          <button
            type="submit"
            disabled={!comment.trim() || isPending}
            className="bg-blue-700 text-white px-5 rounded-lg font-medium transition-colors hover:bg-blue-800 disabled:opacity-50"
            aria-label="Post comment"
          >
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </form>
        
        <div className="space-y-4">
            {comments.length > 0 ? comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0">
                  {c.author?.[0] || 'A'}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{c.author || 'Anonymous'}</p>
                  <p className="text-slate-600 text-sm">{c.content}</p>
                  <p className="text-xs text-slate-400 mt-1">{new Date(c.created_at).toLocaleString()}</p>
                </div>
              </div>
            )) : (
                <div className="text-center py-8 text-slate-400 font-sans">
                    No comments yet.
                </div>
            )}
        </div>
      </div>
    </section>
  );
}