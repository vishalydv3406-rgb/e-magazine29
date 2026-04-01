'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';
import { Bookmark, Clock } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

export default function SavedArticlesPage() {
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    axios.get('/articles/saved')
      .then((res: any) => setSavedArticles(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user, router]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse space-y-8">
        <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-10">
        <Bookmark className="text-blue-500" size={32} />
        <h1 className="text-4xl font-bold tracking-tight">Your Saved Articles</h1>
      </div>

      {savedArticles.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <Bookmark size={48} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-4" />
          <h2 className="text-2xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">Nothing saved yet</h2>
          <p className="text-zinc-500 mb-6">Explore our magazines and save articles you'd like to read later.</p>
          <Link href="/magazines?category=Technology" className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors">
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article: any, i: number) => (
            <Link href={`/articles/${article._id}`} key={article._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col group cursor-pointer"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-2 mt-auto flex-shrink-0">
                  {article.magazineId?.category || 'Article'}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <div className="mt-auto pt-4 flex items-center justify-between text-sm text-zinc-500 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="flex items-center gap-1"><Clock size={16} /> {article.readingTime} min</span>
                  <span className="text-zinc-400">{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
