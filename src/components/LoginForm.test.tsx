import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';
import * as authStore from '../stores/authStore';
import * as authApi from '../services/authApi';

vi.mock('../stores/authStore', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('../services/authApi', () => ({
  loginUser: vi.fn(),
}));

describe('LoginForm', () => {
  const mockSetAuth = vi.fn();
  const mockOnNavigateHome = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authStore.useAuthStore).mockReturnValue({
      setAuth: mockSetAuth,
    } as any);
  });

  it('deve renderizar os inputs, botões e textos principais', () => {
    render(<LoginForm onNavigateHome={mockOnNavigateHome} />);
    expect(screen.getByText('Olá, de novo!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Insira o seu e-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Insira a sua senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
  });

  it('deve exibir erros de validação aos submeter vazio', async () => {
    render(<LoginForm onNavigateHome={mockOnNavigateHome} />);
    fireEvent.click(screen.getByRole('button', { name: /continuar/i }));

    await waitFor(() => {
      // Considerando que o Zod schema define algumas mensagens padrões
      expect(screen.getByText('Formato de e-mail inválido')).toBeInTheDocument()
      // O texto da senha de 6 digitos vem do schema de authSchema.ts
      expect(screen.getByText('A senha deve ter no mínimo 6 caracteres')).toBeInTheDocument()
    });
  });

  it('deve chamar loginUser, setAuth e onNavigateHome ao logar com sucesso', async () => {
    vi.mocked(authApi.loginUser).mockResolvedValue({
      data: { token: 'fake-jwt', user: { id: 1, name: 'T' } }
    } as any);

    render(<LoginForm onNavigateHome={mockOnNavigateHome} />);
    fireEvent.change(screen.getByPlaceholderText('Insira o seu e-mail'), { target: { value: 'teste@email.com' } });
    fireEvent.change(screen.getByPlaceholderText('Insira a sua senha'), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /continuar/i }));

    await waitFor(() => {
      expect(authApi.loginUser).toHaveBeenCalledWith({ email: 'teste@email.com', password: '123456' });
    });

    expect(mockSetAuth).toHaveBeenCalledWith('fake-jwt', { id: 1, name: 'T' });
    expect(mockOnNavigateHome).toHaveBeenCalled();
  });

  it('deve exibir global error se a requisição falhar', async () => {
    vi.mocked(authApi.loginUser).mockRejectedValue({
      response: { data: { message: 'Credenciais Inválidas' } }
    });

    render(<LoginForm onNavigateHome={mockOnNavigateHome} />);
    fireEvent.change(screen.getByPlaceholderText('Insira o seu e-mail'), { target: { value: 'teste@email.com' } });
    fireEvent.change(screen.getByPlaceholderText('Insira a sua senha'), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: /continuar/i }));

    await waitFor(() => {
      expect(screen.getByText('Credenciais Inválidas')).toBeInTheDocument();
    });
  });
});
