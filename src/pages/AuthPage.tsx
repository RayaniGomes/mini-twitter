// src/pages/AuthPage.tsx
import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import type { AuthPageProps } from '../interfaces/global.interface';

type Tab = 'login' | 'cadastro';

export function AuthPage({ onNavigateHome }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('login');

  return (
    <div className="min-h-screen bg-surface dark:bg-[linear-gradient(116.82deg,#0F172B_0%,#070B14_100%)] flex flex-col items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-[480px]">

        <h1
          className="text-[36px] font-bold text-center text-logo cursor-pointer"
          onClick={onNavigateHome}
        >
          Mini Twitter
        </h1>

        <div className="mt-14">
          <div className="relative flex border-b border-edge">
            {(['login', 'cadastro'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 pb-3 text-[16px] font-bold text-center transition-all duration-150 border-b-2 -mb-px cursor-pointer ${
                  activeTab === tab
                    ? 'border-[#1DA1F2] text-heading'
                    : 'border-transparent text-muted hover:text-heading hover:border-[#1DA1F2]'
                }`}
                data-testid={`tab-${tab}`}
              >
                {tab === 'login' ? 'Login' : 'Cadastrar'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {activeTab === 'login' ? (
            <LoginForm onNavigateHome={onNavigateHome} />
          ) : (
            <RegisterForm onNavigateHome={onNavigateHome} />
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[12px] font-normal text-muted leading-relaxed">
            Ao continue, você concorda com os
          </p>
          <p className="text-[12px] font-normal text-muted">
            <a href="#" className="text-brand underline hover:text-[#0B7DD1] transition-colors">
              Termos de Serviço
         </a>
            {' '}e{' '}
            <a href="#" className="text-brand underline hover:text-[#0B7DD1] transition-colors">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
