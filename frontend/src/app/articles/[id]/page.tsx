'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Bookmark, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function ArticlePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, setUser } = useStore();
  const [article, setArticle] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [shareText, setShareText] = useState('Share');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    Promise.all([
      axios.get(`/articles/${id}`),
      axios.get(`/comments/article/${id}`).catch(() => ({ data: [] }))
    ])
      .then(([articleRes, commentsRes]) => {
        setArticle(articleRes.data);
        setComments(commentsRes.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (user?.bookmarks) {
      setIsSaved(user.bookmarks.some((b: any) => b === id || b._id === id));
    }
  }, [user, id]);

  const handleLike = async () => {
    if (!user) return router.push('/login');
    try {
      const res = await axios.post(`/articles/${id}/like`);
      setArticle({ ...article, likes: Array.from({ length: res.data.likes }).fill('id') });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!user) return router.push('/login');
    try {
      const res = await axios.post(`/articles/${id}/bookmark`);
      setIsSaved(res.data.isBookmarked);
      setUser({ ...user, bookmarks: res.data.bookmarks });
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareText('Copied!');
    setTimeout(() => setShareText('Share'), 2000);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return router.push('/login');
    if (!newComment.trim()) return;

    try {
      const res = await axios.post('/comments', { content: newComment, articleId: id });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-20 animate-pulse bg-zinc-200 dark:bg-zinc-800 h-96 rounded-2xl" />;
  }

  if (!article) return <div className="text-center py-20">Article not found</div>;

  // Optimistic like calculation
  const isLiked = user && article?.likes?.some?.((l: any) => l === user._id || l === 'id') || false;

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50" style={{ scaleX }} />
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-10 text-center">
          <span className="text-blue-500 font-medium mb-4 block tracking-wider uppercase text-sm">
            {article.magazineId?.category || 'Category'}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-zinc-500">
            <span>By {article.authorId?.name || 'Admin'}</span>
            <span>•</span>
            <span>{article.readingTime} min read</span>
            <span>•</span>
            <span>{article.views} views</span>
          </div>
        </header>

        <div className="flex justify-center gap-8 mb-12 py-4 border-y border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors group ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
          >
            <Heart size={20} className={isLiked ? 'fill-current' : 'group-hover:fill-current'} /> 
            <span className="font-medium">{article.likes?.length || 0}</span>
          </button>
          <a href="#comments" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
            <MessageCircle size={20} /> <span className="font-medium">{comments.length}</span>
          </a>
          <button 
            onClick={handleSave}
            className={`flex items-center gap-2 transition-colors ${isSaved ? 'text-green-500' : 'hover:text-green-500'}`}
          >
            <Bookmark size={20} className={isSaved ? 'fill-current' : ''} /> 
            <span className="font-medium">{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 hover:text-purple-500 transition-colors">
            <Share2 size={20} /> <span className="font-medium">{shareText}</span>
          </button>
        </div>

        <article className="prose prose-zinc dark:prose-invert max-w-none prose-lg mb-16" dangerouslySetInnerHTML={{ __html: article.content }} />
        
        {/* Comments Section */}
        <section id="comments" className="pt-10 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            Comments <span className="text-zinc-500 font-normal text-lg">({comments.length})</span>
          </h2>

          {user ? (
            <form onSubmit={handleCommentSubmit} className="mb-10 relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="What are your thoughts?"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 pr-16 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[120px] transition-all"
                required
              />
              <button 
                type="submit"
                className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
                disabled={!newComment.trim()}
              >
                <Send size={20} />
              </button>
            </form>
          ) : (
            <div className="mb-10 p-6 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl text-center">
              <p className="text-blue-800 dark:text-blue-300 mb-4">You must be signed in to join the discussion.</p>
              <button onClick={() => router.push('/login')} className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors">
                Sign In
              </button>
            </div>
          )}

          <div className="space-y-6">
            {comments.map((comment: any) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={comment._id} 
                className="flex gap-4 p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {comment.userId?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{comment.userId?.name || 'User'}</span>
                    <span className="text-xs text-zinc-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300">{comment.content}</p>
                </div>
              </motion.div>
            ))}
            
            {comments.length === 0 && (
              <div className="text-center py-10 text-zinc-500 italic">
                No comments yet. Be the first to share your thoughts!
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
