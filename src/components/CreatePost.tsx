import { Gallery } from 'iconsax-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreatePost } from '../hooks/usePosts';
import { useAuthStore } from '../stores/authStore';

const createPostSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório').max(100),
  content: z.string().min(1, 'O conteúdo não pode ser vazio').max(280),
  imageUrl: z.string().url('URL inválida').optional().or(z.literal('')),
});

type CreatePostForm = z.infer<typeof createPostSchema>;

export function CreatePost() {
  const { user } = useAuthStore();
  const createPostMutation = useCreatePost();
  const [showImageInput, setShowImageInput] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostForm>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
      imageUrl: '',
    },
  });

  if (!user) {
    return null; // Oculta a criação se não estiver logado
  }

  const onSubmit = async (data: CreatePostForm) => {
    await createPostMutation.mutateAsync({
      title: data.title,
      content: data.content,
      image: data.imageUrl || undefined,
      authorName: user.name,
    });
    
    reset();
    setShowImageInput(false);
  };

  return (
    <section className="w-full bg-card rounded-[12px] border border-divider p-4 transition-colors duration-300">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input 
          {...register('title')}
          placeholder="Título do post"
          className="w-full bg-transparent outline-none text-[16px] font-bold text-heading placeholder:text-placeholder mb-2 transition-colors duration-300"
        />
        {errors.title && <p className="text-heart text-xs mb-2">{errors.title.message}</p>}

        <textarea 
          {...register('content')}
          placeholder="E aí, o que está rolando?"
          className="w-full bg-transparent resize-none outline-none text-[18px] font-medium text-body placeholder:text-placeholder min-h-[80px] transition-colors duration-300"
        ></textarea>
        {errors.content && <p className="text-heart text-xs mb-2">{errors.content.message}</p>}

        {showImageInput && (
          <div className="mt-2">
            <input 
              {...register('imageUrl')}
              placeholder="URL da imagem (opcional)"
              className="w-full h-10 bg-input border border-edge rounded-[8px] px-3 text-[14px] text-heading placeholder:text-placeholder focus:outline-none focus:border-brand"
            />
            {errors.imageUrl && <p className="text-heart text-xs mt-1">{errors.imageUrl.message}</p>}
          </div>
        )}

        <div className="h-px bg-divider w-full my-3 transition-colors duration-300"></div>
        
        <div className="flex items-center justify-between">
          <button 
            type="button" 
            onClick={() => setShowImageInput(!showImageInput)}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors flex items-center justify-center cursor-pointer"
          >
            <Gallery size={32} color="#1D9BF0" />
          </button>
          
          <button 
            type="submit" 
            disabled={createPostMutation.isPending}
            className="bg-brand text-white font-bold px-6 py-2 rounded-[8px] hover:bg-brand/90 transition-colors shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)] cursor-pointer disabled:opacity-50"
          >
            {createPostMutation.isPending ? 'Postando...' : 'Postar'}
          </button>
        </div>
      </form>
    </section>
  );
}
