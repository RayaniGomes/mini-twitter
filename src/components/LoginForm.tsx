import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormInputs } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../services/authApi";
import { InputField } from "./ui/InputField";
import { Button } from "./ui/Button";
import { Eye, Sms } from "iconsax-react";

export function LoginForm({ onNavigateHome }: { onNavigateHome: () => void }) {
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
      const response = await loginUser(data);
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
        <Button type="submit" disabled={isSubmitting} size="full">
          {isSubmitting ? 'Carregando...' : 'Continuar'}
        </Button>
      </div>
    </form>
  );
}