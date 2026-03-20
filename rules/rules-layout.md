1. ESTRUTURA GERAL
  - Tipo de interface: Web app — feed de rede social estilo Twitter/X
  - Orientação: Retrato (desktop, layout vertical centralizado)
  - Divisão de seções da pagina home:
    - Header (Navbar): Barra superior fixa com logo, campo de busca centralizado e botões de ação à direita
    - Body (Feed): Coluna central com largura máxima ~500px, centralizada horizontalmente, contendo:
      - Card de composição de post (Create Post)
      - Cards de posts individuais
      - Scroll infinito: Lista os posts do feed sem necessidade de botões de paginação, basta chegar ao final da lista que a próxima página é buscada
    - Footer: Barra inferior escura com texto "Mini Twitter"
    - Grid/Colunas: Layout de coluna única centralizada. Sem sidebar. O conteúdo principal fica em uma única coluna com max-width estimada em ~500px, com margens automáticas laterais.
    - Hierarquia visual: Navbar → Card de Criação → Cards de Posts → Paginação → Footer
  - Divisão de sessão da pagian de login/registro:
    -

2. TIPOGRAFIA
  - Logo (navbar): ~18px, Bold, #FFFFFF, esquerdo;
  - Botão "Registrar-se": ~16px, Bold, #FFFFFF, Centralizado;
  - Botão "Login": ~16px, Bold, #FFFFFF, Centralizado;
  - Placeholder input busca: ~14px, Medium, #62748E, Esquerdo;
  - Placeholder textarea: ~18px, Medium, #62748E, Esquerdo;
  - Nome do autor: ~16px, Bold, #FFFFFF, Esquerdo
  - Handle do autor: ~14px, Regular, #6E767D, Esquerdo;
  - Data: ~14px, Regular, #6E767D, Esquerdo;
  - Título do post: ~18px, Bold, #FFFFFF, Esquerdo;
  - Corpo do post: ~16px, Regular, #CBD5E1, Esquerdo;
  - Footer: ~18px, Bold, #FFFFFF, Esquerdo.
  - Fonte usada: Manrope.

3. CORES E PALETA
  - Paleta identificada:
  - Fundo global (body): linear-gradient(116.82deg, #0F172B 0%, #070B14 100%);
  - Fundo navbar: #0F172BCC;
  - Fundo footer: #0F172BCC;
  - Fundo dos cards:  background: #1D293D;
  - Borda dos cards: 1px solid #62748E;
  - Fundo input: #1D293D;
  - Texto primário: #FFFFFF;
  - Texto secundário: #6E767D;
  - Texto corpo post: #CBD5E1;
  - Botão primário: background: #0D93F2; box-shadow: 0px 4px 6px -4px #0D93F233, box-shadow: 0px 10px 15px -3px #0D93F233;
  - Botão "Registrar-se" (secundário): border: 1px solid #62748E;
  - Ícone curtir (ativo): #EB5757;
  - Ícone curtir (inativo): border: 1.5px solid #EB5757.

4. COMPONENTES E ELEMENTOS DE UI
  - Navbar
    - Altura estimada: ~65px
    - Fundo: #0F172BCC;
    - Borda: border-bottom: 1px solid #62748E;
    - Logo: "Mini Twitter" — texto simples, sem ícone;
    - Search bar: Input centralizado, ~640px de largura, borda arredondada (border-radius: ~8px), fundo levemente mais claro, ícone de lupa à esquerda (cor #1D293D);
    - Botão "Registrar-se": outline/ghost, borda branca fina, border-radius ~9999px, padding ~8px 16px;
    - Botão "Login": filled azul (#0D93F2), border-radius ~9999px, padding ~8px 16px.
    - Botão de logout: icone outline/ghost, borda branca fina, border-radius ~9999px, padding ~8px 16px, tamanho ~20px.

  - Card de Criação de Post
    - Fundo: #1D293D;
    - Border-radius: ~12px;
    - Border: 1px sólida #2A3A50;
    - Textarea: Fundo transparente, placeholder cinza, sem borda visível interna;
    - Linha divisória: separador horizontal sutil entre textarea e rodapé do card;
    - Ícone de imagem: outline, cor azul #1D9BF0, canto inferior esquerdo;
    - Botão "Postar": filled azul, border-radius ~8px, canto inferior direito.

  - Cards de Post
    - Fundo: #1A2235;
    - Border-radius: ~12px;
    - Border: 1px solid #62748E;
    - Padding interno: ~16px;
    - Cabeçalho: Nome (#FFFFFF) + handle (#6E767D) + data (#6E767D), na mesma linha;
    - Título: Bold, #FFFFFF, ~18px;
    - Corpo: Regular, #CBD5E1, ^16px;
    - Imagem (1º post): Retangular, ~606px largura fixa e ~200px altura, border-radius ~8px;
    - Ícone de curtida: Coração — estado ativo (preenchido vermelho #EB5757) e inativo (outline vermelho #EB5757). - Tamanho ~24px, posicionado abaixo do conteúdo.

  - Footer
    - Fundo: #0F172B;
    - Altura estimada: ~56px;
    - Apenas o texto "Mini Twitter" alinhado à esquerda.

5. ESPAÇAMENTO E DIMENSÕES
  - Largura máxima do feed: ~640px, centralizado com margin: 0 auto;
  - Padding horizontal do body: ~24px;
  - Gap entre cards: ~24px;
  - Padding interno dos cards: ~16px;
  - Padding top do feed (abaixo da navbar): ~24px;
  - Padding bottom (antes da paginação): ~24px;
  - Espaçamento entre nome/handle/data: ~6px horizontal;
  - Espaçamento entre título e corpo: ~8px;
  - Espaçamento entre corpo e ícone de curtida: ~8px.

6. EFEITOS VISUAIS
  - Bordas: 1px solid, cor ~#62748E, border-radius ~12px nos cards e ~9999px nos inputs/botões arredondados;
  - Sem glassmorphism ou blur visível;
  - Hover states: Não visíveis na imagem estática, mas esperados nos botões e ícones;
  - Transições implícitas: Troca de estado do ícone de curtida (outline → filled) sugere animação de escala ou fade;

7. RESPONSIVIDADE
  - O layout atual é claramente desktop-first:
  - A coluna central com max-width ~640px ficaria estreita demais em mobile sem ajustes
  - Em mobile, esperaria-se:
    - Navbar comprimida (logo some, busca vira ícone)
    - Cards ocupam 100% da largura da tela (com padding lateral de ~16px)
    - Botões de registro/login podem migrar para menu hambúrguer