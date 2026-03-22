import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório').max(100),
  content: z.string().min(1, 'O conteúdo não pode ser vazio').max(280),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});
export type CreatePostForm = z.infer<typeof createPostSchema>;

export const editPostSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório').max(100),
  content: z.string().min(1, 'O conteúdo não pode ser vazio').max(280),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});
export type EditPostForm = z.infer<typeof editPostSchema>;
