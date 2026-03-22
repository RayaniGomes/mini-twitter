import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from './RegisterForm';
import * as authApi from '../services/authApi';
import * as authStore from '../stores/authStore';

vi.mock('iconsax-react', () => ({
  Eye: () => null,
  Profile: () => null,
  Sms: () => null,
}));

// Mock da API
vi.mock('../services/authApi', () => ({
  registerUser: vi.fn(),
  loginUser: vi.fn(),
}));

vi.mock('../stores/authStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('RegisterForm', () => {
  const mockOnNavigateHome = vi.fn();
  const mockSetAuth = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authStore.useAuthStore).mockReturnValue({
      setAuth: mockSetAuth,
    } as any);
  });

  it('deve renderizar o formulário de cadastro', () => {
    render(
      <RegisterForm
        onNavigateHome={mockOnNavigateHome}
      />
    );
    expect(screen.getByText('Olá, vamos começar!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Insira o seu nome')).toBeInTheDocument();
  });

  it('deve acionar auto-login e redirecionar para home quando sucesso', async () => {
    vi.mocked(authApi.registerUser).mockResolvedValueOnce({ status: 201, data: {} } as any);
    vi.mocked(authApi.loginUser).mockResolvedValueOnce({
      status: 200,
      data: { 
        token: 'fake-login-token', 
        user: { id: 2, name: 'Test User', email: 'test@email.com' } 
      }
    } as any);

    render(<RegisterForm onNavigateHome={mockOnNavigateHome} />);

    fireEvent.change(screen.getByPlaceholderText('Insira o seu nome'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Insira o seu e-mail'), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByPlaceholderText('Insira a sua senha'), { target: { value: '12345678' } }); // 8 chars

    fireEvent.click(screen.getByRole('button', { name: /continuar/i }));

    await waitFor(() => {
      expect(authApi.registerUser).toHaveBeenCalled();
      expect(authApi.loginUser).toHaveBeenCalledWith({ email: 'test@email.com', password: '12345678' });
      expect(mockSetAuth).toHaveBeenCalledWith('fake-login-token', expect.any(Object));
      expect(mockOnNavigateHome).toHaveBeenCalled();
    });
  });

  it('deve exibir falha centralizada como HTTP 400', async () => {
    vi.mocked(authApi.registerUser).mockRejectedValueOnce({ response: { status: 400 } });

    render(<RegisterForm onNavigateHome={mockOnNavigateHome} />);

    fireEvent.change(screen.getByPlaceholderText('Insira o seu nome'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Insira o seu e-mail'), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByPlaceholderText('Insira a sua senha'), { target: { value: '12345678' } }); // 8 chars

    fireEvent.click(screen.getByRole('button', { name: /continuar/i }));

    await waitFor(() => {
      expect(screen.getByText('E-mail já está em uso ou dados inválidos.')).toBeInTheDocument();
    });
  });
});
