// src/components/PostCard.tsx
import { HeartIcon } from './Icons';

interface PostCardProps {
  name: string;
  handle: string;
  date: string;
  title: string;
  content: string;
  image?: {
    text: string;
    highlight: string;
    rest: string;
    bgColor: string;
  };
  liked?: boolean;
}

export function PostCard({ name, handle, date, title, content, image, liked }: PostCardProps) {
  return (
    <article className="w-full bg-[#1A2235] rounded-[12px] border border-[#62748E] p-4 flex flex-col gap-[8px]">
      <div className="flex items-center gap-[6px]">
        <span className="font-bold text-[16px] text-[#FFFFFF]">{name}</span>
        <span className="font-regular text-[14px] text-[#6E767D]">{handle}</span>
        <span className="font-regular text-[14px] text-[#6E767D]">&middot; {date}</span>
      </div>
      
      <h2 className="font-bold text-[18px] text-[#FFFFFF]">{title}</h2>
      
      <p className="font-regular text-[16px] text-[#CBD5E1] leading-relaxed">
        {content}
      </p>
      
      {image && (
        <div className={`mt-2 w-full max-w-[606px] h-48 rounded-[8px] flex flex-col items-center justify-center overflow-hidden`} style={{ backgroundColor: image.bgColor }}>
          <div className="text-white text-4xl font-bold flex items-center tracking-tight">
            {image.text}<span className="text-yellow-400">{image.highlight}</span>{image.rest}
          </div>
        </div>
      )}
      
      <div className="mt-2 flex items-center gap-2">
        <button className="hover:bg-[#EB5757]/10 p-2 rounded-full transition-colors -ml-2 flex items-center justify-center group cursor-pointer">
          <HeartIcon filled={liked} />
        </button>
      </div>
    </article>
  );
}
