import { describe, it, expect } from 'vitest';
import { formatHandle, formatName } from './formatHandle';

describe('formatHandle', () => {
  it('deve adicionar arroba (@) e remover espaço convertendo para letras minúsculas', () => {
    expect(formatHandle('Usuario Teste')).toBe('@usuarioteste');
    expect(formatHandle('Outro Novo')).toBe('@outronovo');
  });

  it('deve manter arroba apenas no começo quando só existir um espaço', () => {
    expect(formatHandle('Nome')).toBe('@nome');
  });
});

describe('formatName', () => {
  it('deve pegar o primeiro nome e colocar a inicial em maiúsculo', () => {
    expect(formatName('teste da silva')).toBe('Teste');
    expect(formatName('NOME COMPLETO')).toBe('Nome');
  });

  it('deve retornar string vazia se undefined ou vazio', () => {
    expect(formatName('')).toBe('');
    // @ts-expect-error testando um edge-case forçado que acontece as vezes em js
    expect(formatName(undefined)).toBe('');
  });
});
