// src/components/Pagination.tsx
export function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 py-8 text-muted font-medium">
      <button className="hover:text-heading px-2 transition-colors cursor-pointer">&lt;</button>
      <button className="w-[32px] h-[32px] rounded-full bg-brand text-white flex items-center justify-center transition-colors cursor-pointer">1</button>
      <button className="w-[32px] h-[32px] rounded-full hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer">2</button>
      <button className="w-[32px] h-[32px] rounded-full hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer">3</button>
      <span className="px-2">...</span>
      <button className="w-[32px] h-[32px] rounded-full hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-center transition-colors cursor-pointer">8</button>
      <button className="hover:text-heading px-2 transition-colors cursor-pointer">&gt;</button>
    </div>
  );
}
