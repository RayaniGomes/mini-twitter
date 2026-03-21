// src/App.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { CreatePost } from './components/CreatePost';
import { PostCard } from './components/PostCard';
import { Footer } from './components/Footer';
import { AuthPage } from './pages/AuthPage';
import { MOCK_POSTS, PAGE_SIZE, type Post } from './data/mockPosts';
import { Moon, Sun1 } from 'iconsax-react';

type Page = 'home' | 'auth';

function AppContent() {
  const { isDark, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // ── Infinite scroll state ──────────────────────────────────────────
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(MOCK_POSTS.length > PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const nextPage = page + 1;
    const nextPosts = MOCK_POSTS.slice(0, nextPage * PAGE_SIZE);
    setPosts(nextPosts);
    setPage(nextPage);
    setHasMore(nextPosts.length < MOCK_POSTS.length);
    setLoading(false);
  }, [loading, hasMore, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || currentPage !== 'home') return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, currentPage]);
  // ──────────────────────────────────────────────────────────────────

  if (currentPage === 'auth') {
    return (
      <>
        <AuthPage onNavigateHome={() => setCurrentPage('home')} />
        {/* Floating theme toggle — available on all pages */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-nav border border-edge text-muted shadow-lg hover:scale-110 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer"
        >
          {isDark ? <Sun1 size={20} color="#62748E" /> : <Moon size={20} color="#62748E" />}
        </button>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface dark:bg-[linear-gradient(116.82deg,#0F172B_0%,#070B14_100%)] text-heading font-sans antialiased transition-colors duration-300">
      <Navbar onNavigateToAuth={() => setCurrentPage('auth')} />

      <main className="flex-1 w-full max-w-[640px] mx-auto px-6 py-6 flex flex-col gap-6">
        <CreatePost />

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        {/* Sentinel */}
        <div ref={sentinelRef} className="flex items-center justify-center py-6">
          {loading && (
            <div className="flex items-center gap-2 text-muted text-sm">
              <svg className="animate-spin w-5 h-5 text-brand" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span>Carregando mais posts...</span>
            </div>
          )}
          {!hasMore && !loading && (
            <p className="text-muted text-sm">Você chegou ao fim do feed 🎉</p>
          )}
        </div>
      </main>

      <Footer />

      {/* Floating theme toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-nav border border-edge text-muted shadow-lg hover:scale-110 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 cursor-pointer"
      >
        {isDark ? <Sun1 size={20} color="#62748E" /> : <Moon size={20} color="#62748E" />}
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
