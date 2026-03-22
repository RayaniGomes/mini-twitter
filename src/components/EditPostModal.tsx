import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdatePost } from '../hooks/usePosts';
import type { Post } from '../stores/postStore';

const editPostSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório').max(100),
  content: z.string().min(1, 'O conteúdo não pode ser vazio').max(280),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

type EditPostForm = z.infer<typeof editPostSchema>;

interface EditPostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export function EditPostModal({ post, isOpen, onClose }: EditPostModalProps) {
  const updatePostMutation = useUpdatePost();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPostForm>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      imageUrl: post.image || '',
    },
  });

  // Reset form when modal opens with new post data
  useEffect(() => {
    if (isOpen) {
      reset({
        title: post.title,
        content: post.content,
        imageUrl: post.image || '',
      });
    }
  }, [isOpen, post, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: EditPostForm) => {
    await updatePostMutation.mutateAsync({
      id: post.id,
      post: {
        title: data.title,
        content: data.content,
        image: data.imageUrl || null,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[480px] bg-card border border-edge rounded-[12px] p-6 shadow-2xl relative">
        <h2 className="text-[20px] font-bold text-heading mb-4">Editar Post</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label className="text-[14px] text-body mb-2 font-medium">Título</label>
          <input 
            {...register('title')}
            className="w-full h-[45px] bg-input border border-edge rounded-[8px] px-3 text-[14px] text-heading placeholder:text-placeholder focus:outline-none focus:border-brand mb-1 transition-colors duration-300"
          />
          {errors.title && <p className="text-heart text-xs mb-3">{errors.title.message}</p>}
          {!errors.title && <div className="mb-3" />}

          <label className="text-[14px] text-body mb-2 font-medium">Conteúdo</label>
          <textarea 
            {...register('content')}
            className="w-full bg-input border border-edge rounded-[8px] p-3 text-[14px] text-heading placeholder:text-placeholder min-h-[100px] resize-none focus:outline-none focus:border-brand mb-1 transition-colors duration-300"
          ></textarea>
          {errors.content && <p className="text-heart text-xs mb-3">{errors.content.message}</p>}
          {!errors.content && <div className="mb-3" />}

          <label className="text-[14px] text-body mb-2 font-medium">URL da Imagem (opcional)</label>
          <input 
            {...register('imageUrl')}
            className="w-full h-[45px] bg-input border border-edge rounded-[8px] px-3 text-[14px] text-heading placeholder:text-placeholder focus:outline-none focus:border-brand mb-1 transition-colors duration-300"
          />
          {errors.imageUrl && <p className="text-heart text-xs mb-4">{errors.imageUrl.message}</p>}
          {!errors.imageUrl && <div className="mb-4" />}

          <div className="flex justify-end gap-3 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              disabled={updatePostMutation.isPending}
              className="px-4 py-2 rounded-full border border-edge text-heading font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={updatePostMutation.isPending}
              className="bg-brand text-white font-bold px-6 py-2 rounded-full hover:bg-brand/90 transition-colors shadow-lg disabled:opacity-50"
            >
              {updatePostMutation.isPending ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
