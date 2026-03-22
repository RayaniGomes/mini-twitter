import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatePost } from '../hooks/usePosts';
import type { EditPostModalProps } from '../interfaces/post.interface';
import { editPostSchema, type EditPostForm } from '../schemas/postSchema';
import { Button } from './ui/Button';
import { InputField } from './ui/InputField';
import { TextareaField } from './ui/TextareaField';

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

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputField
            {...register('title')}
            id="edit-title"
            label="Título"
            error={errors.title?.message}
          />

          <TextareaField
            {...register('content')}
            id="edit-content"
            label="Conteúdo"
            className="min-h-[100px]"
            error={errors.content?.message}
          />

          <InputField
            {...register('imageUrl')}
            id="edit-image-url"
            label="URL da Imagem (opcional)"
            error={errors.imageUrl?.message}
          />

          <div className="flex justify-end gap-3 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={updatePostMutation.isPending}
              className="rounded-full"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updatePostMutation.isPending}
              className="rounded-full"
            >
              {updatePostMutation.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
