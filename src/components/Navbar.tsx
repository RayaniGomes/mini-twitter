// src/components/Navbar.tsx
import { SearchNormal1 } from 'iconsax-react';

interface NavbarProps {
  onNavigateToAuth: () => void;
}

export function Navbar({ onNavigateToAuth }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-nav border-b border-edge h-[65px] flex items-center justify-center px-4 md:px-6 overflow-hidden transition-colors duration-300">
      <div className="max-w-[1440px] flex items-center justify-between w-full">
        <h1 className="text-[16px] sm:text-[18px] font-bold text-logo shrink-0 transition-colors duration-300">Mini Twitter</h1>
        
        <div className="relative w-full max-w-[640px] hidden md:block mx-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
            <SearchNormal1 size={20} color="#62748E" />
          </div>  
          <input 
            type="text" 
            placeholder="Buscar por post..." 
            className="w-full bg-input border border-edge rounded-[8px] py-2 pl-10 pr-4 text-[14px] font-medium text-body placeholder:text-placeholder focus:outline-none focus:border-brand transition-colors duration-300"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={onNavigateToAuth}
            className="text-[14px] sm:text-[16px] font-bold text-heading dark:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-edge hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300 cursor-pointer"
          >
            Registrar-se
          </button>
          <button
            onClick={onNavigateToAuth}
            className="text-[14px] sm:text-[16px] font-bold text-white bg-brand px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)] hover:bg-[#0B7DD1] transition-colors duration-300 cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
