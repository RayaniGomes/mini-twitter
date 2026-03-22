import { create } from "zustand";
import { api } from "../services/api";

export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  authorName: string;
  authorId: string;
  createdAt?: Date;
  likesCount: number;
}

interface PostStore {
    posts: Post [];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    getPosts: (id: string) => void;
    createPost: (post: Post) => void;
    deletePost: (id: string) => void;
    updatePost: (id: string, post: Post) => void;
}

export const usePostStore = create<PostStore>((set) => ({
    posts: [],
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),

    getPosts: async (id: string) => {
        try {
            const response = await api.get(`/posts/${id}`);
            const data = Array.isArray(response.data) ? response.data : [response.data];
            set({ posts: data });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    },

    createPost: async (post: Post) => {
        try {
            const response = await api.post("/posts", post);
            set((state) => ({ posts: [response.data, ...state.posts] }));
        } catch (error) {
            console.error("Error creating post:", error);
        }
    },

    deletePost: async (id: string) => {
        try {
            await api.delete(`/posts/${id}`);
            set((state) => ({
                posts: state.posts.filter((p) => p.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    },

    updatePost: async (id: string, post: Post) => {
        try {
            const response = await api.put(`/posts/${id}`, post);
            set((state) => ({
                posts: state.posts.map((p) => (p.id === id ? response.data : p)),
            }));
        } catch (error) {
            console.error("Error updating post:", error);
        }
    },
}));