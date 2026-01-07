'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArticleCard } from '@/components/article/ArticleCard';
import { getPublishedPosts } from '@/lib/mockdata';
import { SupabaseArticle } from '@/lib/definitions';

export function LatestNews() {
  const [articles, setArticles] = useState<SupabaseArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use mock data
    const publishedPosts = getPublishedPosts()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 8);
    setArticles(publishedPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-4">
          <h2 className="text-3xl font-bold font-serif text-slate-900">Latest News</h2>
          <div className="h-4 w-16 bg-slate-200 animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-slate-100 animate-pulse rounded-xl h-96"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-4">
        <h2 className="text-3xl font-bold font-serif text-slate-900">Latest News</h2>
        <Link 
          href="/archive" 
          className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          View All &rarr;
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-400 font-sans">No articles available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article: SupabaseArticle) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}