import { create } from "zustand";
import type { Post, PostStore } from '../interfaces/post.interface';
import { createPost, deletePost, fetchPosts, updatePost } from "../services/postsApi";

export const usePostStore = create<PostStore>((set) => ({
    posts: [],
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),

    getPosts: async (id: string) => {
        try {
            const response = await fetchPosts(id);
            const data = Array.isArray(response.data) ? response.data : [response.data];
            set({ posts: data });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    },

    createPost: async (post: Post) => {
        try {
            const response = await createPost(post);
            set((state) => ({ posts: [response.data, ...state.posts] }));
        } catch (error) {
            console.error("Error creating post:", error);
        }
    },

    deletePost: async (id: string) => {
        try {
            await deletePost(id);
            set((state) => ({
                posts: state.posts.filter((p) => p.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    },

    updatePost: async (id: string, post: Post) => {
        try {
            const response = await updatePost(id, post);
            set((state) => ({
                posts: state.posts.map((p) => (p.id === id ? response.data : p)),
            }));
        } catch (error) {
            console.error("Error updating post:", error);
        }
    },
}));