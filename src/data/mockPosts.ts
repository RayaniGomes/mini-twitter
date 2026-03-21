// src/data/mockPosts.ts
export interface Post {
  id: number;
  name: string;
  handle: string;
  date: string;
  title: string;
  content: string;
  image?: { text: string; highlight: string; rest: string; bgColor: string };
  liked?: boolean;
}

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    name: "Lucas Costa",
    handle: "@lucascosta",
    date: "15/02/2026",
    title: "Iniciando um novo processo seletivo! 🚀",
    content: "Really excited to share what we've been working on. The team has put in countless hours to make this seamless. Check out the screenshot below! #product #launch",
    image: { text: "b2", highlight: "b", rest: "it", bgColor: "#002D5A" },
    liked: true,
  },
  {
    id: 2,
    name: "Ana Souza",
    handle: "@anasouza",
    date: "14/02/2026",
    title: "Dark Mode is great! 🌙",
    content: "Loving the dark mode update on this app. It's so much easier on the eyes at night when I'm doomscrolling 😂. Anyone else feel the same?",
    liked: false,
  },
  {
    id: 3,
    name: "Pedro Alves",
    handle: "@pedroalves",
    date: "13/02/2026",
    title: "React + TypeScript = ❤️",
    content: "Depois de anos usando JavaScript puro, finalmente migrei todos os meus projetos para TypeScript. A experiência de dev melhorou absurdamente. Altamente recomendo!",
    liked: true,
  },
  {
    id: 4,
    name: "Mariana Lima",
    handle: "@mariana_dev",
    date: "12/02/2026",
    title: "Tailwind CSS v4 chegou 🎉",
    content: "Acabei de experimentar o Tailwind v4 e a nova sintaxe com @theme no CSS é incrível. Sem mais configurações em JS separado. Tudo fica muito mais limpo e organizado.",
    liked: false,
  },
  {
    id: 5,
    name: "Rafael Torres",
    handle: "@rafadev",
    date: "11/02/2026",
    title: "Open Source para sempre 🙌",
    content: "Acabei de lançar minha primeira lib de código aberto no GitHub. Já tem 47 estrelas em 24 horas! Muito obrigado à comunidade. O link está na bio 🔗",
    liked: true,
  },
  {
    id: 6,
    name: "Camila Rocha",
    handle: "@camilarocha",
    date: "10/02/2026",
    title: "UX vs UI — a diferença importa",
    content: "Todo mundo fala de UI, mas poucos realmente investem em UX. A interface pode ser bonita, mas se o fluxo não fizer sentido para o usuário, o produto vai falhar. Vamos falar mais de pesquisa e testes?",
    liked: false,
  },
  {
    id: 7,
    name: "Bruno Mendes",
    handle: "@brunomendes",
    date: "09/02/2026",
    title: "Vite está dominando 🔥",
    content: "Sinceramente não consigo mais voltar ao Webpack depois de usar Vite. O HMR é instantâneo e o tempo de build é ridiculamente rápido. Se você ainda não tentou, experimente agora.",
    liked: true,
  },
  {
    id: 8,
    name: "Fernanda Dias",
    handle: "@fernandacode",
    date: "08/02/2026",
    title: "CSS Variáveis são subestimadas ✨",
    content: "Implementei um sistema de design tokens com CSS custom properties no meu projeto e a experiência de manutenção mudou completamente. Trocas de tema, modo escuro, tudo com uma linha. Incrível.",
    liked: false,
  },
  {
    id: 9,
    name: "Rodrigo Neves",
    handle: "@rodrigoneves",
    date: "07/02/2026",
    title: "Infinite Scroll > Paginação? 🤔",
    content: "Sempre debate recorrente no design de produto: infinite scroll ou paginação? Para feeds de conteúdo social, infinite scroll claramente ganha em engajamento. Mas para e-commerce... aí a conversa muda.",
    liked: true,
  },
  {
    id: 10,
    name: "Juliana Ferreira",
    handle: "@julianaferreira",
    date: "06/02/2026",
    title: "Acessibilidade não é opcional ♿",
    content: "Revisando os componentes do nosso design system hoje e percebendo como a acessibilidade ainda é negligenciada. Contrast ratio, aria-labels, foco via teclado... são básicos que precisam estar em todo projeto.",
    liked: false,
  },
  {
    id: 11,
    name: "Lucas Costa",
    handle: "@lucascosta",
    date: "05/02/2026",
    title: "IntersectionObserver é magia 🪄",
    content: "Implementei scroll infinito usando IntersectionObserver hoje — sem nenhuma biblioteca externa. É surpreendente como a Web API nativa resolveu tudo em menos de 30 linhas. APIs nativas merecem mais atenção.",
    liked: true,
  },
  {
    id: 12,
    name: "Ana Souza",
    handle: "@anasouza",
    date: "04/02/2026",
    title: "Code review salva vidas 💬",
    content: "Mais um bug crítico evitado graças a um bom code review. Cultura de revisão de código é subestimada em muitos times. É trabalhosa, mas é um dos maiores investimentos que um time pode fazer em qualidade.",
    liked: false,
  },
  {
    id: 13,
    name: "Pedro Alves",
    handle: "@pedroalves",
    date: "03/02/2026",
    title: "Context API vs Zustand 🧠",
    content: "Para estado global simples como tema e autenticação, Context API resolve muito bem. Para estado complexo com muitas atualizações, Zustand (ou Jotai) é bem superior. Use a ferramenta certa para o problema certo.",
    liked: true,
  },
  {
    id: 14,
    name: "Mariana Lima",
    handle: "@mariana_dev",
    date: "02/02/2026",
    title: "Componentes bem nomeados valem ouro 📦",
    content: "Nomes de componentes importam muito mais do que imaginamos. `Card` é vago. `PostCard` é específico. `PostCard` com props bem tipadas? Isso é documentação viva. Invista tempo nisso.",
    liked: false,
  },
  {
    id: 15,
    name: "Rafael Torres",
    handle: "@rafadev",
    date: "01/02/2026",
    title: "Obrigado, comunidade dev! 🙏",
    content: "Um mês de posts aqui e aprendi muito com os comentários de vocês. A troca de conhecimento da comunidade brasileira de tecnologia é incrível. Vamos continuar crescendo juntos! 🇧🇷",
    liked: true,
  },
];

export const PAGE_SIZE = 5;
