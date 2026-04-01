'use client';

import Link from 'next/link';
import { useStore } from '@/store/useStore';

export default function Navbar() {
  const { user, logout } = useStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            E-Mag.
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="/magazines?category=Technology" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Tech</Link>
            <Link href="/magazines?category=Business" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Business</Link>
            <Link href="/magazines?category=Health%20%26%20Fitness" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Health</Link>
            <Link href="/magazines?category=Education" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Education</Link>
            <Link href="/magazines?category=History" className="hover:text-zinc-900 dark:hover:text-white transition-colors">History</Link>
            <Link href="/magazines?category=Personality%20Disorders" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Psychology</Link>
            <Link href="/magazines?category=Travel" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Travel</Link>
            <Link href="/magazines?category=Love" className="hover:text-zinc-900 dark:hover:text-white transition-colors text-pink-500">Love</Link>
            <Link href="/magazines?category=Relationships" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Relationships</Link>
            <Link href="/magazines?category=Emotions" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Emotions</Link>
            <Link href="/magazines?category=AI" className="hover:text-zinc-900 dark:hover:text-white transition-colors text-blue-500">AI</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-6">
              <Link href="/saved" className="flex items-center gap-1 text-sm font-medium hover:text-blue-500 transition-colors">
                Bookmarks
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium border-l border-zinc-300 dark:border-zinc-700 pl-4">{user.name}</span>
                <button onClick={logout} className="text-sm text-red-500 hover:text-red-400 transition-colors">Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-zinc-600 dark:hover:text-zinc-300">
                Sign In
              </Link>
              <Link href="/register" className="text-sm font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-full hover:scale-105 transition-transform">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
