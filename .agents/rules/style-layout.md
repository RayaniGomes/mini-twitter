---
trigger: always_on
---

## 1. ESTRUTURA GERAL

### Fonte Global

- **Família:** Manrope (Google Fonts)
- **Import:** `https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap`
- **Pesos utilizados:** 400 (Regular), 500 (Medium), 700 (Bold)
- Aplicar `font-family: 'Manrope', sans-serif` no elemento raiz (`body` ou `:root`).

### Tipo de Interface

Web app — feed de rede social estilo Twitter/X. Orientação retrato, layout vertical centralizado, desktop-first.

### Modo de Tema

- Usar a estratégia `class` do Tailwind CSS: `darkMode: 'class'` no `tailwind.config`.
- A classe `dark` é aplicada no elemento `<html>`.
- A preferência do usuário deve ser persistida no `localStorage` com a chave `theme`.
- Padrão inicial: **dark**.

### Página Home — Divisão de Seções

- **Navbar:** barra superior fixa (`position: sticky; top: 0; z-index: 50`) com logo à esquerda, barra de busca centralizada e botões à direita.
- **Feed:** coluna única centralizada, `max-width: 640px`, `margin: 0 auto`, `padding-top: 24px`, `padding-bottom: 24px`.
- **Footer:** barra inferior com texto "Mini Twitter" alinhado à esquerda.
- **Sem sidebar.** Layout de coluna única.
- **Hierarquia visual:** Navbar → Card de Criação → Cards de Posts (scroll infinito) → Footer.

### Página Login / Cadastro — Divisão de Seções

- Container central flutuante, `max-width: 480px`, sem card com fundo — flutua sobre o fundo global.
- Sem header ou footer estrutural.
- **Hierarquia visual:**
  1. Título "Mini Twitter" (destaque máximo)
  2. Tabs de navegação (Login / Cadastrar)
  3. Heading do formulário (`"Olá, de novo!"` no login / `"Olá, vamos começar!"` no cadastro)
  4. Campos de input
  5. Botão CTA "Continuar"
  6. Texto legal TOS (menor importância)

## 2. TIPOGRAFIA

- **Logo (navbar):** 18px, Bold, dark: #FFFFFF, light: #0D93F2;
- **Footer:** 18px, Bold, dark: #FFFFFF, light: #0D93F2;
- **Título do post:** 18px, Bold, dark: #FFFFFF, light: #314158;
- **Placeholder input:** 14px, Medium, #62748E;
- **Placeholder textarea:** 18px, Medium, #62748E;
- **Heading formulário (h1):** 30px, Bold, dark: #FFFFFF, light: #0D93F2
- **Heading formulário (p):** 16px, Regular, dark: #90A1B9, light: #62748E
- **Botão primario:** 16px, Bold, #FFFFFF;
- **Botão secundario:** 16px, Bold, #FFFFFF;
- **Nome do autor:** 16px, Bold, dark: #FFFFFF, light: #314158;
- **Corpo do post:** 16px, Regular, dark: #CBD5E1, light: #314158;
- **Handle do autor:** 14px, Regular, dark: #6E767D, light: #62748E;
- **Data:** 14px, Regular, dark: #6E767D, light: #62748E;

## 3. CORES E PALETA

### Tokens de Cor (definir como CSS variables no `:root` e `.dark`)

- `--color-bg-global`: dark: linear-gradient(116.82deg, #0F172B 0%, #070B14 100%), light: #FAFAFA;
- `--color-bg-navbar`: dark: #0F172B, light: #FAFAFA;
- `--color-bg-footer`: dark: #0F172B, light: #FAFAFA;
- `--color-bg-card`: dark: #1D293D, light: #FFFFFF;
- `--color-border`: dark: 1px solid #62748E, light: 1px solid #E2E8F0;
- `--color-bg-input`: dark: #1D293D, light: #FFFFFF;
- `--color-text-primary`: dark: #FFFFFF, light: #314158;
- `--color-text-secondary`: dark: #6E767D, light: #62748E;
- `--color-text-body`: dark: #CBD5E1, light: #314158;
- `--color-like`: #EB5757;

### Cores Fixas (independem do tema)

- **Botão primário (fundo):** `#0D93F2`
- **Botão primário (sombra):** box-shadow: 0px 4px 6px -4px #0D93F233, box-shadow: 0px 10px 15px -3px #0D93F233, border-radius: full;
- **Botão primário (hover):** `#0B7DD1` (10% mais escuro)
- **Botão sefundario (borda)**: #62748E;
- **Botão secundário (fundo)**: transparente
- **Ícone curtida ativo:** `fill: #EB5757`
- **Ícone curtida inativo:** `stroke: #EB5757`, sem preenchimento
- **Tab ativa (underline):** `#1DA1F2`

## 4. COMPONENTES E ELEMENTOS DE UI

### 4.1 Navbar

- **Altura:** 65px
- **Posição:** `sticky; top: 0; z-index: 50`
- **Borda:** border-bottom
- **Layout:** `flex; align-items: center; justify-content: space-between; padding: 0 24px`
- **Logo:**
  - Texto "Mini Twitter", sem ícone
  - Tipografia: 18px, Bold, cor `--color-brand` no light / `#FFFFFF` no dark
- **Search bar**
  - Largura: `max-width: 640px; width: 100%`
  - `border-radius: 8px`
  - Ícone de lupa à esquerda, tamanho 20px
  - Placeholder: "Buscar posts…"
  - Padding interno: `16px` (espaço para o ícone)
  - **Botões da Navbar (usuário não autenticado)**
    - "Registrar-se": ghost/outline, `border: 1px solid --color-border`, `border-radius: full`, `padding: 8px 16px`, 16px Bold
    - "Login": filled azul `#0D93F2`, `border-radius: full`, `padding: 8px 16px`, 16px Bold, cor texto `#FFFFFF`
  - **Botão de Logout (usuário autenticado)**
    - Ícone outline (ex: `LogOut` do Lucide), tamanho 20px
    - Ghost, `border-radius: full`, `padding: 8px`

### 4.2 Tabs de Navegação (Login / Cadastro)

- Dois itens lado a lado: "Login" e "Cadastrar"
- Cada tab ocupa 50% da largura do container
- **Estado ativo:** underline `border-bottom: 2px solid #1DA1F2`, texto `--color-text-primary`
- **Estado inativo:** sem underline, texto `--color-text-secondary`
- Sem fundo nas tabs — apenas texto e underline
- Linha divisória horizontal completa abaixo das tabs: `1px solid --color-border`
- **Hover (inativo):** underline `border-bottom: 2px solid #1DA1F2`, texto `--color-text-primary`

### 4.3 Card de Criação de Post

- **Border-radius:** 12px
- **Border:** 1px solid
- **Padding:** 16px
- **Textarea**
  - Placeholder: "O que está acontecendo?"
  - Mínimo 3 linhas de altura; expansível com o conteúdo
- **Rodapé do card (abaixo da linha divisória)**
  - Linha divisória: `1px solid #2A3A50`, `margin: 8px 0`
  - **Ícone de imagem** (canto esquerdo):
    - Ícone outline `Image`, tamanho 32px, cor `#1D9BF0`
    - Ao clicar: abre um a opção de carregar a imagem
- **Botão "Postar"** (canto direito):
  - mesma configurações do botão primario
  - **Hover:** `background: #0B7DD1`
  - **Desabilitado** (textarea vazio): `opacity: 0.5; cursor: not-allowed`

### 4.4 Cards de Post

- **Border-radius:** 12px;
- **Border:** 1px solid
- **Padding:** 16px;
- **Cabeçalho do card**
  - **Nome:** (#FFFFFF) + **handle** (#6E767D) + **data** (#6E767D), na mesma linha;
- **Conteúdo do card**
  - **Título:** Bold, #FFFFFF, 18px;
  - **Corpo:** Regular, #CBD5E1, ^16px;
  - **Imagem** (quando presente):
    - `width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-top: 12px`
    - Em caso de erro no carregamento: exibir placeholder cinza com ícone de imagem quebrada
    - **Rodapé do card**
      - Ícone de curtida:
        - Coração — estado ativo (preenchido vermelho #EB5757) e inativo (outline vermelho #EB5757). - Tamanho 24px, posicionado abaixo do conteúdo.
        - **Clique:** animação de escala `scale(1.2) → scale(1)` em 200ms (feedback visual da atualização otimista)

### 4.5 Inputs (Formulários de Login / Cadastro)

- **Estrutura:** Label acima + input com ícone à direita;
- **Label:** 14px, Regular, `--color-text-primary`, `margin-bottom: 6px`
- **Altura:** 57px estimada;
- **Border-radius:** 8px;
- **Border:** 1px solid
- **Padding:** 16px
- **Cor do texto digitado:** `--color-text-primary`
- **Placeholder:** 14px, Regular, `--color-text-secondary`
- **Ícones:** tamanho 24px, cor #62748E;
  - Campo senha: ícone de olho (`Eye` / `EyeOff`) para mostrar/ocultar
- **Erro:** `border-color: #EB5757`; mensagem de erro abaixo do input, 12px, Regular, `#EB5757`

### 4.6 Botão CTA "Continuar"

- **Largura:** 100% do container;
- **Altura:** 56px;
- **Border-radius**: full;
- Configurações de cor e texto de botão primario.

### 4.7 TOS Footer (Termos de Serviço)

- **Texto:** "Ao continuar, você concorda com os"
- **Links inline:** "Termos de Serviço" e "Política de Privacidade"
- Centralizados, quebra de linha entre a frase e os links
- **Estilo dos links:** `text-decoration: underline`, cor `#0D93F2`
- **Tamanho:** 12px, Regular, `--color-text-secondary`

### 4.8 Footer

- **Altura:** 56px;
- Apenas o texto "Mini Twitter" alinhado à esquerda.

## 5. ESPAÇAMENTO E DIMENSÕES

### Página Home

- **Largura máxima do feed:** 640px, centralizado com margin: 0 auto
- **Gap entre cards:** 24px
- **Padding interno dos cards:** 16px
- **Padding top do feed (abaixo da navbar):** 24px
- **Padding bottom (antes da paginação):** 24px
- **Espaçamento entre nome/handle/data:** 6px horizontal
- **Espaçamento entre título e corpo:** 8px
- **Espaçamento entre corpo e ícone de curtida:** 8px

### Página Login / Cadastro

- **Container central:** 480px
- **Gap entre título e tabs:** 56px
- **Gap entre tabs, heading e form:** 24px
- **Gap entre inputs do form:** 20px
- **Gap entre último input, botão CTA e TOS footer:** 24px

## 6. ESTADOS E EFEITOS VISUAIS

### Hover States (obrigatórios)

| Elemento                 | Efeito                               |
| ------------------------ | ------------------------------------ |
| Botão primário           | `background: #0B7DD1`                |
| Botão secundário / ghost | `background: rgba(255,255,255,0.05)` |
| Card de post             | `border-color: #0D93F2`              |
| Ícone de curtida         | `transform: scale(1.1)`              |
| Ícone editar             | `color: #0D93F2`                     |
| Ícone deletar            | `color: #EB5757`                     |
| Links TOS                | `color: #0B7DD1`                     |
| Input busca              | `border-color: #0D93F2`              |

### Focus States (obrigatórios)

| Elemento      | Efeito                                                   |
| ------------- | -------------------------------------------------------- |
| Input (todos) | `border-color: #0D93F2; box-shadow: 0 0 0 2px #0D93F233` |
| Botões        | `outline: 2px solid #0D93F2; outline-offset: 2px`        |

### Transições

- **Padrão global:** `transition: all 150ms ease`
- **Ícone de curtida (clique):** `transform: scale(1.2)` → `scale(1)` em 200ms
- **Troca de tema:** sem transição brusca — aplicar `transition: background-color 200ms ease, color 200ms ease` no `body`
- **Sem glassmorphism ou blur.**

### Animações de Loading

- **Skeleton loader** nos cards de post durante o carregamento inicial: retângulos com `background: --color-border`, animação `pulse` do Tailwind.
- **Spinner** no botão CTA durante submit do formulário.

## 7. RESPONSIVIDADE

O layout é **desktop-first**. Breakpoints usando Tailwind:

## Mobile (`< 640px`)

- Feed ocupa 100% da largura com `padding: 0 16px`
- Navbar: logo some, busca vira ícone de lupa clicável, botões de ação viram menu hambúrguer ou ícones
- Cards de post: `border-radius: 0` (full bleed) ou mantém `12px` com padding lateral
- Container de login: `width: 100%; padding: 24px`

### Tablet (`640px – 1024px`)

- Feed mantém `max-width: 640px` centralizado
- Navbar exibe logo + busca comprimida + botões de ação

### Desktop (`> 1024px`)

- Layout completo conforme especificado nas seções anteriores
- Navbar exibe todos os elementos em plena largura

## 8. ACESSIBILIDADE

- Todos os botões devem ter `aria-label` descritivo quando não possuem texto visível (ex: botão de logout, ícones de editar/deletar).
- Inputs devem ter `id` e `htmlFor` associando label ao campo.
- Ícone de curtida: `aria-label="Curtir post"` / `aria-label="Descurtir post"` conforme estado.
- Contraste mínimo de texto: 4.5:1 (WCAG AA).
- Navegação por teclado: todos os elementos interativos devem ser focáveis com `Tab` e ativáveis com `Enter`/`Space`.
