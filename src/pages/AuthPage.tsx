// src/pages/AuthPage.tsx
import React from 'react';
import { useState } from 'react';
import { Eye, EyeSlash, Profile, Sms } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../services/api';
import { useAuthStore } from '../stores/authStore';

type Tab = 'login' | 'cadastro';

/* ─── Reusable input field ─────────────────────────────── */
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
}

// Forward ref wrapper to work with react-hook-form
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, type, placeholder, icon, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="flex flex-col gap-[6px]">
        <label htmlFor={id} className="text-[14px] font-normal text-heading">
          {label}
        </label>
        <div className="relative">
          <input
            {...props}
            ref={ref}
            id={id}
            type={inputType}
            placeholder={placeholder}
            className={`w-full h-[57px] bg-input border ${
              error ? 'border-heart' : 'border-edge'
            } rounded-[8px] px-4 pr-12 text-[14px] font-normal text-heading placeholder:text-placeholder focus:outline-none focus:border-brand focus:shadow-[0_0_0_2px_rgba(13,147,242,0.2)] transition-all duration-150`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">
            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                className="flex items-center justify-center text-muted hover:text-heading transition-colors cursor-pointer"
              >
                {showPassword ? <EyeSlash size={24} color="#62748E" /> : <Eye size={24} color="#62748E" />}
              </button>
            ) : (
              icon
            )}
          </div>
        </div>
        {error && <p className="text-[12px] font-normal text-heart">{error}</p>}
      </div>
    );
  }
);
InputField.displayName = 'InputField';

/* ─── Schemas ────────────────────────────────────────── */
const loginSchema = z.object({
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});
type LoginFormInputs = z.infer<typeof loginSchema>;

const registerSchema = z.object({
  name: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});
type RegisterFormInputs = z.infer<typeof registerSchema>;

/* ─── Login form ───────────────────────────────────────── */
function LoginForm({ onNavigateHome }: { onNavigateHome: () => void }) {
  const { setAuth } = useAuthStore();
  const [globalError, setGlobalError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setGlobalError('');
    try {
      const response = await api.post('/auth/login', data);
      const { token, user } = response.data;
      setAuth(token, user);
      onNavigateHome();
    } catch (error: any) {
      setGlobalError(error.response?.data?.message || 'Erro ao realizar login. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contents">
      <div className="flex flex-col gap-1">
        <h1 className="text-[30px] font-bold text-logo">Olá, de novo!</h1>
        <p className="text-[16px] font-normal text-muted">
          Por favor, insira os seus dados para fazer login.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {globalError && <div className="p-3 bg-heart/10 text-heart text-sm rounded-lg border border-heart/20">{globalError}</div>}
        <InputField
          {...register('email')}
          id="login-email"
          label="E-mail"
          type="email"
          placeholder="Insira o seu e-mail"
          icon={<Sms size={24} color="#62748E" />}
          error={errors.email?.message}
        />
        <InputField
          {...register('password')}
          id="login-password"
          label="Senha"
          type="password"
          placeholder="Insira a sua senha"
          icon={<Eye size={24} color="#62748E" />}
          error={errors.password?.message}
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[56px] bg-brand text-white text-[16px] font-bold rounded-full hover:bg-[#0B7DD1] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)] transition-colors duration-150 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Carregando...' : 'Continuar'}
        </button>
      </div>
    </form>
  );
}

/* ─── Register form ────────────────────────────────────── */
function RegisterForm({ onNavigateToLogin }: { onNavigateToLogin: () => void }) {
  const [globalError, setGlobalError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setGlobalError('');
    try {
      await api.post('/auth/register', data);
      // Após sucesso, vai para tela de login
      onNavigateToLogin();
    } catch (error: any) {
      if (error.response?.status === 400) {
        setGlobalError('E-mail já está em uso ou dados inválidos.');
      } else {
        setGlobalError(error.response?.data?.message || 'Erro ao realizar cadastro.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contents">
      <div className="flex flex-col gap-1">
        <h1 className="text-[30px] font-bold text-logo">Olá, vamos começar!</h1>
        <p className="text-[16px] font-normal text-muted">
          Por favor, insira os dados solicitados para fazer cadastro.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {globalError && <div className="p-3 bg-heart/10 text-heart text-sm rounded-lg border border-heart/20">{globalError}</div>}
        <InputField
          {...register('name')}
          id="register-name"
          label="Nome"
          type="text"
          placeholder="Insira o seu nome"
          icon={<Profile size={24} color="#62748E" />}
          error={errors.name?.message}
        />
        <InputField
          {...register('email')}
          id="register-email"
          label="E-mail"
          type="email"
          placeholder="Insira o seu e-mail"
          icon={<Sms size={24} color="#62748E" />}
          error={errors.email?.message}
        />
        <InputField
          {...register('password')}
          id="register-password"
          label="Senha"
          type="password"
          placeholder="Insira a sua senha"
          icon={<Eye size={24} color="#62748E" />}
          error={errors.password?.message}
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[56px] bg-brand text-white text-[16px] font-bold rounded-full hover:bg-[#0B7DD1] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)] transition-colors duration-150 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Carregando...' : 'Continuar'}
        </button>
      </div>
    </form>
  );
}

/* ─── Auth page ────────────────────────────────────────── */
interface AuthPageProps {
  onNavigateHome: () => void;
}

export function AuthPage({ onNavigateHome }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('login');

  return (
    <div className="min-h-screen bg-surface dark:bg-[linear-gradient(116.82deg,#0F172B_0%,#070B14_100%)] flex flex-col items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-[480px]">

        {/* ① Title */}
        <h1
          className="text-[36px] font-bold text-center text-logo cursor-pointer"
          onClick={onNavigateHome}
        >
          Mini Twitter
        </h1>

        {/* ② Gap 56px + Tabs */}
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
              >
                {tab === 'login' ? 'Login' : 'Cadastrar'}
              </button>
            ))}
          </div>
        </div>

        {/* ③ Form section */}
        <div className="mt-6">
          {activeTab === 'login' ? (
            <LoginForm onNavigateHome={onNavigateHome} />
          ) : (
            <RegisterForm onNavigateToLogin={() => setActiveTab('login')} />
          )}
        </div>

        {/* ⑤ TOS footer */}
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
