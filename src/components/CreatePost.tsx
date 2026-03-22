import { Gallery } from 'iconsax-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePost } from '../hooks/usePosts';
import { useAuthStore } from '../stores/authStore';
import { createPostSchema, type CreatePostForm } from '../schemas/postSchema';
import { Button } from './ui/Button';
import { InputField } from './ui/InputField';
import { TextareaField } from './ui/TextareaField';

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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <InputField 
          {...register('title')}
          id="post-title"
          placeholder="Título do post"
          error={errors.title?.message}
          borderless
        />

        <TextareaField 
          {...register('content')}
          id="post-content"
          placeholder="E aí, o que está rolando?"
          className="min-h-[80px]"
          error={errors.content?.message}
          borderless
        />

        {showImageInput && (
          <InputField 
            {...register('imageUrl')}
            id="post-image-url"
            placeholder="URL da imagem (opcional)"
            error={errors.imageUrl?.message}
          />
        )}

        <div className="h-px bg-divider w-full mt-2 mb-1 transition-colors duration-300"></div>
        
        <div className="flex items-center justify-between">
          <Button 
            type="button" 
            variant="ghost"
            onClick={() => setShowImageInput(!showImageInput)}
            className="p-2 flex items-center justify-center rounded-full"
          >
            <Gallery size={32} color="#1D9BF0" />
          </Button>
          
          <Button 
            type="submit" 
            disabled={createPostMutation.isPending}
            className="px-6 rounded-[8px]"
          >
            {createPostMutation.isPending ? 'Postando...' : 'Postar'}
          </Button>
        </div>
      </form>
    </section>
  );
}
