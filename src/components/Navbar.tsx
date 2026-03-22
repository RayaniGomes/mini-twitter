// src/components/Navbar.tsx
import { SearchNormal1, LogoutCurve } from 'iconsax-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { usePostStore } from '../stores/postStore';
import { api } from '../services/api';
import type { NavbarProps } from '../interfaces/global.interface';
import { formatName } from '../utils/formatHandle';
import { Button } from './ui/Button';

export function Navbar({ onNavigateToAuth }: NavbarProps) {
  const { user, clearAuth } = useAuthStore();
  const { setSearchQuery } = usePostStore();
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 500);
    return () => clearTimeout(handler);
  }, [localSearch, setSearchQuery]);

  const handleLogout = async () => {
    clearAuth();
    onNavigateToAuth(); 

    try {
      await api.post('/auth/logout');
    } catch (e) {
      console.error('Erro ao fazer logout na API', e);
    }
  };

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
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Buscar por post..." 
            className="w-full bg-input border border-edge rounded-[8px] py-2 pl-10 pr-4 text-[14px] font-medium text-body placeholder:text-placeholder focus:outline-none focus:border-brand transition-colors duration-300"
            data-testid="input-search"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {user ? (
            <>
              <span className="text-[14px] sm:text-[16px] font-regular text-heading dark:text-white">{formatName(user.name)}</span>
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className=" flex items-center gap-2 hover:opacity-80 p-2 rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 bg-brand dark:bg-transparent"
                data-testid="btn-logout"
              >
                <LogoutCurve size={20} color="white" />
              </button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={onNavigateToAuth}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[14px] sm:text-[16px]"
                data-testid="btn-register-nav"
              >
                Registrar-se
              </Button>
              <Button
                onClick={onNavigateToAuth}
                className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[14px] sm:text-[16px]"
                data-testid="btn-login-nav"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
