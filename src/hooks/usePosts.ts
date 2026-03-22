import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { Post } from '../stores/postStore';

export const PAGE_SIZE = 3;

export interface PostsPage {
  posts: Post[];
  nextPage: number | undefined;
}

export const postQueryKeys = {
  all: ['posts'] as const,
  list: (search?: string) => [...postQueryKeys.all, 'list', { search }] as const,
  detail: (id: string | number) => [...postQueryKeys.all, 'detail', id] as const,
};

export async function fetchPostsPage({ pageParam = 1, queryKey }: any): Promise<PostsPage> {
  const search = queryKey ? queryKey[2]?.search : undefined;

  const response = await api.get('/posts', {
    params: {
      page: pageParam,
      limit: PAGE_SIZE,
      ...(search ? { search } : {}),
    },
  });

  const posts: Post[] = Array.isArray(response.data)
    ? response.data
    : response.data?.posts || response.data?.data || [];

  const hasMore = posts.length === PAGE_SIZE;

  return {
    posts,
    nextPage: hasMore ? pageParam + 1 : undefined,
  };
}

export function usePostsFeed(searchQuery?: string) {
  return useInfiniteQuery({
    queryKey: postQueryKeys.list(searchQuery),
    queryFn: fetchPostsPage,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postData: Partial<Post>) => {
      const response = await api.post('/posts', postData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, post }: { id: string; post: Partial<Post> }) => {
      const response = await api.put(`/posts/${id}`, post);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
}

export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post(`/posts/${id}/like`);
      return response.data;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: postQueryKeys.all });
      
      const previousQueries = queryClient.getQueriesData({ queryKey: postQueryKeys.all });

      queryClient.setQueriesData({ queryKey: postQueryKeys.all }, (old: any) => {
        if (!old) return old;
        
        // Paginated infinite queries
        if (old.pages) {
          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              posts: page.posts.map((post: Post) => {
                if (post.id === id) {
                  return { ...post, likesCount: post.likesCount > 0 ? 0 : post.likesCount + 1 };
                }
                return post;
              }),
            })),
          };
        }
        
        // Single post array
        if (Array.isArray(old)) {
          return old.map((post: Post) => {
            if (post.id === id) {
              return { ...post, likesCount: post.likesCount > 0 ? 0 : post.likesCount + 1 };
            }
            return post;
          });
        }
        
        // Single post object
        if (old.id === id) {
          return { ...old, likesCount: old.likesCount > 0 ? 0 : old.likesCount + 1 };
        }
        
        return old;
      });

      return { previousQueries };
    },
    onError: (_err, _id, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, oldData]) => {
          queryClient.setQueryData(queryKey, oldData);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
}
