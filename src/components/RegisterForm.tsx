import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormInputs } from "../schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../services/authApi";
import { InputField } from "./ui/InputField";
import { Button } from "./ui/Button";
import { Eye, Profile, Sms } from "iconsax-react";

export function RegisterForm({ onNavigateToLogin }: { onNavigateToLogin: () => void }) {
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
      await registerUser(data);
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
        <Button type="submit" disabled={isSubmitting} size="full">
          {isSubmitting ? 'Carregando...' : 'Continuar'}
        </Button>
      </div>
    </form>
  );
}