import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

describe('InputField', () => {
  it('deve renderizar normalmente com placeholder fornecido', () => {
    render(<InputField id="email" placeholder="Digite algo" />);
    expect(screen.getByPlaceholderText('Digite algo')).toBeInTheDocument();
  });

  it('deve renderizar e mapear um label ao input se id e label forem fornecidos', () => {
    render(<InputField id="email" label="E-mail" placeholder="E-mail" />);
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro quando propriedade error for enviada', () => {
    render(<InputField id="nome" placeholder="Nome" error="Campo super obrigatório" />);
    expect(screen.getByText('Campo super obrigatório')).toBeInTheDocument();
  });

  it('deve alterar o tipo de input de password para text quando clicar no toggle do olho', () => {
    render(<InputField id="password" type="password" placeholder="Senha" />);
    const input = screen.getByPlaceholderText('Senha') as HTMLInputElement;
    expect(input.type).toBe('password');

    // Clicar no botão do olho - pegamos o botão pelo aria-label ou role
    const toggleButton = screen.getByRole('button', { name: /mostrar senha/i });
    fireEvent.click(toggleButton);

    expect(input.type).toBe('text');
    expect(screen.getByRole('button', { name: /ocultar senha/i })).toBeInTheDocument();
  });
});
