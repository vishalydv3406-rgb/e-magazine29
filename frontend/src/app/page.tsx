'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';

export default function Home() {
  const [magazines, setMagazines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/magazines')
      .then((res: any) => setMagazines(res.data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Discover the Future of Reading
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
          Premium articles across Technology, Business, Health, Travel, and Education. Read, engage, and elevate your mind.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:scale-105 transition-transform">
            Start Reading
          </button>
          <button className="px-8 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            Subscribe
          </button>
        </div>
      </motion.section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Trending Magazines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
              >
                <div className="h-48 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="p-6 animate-pulse">
                  <div className="h-4 w-20 bg-blue-500/20 rounded mb-4" />
                  <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded mb-2" />
                  <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded" />
                </div>
              </motion.div>
            ))
          ) : (
            magazines.map((mag: any) => (
              <Link href={`/magazines/${mag._id}`} key={mag._id}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm transition-shadow hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 cursor-pointer h-full flex flex-col"
                >
                  <img 
                    src={mag.coverImage} 
                    alt={mag.title} 
                    className="w-full h-56 object-cover" 
                    onError={(e: any) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                  <div className="p-6">
                    <div className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">{mag.category || 'Trending'}</div>
                    <h3 className="text-xl font-bold mb-2">{mag.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{mag.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
