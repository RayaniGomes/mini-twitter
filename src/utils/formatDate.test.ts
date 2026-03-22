import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('deve formatar uma string de data para DD/MM/YYYY', () => {
    // Para simplificarmos lidando com o fuso, vamos cravar valores no local usando ISO String aproximada 
    // ou passando Date de instâncias locais pra não quebrar tests em horários específicos.
    const dataLocal = new Date(2026, 3, 15); // Mês é 0 indexado, 3 significa Abril. 15 Abril 2026.
    expect(formatDate(dataLocal)).toBe('15/04/2026');
  });

  it('deve adicionar zero à esquerda para dias menores que 10', () => {
    const dataLocal = new Date(2026, 3, 5); // 05/04/2026
    expect(formatDate(dataLocal)).toBe('05/04/2026');
  });

  it('deve adicionar zero à esquerda para meses menores que 10', () => {
    const dataLocal = new Date(2026, 0, 15); // 15/01/2026
    expect(formatDate(dataLocal)).toBe('15/01/2026');
  });

  it('deve lidar com dias e meses de dois dígitos corretamente', () => {
    const dataLocal = new Date(2026, 11, 25); // Natal 2026: 25/12/2026
    expect(formatDate(dataLocal)).toBe('25/12/2026');
  });
});
