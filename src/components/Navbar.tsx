// src/components/Navbar.tsx
import { SearchIcon } from './Icons';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0F172Bcc] border-b border-[#62748E] backdrop-blur-md h-[65px] flex items-center justify-between px-4 md:px-6 overflow-hidden">
      <h1 className="text-[16px] sm:text-[18px] font-bold text-[#FFFFFF] flex-shrink-0">Mini Twitter</h1>
      
      <div className="relative w-full max-w-[478px] hidden md:block mx-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#62748E]">
          <SearchIcon />
        </div>
        <input 
          type="text" 
          placeholder="Buscar por post..." 
          className="w-full bg-[#1D293D] border border-transparent rounded-[8px] py-2 pl-10 pr-4 text-[14px] font-medium text-[#CBD5E1] placeholder:text-[#62748E] focus:outline-none focus:border-[#0D93F2]"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <button className="text-[14px] sm:text-[16px] font-bold text-[#FFFFFF] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#62748E] hover:bg-white/5 transition-colors cursor-pointer">
          Registrar-se
        </button>
        <button className="text-[14px] sm:text-[16px] font-bold text-[#FFFFFF] bg-[#0D93F2] px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)] hover:bg-[#0D93F2]/90 transition-colors cursor-pointer">
          Login
        </button>
      </div>
    </header>
  );
}
