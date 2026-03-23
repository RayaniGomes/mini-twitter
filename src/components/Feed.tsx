import { useEffect, useRef } from "react";
import { PostCard } from "./PostCard";
import { usePostStore } from "../stores/postStore";
import { usePostsFeed } from "../hooks/usePosts";

function PostSkeleton() {
  return (
    <div
      className="w-full bg-card-post rounded-[12px] border border-edge p-4 flex flex-col gap-3 animate-pulse"
      data-testid="post-skeleton"
    >
      <div className="flex items-center gap-2">
        <div className="h-4 w-28 rounded bg-edge" />
        <div className="h-4 w-20 rounded bg-edge" />
        <div className="h-4 w-24 rounded bg-edge" />
      </div>
      <div className="h-5 w-3/4 rounded bg-edge" />
      <div className="h-4 w-full rounded bg-edge" />
      <div className="h-4 w-5/6 rounded bg-edge" />
      <div className="h-6 w-6 rounded-full bg-edge mt-1" />
    </div>
  );
}

export function Feed() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { searchQuery } = usePostStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePostsFeed(searchQuery);

  const allPosts = data?.pages.flatMap((p) => p.posts) ?? [];

  // IntersectionObserver triggers fetchNextPage when sentinel enters viewport
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="text-center py-12 text-sm border border-heart text-heart bg-heart/10 rounded-lg">
        Erro ao carregar posts via API Axios. Verifique se o backend está rodando.
      </div>
    );
  }

  return (
    <>
      {/* Skeleton loaders on first load */}
      {isLoading && (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)}
        </div>
      )}

      {/* Post list */}
      {!isLoading && (
        <div className="flex flex-col gap-6">
          {allPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      )}

      {/* Sentinel: watched by IntersectionObserver */}
      <div ref={sentinelRef} className="flex items-center justify-center py-6">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted text-sm">
            <svg className="animate-spin w-5 h-5 text-brand" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            <span>Carregando mais posts...</span>
          </div>
        )}
        {!hasNextPage && !isLoading && allPosts.length > 0 && (
          <p className="text-muted text-sm">Você chegou ao fim do feed 🎉</p>
        )}
      </div>
    </>
  );
}