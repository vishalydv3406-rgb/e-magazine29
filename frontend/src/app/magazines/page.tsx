/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import axios from '@/lib/axios';
import Link from 'next/link';

function MagazinesContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/magazines', { params: { category: category || undefined } })
      .then((res: any) => setMagazines(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8">
        {category ? `${category} Magazines` : 'All Magazines'}
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse bg-zinc-200 dark:bg-zinc-800 h-64 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {magazines.map((mag: any) => (
            <Link href={`/magazines/${mag._id}`} key={mag._id}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 cursor-pointer h-full flex flex-col transition-shadow"
              >
                <img 
                  src={mag.coverImage} 
                  alt={mag.title} 
                  className="w-full h-56 object-cover" 
                  onError={(e: any) => {
                    e.target.src = 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=400';
                  }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{mag.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{mag.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MagazinesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500 animate-pulse">Loading magazines...</div>}>
      <MagazinesContent />
    </Suspense>
  );
}
