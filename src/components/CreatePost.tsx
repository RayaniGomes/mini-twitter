// src/components/CreatePost.tsx
import { ImageIcon } from './Icons';

export function CreatePost() {
  return (
    <section className="w-full bg-card rounded-[12px] border border-divider p-4 transition-colors duration-300">
      <textarea 
        placeholder="E aí, o que está rolando?"
        className="w-full bg-transparent resize-none outline-none text-[18px] font-medium text-body placeholder:text-placeholder min-h-[80px] transition-colors duration-300"
      ></textarea>
      
      <div className="h-px bg-divider w-full my-3 transition-colors duration-300"></div>
      
      <div className="flex items-center justify-between">
        <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors flex items-center justify-center cursor-pointer">
          <ImageIcon />
        </button>
        <button className="bg-brand text-white font-bold px-6 py-2 rounded-[8px] hover:bg-brand/90 transition-colors shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)] cursor-pointer">
          Postar
        </button>
      </div>
    </section>
  );
}
