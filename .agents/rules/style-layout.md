---
trigger: always_on
---

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
    - Container central único com largura máxima estimada em ~450px
    - Sem header ou footer estrutural — tudo dentro do card/área central
    - Hierarquia visual:
      - Título "Mini Twitter" (topo, destaque máximo);
      - Tabs de navegação (Login / Cadastrar);
      - Heading do formulário (login: "Olá, de novo!", cadastro: "Olá, vamos começar!");
      - Campos de input;
      - Botão CTA (Continuar);
      - Texto legal (menor importância);


2. TIPOGRAFIA
  - Logo (navbar): ~18px, Bold, dark: #FFFFFF, light: #0D93F2;
  - Botão primario: ~16px, Bold, #FFFFFF;
  - Botão secundario: ~16px, Bold, #FFFFFF;
  - Bordar: dark: 1px solid #62748E, light: 1px solid #E2E8F0;
  - Placeholder input busca: ~14px, Medium, #62748E;
  - Placeholder textarea: ~18px, Medium, #62748E;
  - Nome do autor: ~16px, Bold, dark: #FFFFFF, light: #314158;
  - Handle do autor: ~14px, Regular, dark: #6E767D, light: #62748E;
  - Data: ~14px, Regular, dark: #6E767D, light: #62748E;
  - Título do post: ~18px, Bold, dark: #FFFFFF, light: #314158;
  - Corpo do post: ~16px, Regular, dark: #CBD5E1, light: #314158;
  - Footer: ~18px, Bold, dark: #FFFFFF, light: #0D93F2;
  - Fonte usada: Manrope.

3. CORES E PALETA
  - Paleta identificada:
  - Fundo global (body): dark: linear-gradient(116.82deg, #0F172B 0%, #070B14 100%), light: #FAFAFA;
  - Fundo navbar: dark: #0F172B, light: #FAFAFA;
  - Fundo footer: dark: #0F172B, light: #FAFAFA;
  - Fundo dos cards:  dark: #1D293D, light: #FFFFFF;
  - Borda dos cards: dark: 1px solid #62748E, light: 1px solid #E2E8F0;
  - Fundo input: dark: #1D293D, light: #FFFFFF;
  - Borda input: dark: 1px solid #62748E, light: 1px solid #E2E8F0;
  - Texto primário: dark: #FFFFFF, light: #314158;
  - Texto secundário: dark: #6E767D, light: #62748E;
  - Texto corpo post: dark: #CBD5E1, light: #314158;
  - Botão primário: background: #0D93F2; box-shadow: 0px 4px 6px -4px #0D93F233, box-shadow: 0px 10px 15px -3px #0D93F233, border-radius: full;
  - Botão "Registrar-se" (secundário): border: 1px solid #62748E;
  - Ícone curtir (ativo): #EB5757;
  - Ícone curtir (inativo): border: 1.5px solid #EB5757.

4. COMPONENTES E ELEMENTOS DE UI
  - Navbar
    - Altura estimada: ~65px;
    - Borda: border-bottom;
    - Logo: "Mini Twitter" — texto simples, sem ícone;
    - Search bar: Input centralizado, ~640px de largura, borda arredondada (border-radius: ~8px), fundo levemente mais claro, ícone de lupa à esquerda (cor #1D293D);
    - Botão "Registrar-se": outline/ghost, border-radius full, padding ~8px 16px;
    - Botão "Login": filled azul (#0D93F2), border-radius full, padding ~8px 16px.
    - Botão de logout: icone outline/ghost, border-radius full, padding ~8px 16px, tamanho ~20px.

  - Tabs de navegação (Login/Cadastro)
    - Dois itens: "Login" (ativo) e "Cadastrar" (inativo);
    - Active dos botoes de navegacçao é um underline azul embaixo do item ativo, largura total da tab;
    - Linha divisória horizontal completa em tom escuro;
    - Indicador ativo: linha azul #1DA1F2 embaixo do item ativo, largura total da tab;
    - Sem fundo nas tabs — apenas texto e underline.

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

  - Inputs
    - Estrutura: Label acima + input com ícone à direita;
    - Border-radius: ~8px;
    - Altura: ~57px estimada;
    - Borda: 1px solid;
    - Fundo: dark: #1D293D, light: #FFFFFF;
    - Ícones: tamanho ~24px, cor #62748E;
    - Padding interno: ~16px.

  - Botão CTA "Continuar"
    - Largura: 100% do container;
    - Altura: ~56px;
    - Border-radius: full;
    - Configurações de cor e texto de botão primario.

  - TOS footer
    - Texto: "Ao continuar, você concorda com os"
    - Dois links inline: "Termos de Serviço" e "Política de Privacidade"
    - Centralizados, quebra de linha entre a frase e os links
    - Estilo underline nos links

  - Footer
    - Fundo: #0F172B;
    - Altura estimada: ~56px;
    - Apenas o texto "Mini Twitter" alinhado à esquerda.

5. ESPAÇAMENTO E DIMENSÕES
  - Home:
    - Largura máxima do feed: ~640px, centralizado com margin: 0 auto;
    - Gap entre cards: ~24px;
    - Padding interno dos cards: ~16px;
    - Padding top do feed (abaixo da navbar): ~24px;
    - Padding bottom (antes da paginação): ~24px;
    - Espaçamento entre nome/handle/data: ~6px horizontal;
    - Espaçamento entre título e corpo: ~8px;
    - Espaçamento entre corpo e ícone de curtida: ~8px.

  - Login/Cadastro:
    - Container central: largura ~480px, sem card com fundo — flutua sobre o fundo;
    - Gap entre título e tabs: ~56px
    - Gap entre tabs e heading: ~24px
    - Gap entre heading e primeiro input: ~24px
    - Gap entre campos: ~20px
    - Gap entre último input e botão: ~24px
    - Gap entre botão e TOS footer: ~24px

6. EFEITOS VISUAIS
  - Bordas: 1px solid, cor ~#62748E, border-radius ~12px nos cards e full nos inputs/botões arredondados;
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