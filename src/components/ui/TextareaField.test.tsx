import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextareaField } from './TextareaField';

describe('TextareaField', () => {
  it('deve renderizar o textarea corretamente com placeholder e valor inicial', () => {
    render(<TextareaField id="descricao" placeholder="Escreva aqui..." defaultValue="Olá!" />);
    const textarea = screen.getByPlaceholderText('Escreva aqui...') as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toBe('Olá!');
  });

  it('deve propagar a mudança de valores como esperado (acionar onChange)', () => {
    const handleChange = vi.fn();
    render(<TextareaField id="descricao" placeholder="O que tem na mente?" onChange={handleChange} />);
    const textarea = screen.getByPlaceholderText('O que tem na mente?');
    
    fireEvent.change(textarea, { target: { value: 'Nova ideia' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('deve exibir o componente label conectado via ID', () => {
    render(<TextareaField id="descricao" label="Descrição" />);
    expect(screen.getByLabelText('Descrição')).toBeInTheDocument();
  });

  it('deve exibir as mensagens de erro', () => {
    render(<TextareaField id="descricao" error="O texto está curto demais" />);
    expect(screen.getByText('O texto está curto demais')).toBeInTheDocument();
  });
});
