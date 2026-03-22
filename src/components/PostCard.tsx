// src/components/PostCard.tsx
import { Heart, MoreCircle } from 'iconsax-react';
import { useState } from 'react';
import type { Post } from '../stores/postStore';
import { useLikePost, useDeletePost } from '../hooks/usePosts';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-toastify';
import { EditPostModal } from './EditPostModal';

function handle(authorName: string){
  const handle = "@" + authorName.toLowerCase().replace(" ", "");
  return handle;
}

function formatDate(createdAt: string){
  const dateObj = new Date(createdAt);
  const day = dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate();
  const month = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

export function PostCard(post: Post) {
  const { authorName, authorId, createdAt, title, content, image, likesCount, id } = post;
  const [imgError, setImgError] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutateAsync: deletePost } = useDeletePost();
  const { user, isAuthenticated } = useAuthStore();
  
  const isOwner = isAuthenticated() && user?.id === authorId;

  const handleLike = () => {
    if (!isAuthenticated()) {
      toast.warn("Você precisa estar autenticado para curtir um post.");
      return;
    }
    likePost(id);
  };

  const handleDelete = async () => {
    if (window.confirm("Certeza que deseja deletar este post?")) {
      try {
        await deletePost(id);
        toast.success("Post deletado!");
      } catch (err) {
        toast.error("Erro ao deletar post.");
      }
    }
    setShowDropdown(false);
  };

  return (
    <article className="w-full max-w-[640px] bg-card-post rounded-[12px] border border-edge p-4 flex flex-col gap-[8px] transition-colors duration-300">
      <div className='flex justify-between items-start'>
        <div className="flex items-center gap-[6px] flex-wrap">
          <span className="font-bold text-[16px] text-heading">{authorName}</span>
          <span className="font-regular text-[14px] text-muted">{handle(authorName)}</span>
          <span className="font-regular text-[14px] text-muted">{createdAt ? formatDate(createdAt.toString()) : ''}</span>
        </div>
        
        {isOwner ?  (
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer text-muted"
            >
              <MoreCircle size={24} color='white' className="rotate-90" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-edge rounded-[8px] shadow-lg overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => { setShowDropdown(false); setIsEditing(true); }}
                  className="w-full text-left px-4 py-2 text-[14px] text-heading hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Editar
                </button>
                <button 
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 text-[14px] text-heart hover:bg-heart/10 transition-colors cursor-pointer"
                >
                  Deletar
                </button>
              </div>
            )}
          </div>
        ):
        (
          <div className="relative">
            <button 
              onClick={() => toast.warn("Você não tem permissão para editar ou deletar este post.")}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200 cursor-pointer text-muted opacity-50"
            >
              <MoreCircle size={24} color='white' className="rotate-90" />
            </button>
          </div>
        )}
      </div>
      <h2 className="font-bold text-[18px] text-heading">{title}</h2>
      
      <p className="font-regular text-[16px] text-body leading-relaxed">
        {content}
      </p>
      
      {image && !imgError && (
        <img 
          src={image} 
          alt="Imagem do post" 
          className="w-full max-h-[300px] object-cover rounded-[8px] mt-[12px]"
          onError={() => setImgError(true)}
        />
      )}
      {image && imgError && (
        <div className="w-full h-48 rounded-[8px] mt-[12px] bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-500 border border-edge">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <span className="text-sm">Erro ao carregar imagem</span>
        </div>
      )}
      
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={handleLike}
          aria-label={likesCount ? 'Descurtir post' : 'Curtir post'}
          className="hover:bg-heart/10 p-2 rounded-full transition-all duration-200 hover:scale-110 -ml-2 flex items-center gap-1.5 justify-center cursor-pointer text-heart"
        >
          <Heart
            size={24}
            variant={likesCount ? 'Bold' : 'Linear'}
            color="#EB5757"
          />
          {likesCount > 0 && (
            <span className="font-medium text-[14px]">{likesCount}</span>
          )}
        </button>
      </div>
      
      <EditPostModal 
        post={post} 
        isOpen={isEditing} 
        onClose={() => setIsEditing(false)} 
      />
    </article>
  );
}
