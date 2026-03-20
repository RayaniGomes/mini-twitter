// src/components/CreatePost.tsx
import { ImageIcon } from './Icons';

export function CreatePost() {
  return (
    <section className="w-full bg-[#1D293D] rounded-[12px] border border-[#2A3A50] p-4">
      <textarea 
        placeholder="E aí, o que está rolando?"
        className="w-full bg-transparent resize-none outline-none text-[18px] font-medium text-[#CBD5E1] placeholder:text-[#62748E] min-h-[80px]"
      ></textarea>
      
      <div className="h-px bg-[#2A3A50] w-full my-3"></div>
      
      <div className="flex items-center justify-between">
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors flex items-center justify-center cursor-pointer">
          <ImageIcon />
        </button>
        <button className="bg-[#0D93F2] text-[#FFFFFF] font-bold px-6 py-2 rounded-full hover:bg-[#0D93F2]/90 transition-colors shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)] cursor-pointer">
          Postar
        </button>
      </div>
    </section>
  );
}
