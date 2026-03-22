import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('deve renderizar o label corretamente passando pela prop valid children', () => {
    render(<Button>Comentar</Button>);
    expect(screen.getByRole('button', { name: /comentar/i })).toBeInTheDocument();
  });

  it('deve chamar a função onClick ao clicar', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Ação</Button>);
    fireEvent.click(screen.getByRole('button', { name: /ação/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('não deve chamar a função onClick quando estiver disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Postar</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('deve aplicar as classes corretas de acordo com a propriedade variant', () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    // Usamos o container de falllback para checar as classes do único botão renderizado
    const btn = container.querySelector('button');
    expect(btn?.className).toContain('border-edge');
  });
});
