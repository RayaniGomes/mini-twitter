import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Navbar } from './Navbar';
import * as authStore from '../stores/authStore';
import * as postStore from '../stores/postStore';
import { api } from '../services/api';

vi.mock('../stores/authStore', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('../stores/postStore', () => ({
  usePostStore: vi.fn(),
}));

vi.mock('../services/api', () => ({
  api: {
    post: vi.fn(),
  }
}));

describe('Navbar', () => {
  const mockClearAuth = vi.fn();
  const mockSetSearchQuery = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(authStore.useAuthStore).mockReturnValue({
      user: null,
      clearAuth: mockClearAuth,
    } as any);

    vi.mocked(postStore.usePostStore).mockReturnValue({
      setSearchQuery: mockSetSearchQuery,
    } as any);
  });

  it('deve renderizar a navbar corretamente', () => {
    render(<Navbar onNavigateToAuth={() => {}} />);
    expect(screen.getByText('Mini Twitter')).toBeInTheDocument();
  });

  it('deve exibir botões de Login e Registrar quando deslogado', () => {
    render(<Navbar onNavigateToAuth={() => {}} />);
    expect(screen.getByText('Registrar-se')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('deve chamar onNavigateToAuth quando clicar no botão de auth', () => {
    const onNavigateToAuth = vi.fn();
    render(<Navbar onNavigateToAuth={onNavigateToAuth} />);
    
    fireEvent.click(screen.getByText('Registrar-se'));
    expect(onNavigateToAuth).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Login'));
    expect(onNavigateToAuth).toHaveBeenCalledTimes(2);
  });

  it('deve exibir nome de usuário e botão de logout se estiver logado', () => {
    vi.mocked(authStore.useAuthStore).mockReturnValue({
      user: { name: 'Test' },
      clearAuth: mockClearAuth,
    } as any);

    render(<Navbar onNavigateToAuth={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "Logout" })).toBeInTheDocument();
  });

  it('deve realizar logout ao clicar no ícone correspondente', async () => {
    vi.mocked(authStore.useAuthStore).mockReturnValue({
      user: { name: 'Test' },
      clearAuth: mockClearAuth,
    } as any);

    const onNavigateToAuth = vi.fn();
    render(<Navbar onNavigateToAuth={onNavigateToAuth} />);

    fireEvent.click(screen.getByRole('button', { name: "Logout" }));
    
    expect(mockClearAuth).toHaveBeenCalled();
    expect(onNavigateToAuth).toHaveBeenCalled();
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/logout');
    });
  });

  it('deve acionar setSearchQuery após debounce quando usuario digitar na busca', async () => {
    render(<Navbar onNavigateToAuth={() => {}} />);
    const searchInput = screen.getByPlaceholderText('Buscar por post...');
    
    fireEvent.change(searchInput, { target: { value: 'teste busca' } });
    
    // Como o debounce é de 500ms
    await waitFor(() => {
      expect(mockSetSearchQuery).toHaveBeenCalledWith('teste busca');
    }, { timeout: 1000 });
  });
});
