// src/pages/AuthPage.tsx
import { useState } from 'react';
import { Eye, EyeSlash, Profile, Sms } from 'iconsax-react';

type Tab = 'login' | 'cadastro';

/* ─── Reusable input field ─────────────────────────────── */
interface InputFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}

function InputField({ id, label, type, placeholder, icon, value, onChange, error }: InputFieldProps) {
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
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

/* ─── Login form ───────────────────────────────────────── */
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-[30px] font-bold text-logo">Olá, de novo!</h1>
        <p className="text-[16px] font-normal text-muted">
          Por favor, insira os seus dados para fazer login.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <InputField
          id="login-email"
          label="E-mail"
          type="email"
          placeholder="Insira o seu e-mail"
          icon={<Sms size={24} color="#62748E" />}
          value={email}
          onChange={setEmail}
        />
        <InputField
          id="login-password"
          label="Senha"
          type="password"
          placeholder="Insira a sua senha"
          icon={<Eye size={24} color="#62748E" />}
          value={password}
          onChange={setPassword}
        />
      </div>
    </>
  );
}

/* ─── Register form ────────────────────────────────────── */
function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-[30px] font-bold text-logo">Olá, vamos começar!</h1>
        <p className="text-[16px] font-normal text-muted">
          Por favor, insira os dados solicitados para fazer cadastro.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <InputField
          id="register-name"
          label="Nome"
          type="text"
          placeholder="Insira o seu nome"
          icon={<Profile size={24} color="#62748E" />}
          value={name}
          onChange={setName}
        />
        <InputField
          id="register-email"
          label="E-mail"
          type="email"
          placeholder="Insira o seu e-mail"
          icon={<Sms size={24} color="#62748E" />}
          value={email}
          onChange={setEmail}
        />
        <InputField
          id="register-password"
          label="Senha"
          type="password"
          placeholder="Insira a sua senha"
          icon={<Eye size={24} color="#62748E" />}
          value={password}
          onChange={setPassword}
        />
      </div>
    </>
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

        {/* ③ Form section (heading + inputs) */}
        <div className="mt-6">
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>

        {/* ④ CTA button */}
        <div className="mt-6">
          <button
            className="w-full h-[56px] bg-brand text-white text-[16px] font-bold rounded-full hover:bg-[#0B7DD1] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 shadow-[0px_4px_6px_-4px_rgba(13,147,242,0.2),0px_10px_15px_-3px_rgba(13,147,242,0.2)] transition-colors duration-150 cursor-pointer"
            onClick={() => {
              // Will call API here; for now navigate to home
              onNavigateHome();
            }}
          >
            Continuar
          </button>
        </div>

        {/* ⑤ TOS footer */}
        <div className="mt-6 text-center">
          <p className="text-[12px] font-normal text-muted leading-relaxed">
            Ao continuar, você concorda com os
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
