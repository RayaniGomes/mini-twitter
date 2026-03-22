import { api } from './api';
import type { Post } from '../interfaces/post.interface';

export const fetchPosts = (params: any) => api.get('/posts', { params });
export const createPost = (data: Partial<Post>) => api.post('/posts', data);
export const updatePost = (id: string, data: Partial<Post>) => api.put(`/posts/${id}`, data);
export const deletePost = (id: string) => api.delete(`/posts/${id}`);
export const likePost = (id: string) => api.post(`/posts/${id}/like`);
