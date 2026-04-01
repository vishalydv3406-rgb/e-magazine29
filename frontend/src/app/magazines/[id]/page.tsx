'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function MagazineDetailPage() {
  const { id } = useParams();
  const [magazine, setMagazine] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(`/magazines/${id}`),
      axios.get(`/articles?magazineId=${id}&limit=50`)
    ])
      .then(([magRes, artRes]) => {
        setMagazine(magRes.data);
        setArticles(artRes.data.articles || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-2xl mb-12" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />)}
        </div>
      </div>
    );
  }

  if (!magazine) return <div className="text-center py-20 text-2xl font-semibold">Magazine not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-8 mb-16 items-center md:items-start"
      >
        <img 
          src={magazine.coverImage} 
          alt={magazine.title} 
          className="w-full md:w-1/3 aspect-[3/4] object-cover rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800"
          onError={(e: any) => {
            e.target.src = 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400';
          }}
        />
        <div className="flex-1 text-center md:text-left">
          <span className="text-blue-500 font-bold uppercase tracking-wider text-sm mb-2 block">
            {magazine.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {magazine.title}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
            {magazine.description}
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-zinc-500 font-medium">
            <span>Published {new Date(magazine.publishDate).toLocaleDateString()}</span>
            <span>•</span>
            <span>{articles.length} Articles</span>
          </div>
        </div>
      </motion.div>

      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <BookOpen className="text-blue-500" /> 
          In This Issue
        </h2>
        
        {articles.length === 0 ? (
          <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
            No articles published in this magazine yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((article: any, index: number) => (
              <Link href={`/articles/${article._id}`} key={article._id}>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-all group flex items-start gap-4"
                >
                  <div className="text-3xl font-bold text-zinc-200 dark:text-zinc-800 min-w-[2.5rem]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span className="flex items-center gap-2">
                        {article.authorId?.avatar ? (
                          <img src={article.authorId.avatar} className="w-5 h-5 rounded-full" alt="author" />
                        ) : null}
                        {article.authorId?.name || 'Author'}
                      </span>
                      <span>•</span>
                      <span>{article.readingTime} min read</span>
                      {article.isPremium && (
                        <>
                          <span>•</span>
                          <span className="text-amber-500 font-medium bg-amber-500/10 px-2 py-0.5 rounded-full">Premium</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
