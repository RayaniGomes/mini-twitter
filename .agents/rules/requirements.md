---
trigger: always_on
---

# Mini Twitter — Regra de Requisitos do Projeto

> **Escopo:** Este arquivo de regras é a fonte única de verdade para qualquer agente de IA que trabalhe neste projeto. Todas as decisões de implementação devem seguir as especificações abaixo.

---

## 1. Stack Tecnológica

| Camada | Tecnologia | Função |
|---|---|---|
| Framework de UI | **React** | Construir todos os componentes (timeline, cards, modais, formulários) |
| Linguagem | **TypeScript** | Contratos de dados tipados (ex: `User`, `Post`, `AuthToken`) |
| Cliente HTTP | **Axios** | Toda comunicação com a API do backend |
| Estado do Servidor | **TanStack Query** | Cache, estados de loading e refetch dos dados da API |
| Formulários | **React Hook Form** | Controle dos formulários de Login, Registro e Criação de Post |
| Validação | **Zod** | Schemas de validação para todos os formulários |
| Estilização | **Tailwind CSS** | Classes utilitárias para estilos, espaçamentos, cores e responsividade |

**Regra:** Nenhuma biblioteca alternativa pode substituir as listadas acima sem aprovação explícita do usuário. Bibliotecas extras são permitidas apenas para as funcionalidades da Seção 5 (Extras).

---

## 2. Regras de Arquitetura

- Todas as chamadas à API devem passar por uma **instância Axios** com URL base e um interceptor de requisição que anexa o JWT do `localStorage` no header `Authorization: Bearer <token>`.
- Todo **estado do servidor** (lista de posts, sessão do usuário) deve ser gerenciado via **TanStack Query** (`useQuery`, `useMutation`). É proibido usar `useState` + `useEffect` para buscar dados.
- Todo **estado de formulário** deve ser gerenciado via **React Hook Form**. Os schemas de validação devem ser definidos com **Zod** e conectados via `zodResolver`.
- A UI deve ser totalmente tipada — nenhum tipo `any` é permitido sem justificativa.

---

## 3. Requisitos Funcionais

### 🔐 Épico: Autenticação e Acesso

#### 3.1 — Registro de Usuário
- Rota: `POST /auth/register` com `{ name, email, password }`.
- Validar o formato do e-mail no frontend com Zod antes do envio.
- Em caso de HTTP 400 (e-mail já em uso): exibir mensagem de erro amigável e inline.
- Em caso de sucesso: redirecionar para a página de login ou diretamente para a timeline.

#### 3.2 — Login de Usuário
- Rota: `POST /auth/login` com `{ email, password }`.
- Em caso de sucesso: persistir o JWT retornado no `localStorage`.
- Redirecionar para a timeline após o login.
- Em caso de erro: exibir mensagem descritiva (credenciais inválidas, erro no servidor, etc.).

#### 3.3 — Logout
- Rota: `POST /auth/logout` — enviar o JWT atual na requisição.
- Após confirmação do servidor: remover o token do `localStorage`.
- Redirecionar o usuário para a página de login.

---

### 📝 Épico: Gestão de Conteúdo (Posts)

#### 3.4 — Visualização da Timeline
- Rota: `GET /posts` com parâmetros de paginação.
- Cada card de post deve exibir: **nome do autor**, **título**, **conteúdo**, **imagem** (se houver) e **data de criação formatada**.
- A data deve ser legível por humanos (ex: "há 3 horas" ou "20 de março de 2026").
- Os estados de carregamento e erro devem ser tratados e exibidos ao usuário.

#### 3.5 — Busca de Posts
- Adicionar `?search=<termo>` à requisição `GET /posts`.
- A lista de posts deve ser atualizada **dinamicamente** conforme o usuário digita (uso de debounce recomendado).

#### 3.6 — Criação de Post (com imagem opcional)
- Apenas para usuários autenticados — anexar JWT no header `Authorization`.
- Campos: `title` (obrigatório), `content` (obrigatório), `imageUrl` (opcional, deve ser uma URL válida).
- Regra de validação de imagem: rejeitar arquivos maiores que **5 MB** antes do upload; aceitar apenas formatos suportados pela API.
- A imagem deve ser enviada como uma **string de URL** (não como upload binário), conforme exigido pela API.
- Invalidar o cache do TanStack Query dos posts após o sucesso para que a timeline seja atualizada.

#### 3.7 — Edição e Exclusão de Posts Próprios
- Exibir os botões **Editar** e **Deletar** **somente** quando o `userId` do usuário autenticado coincidir com o `authorId` do post.
- Editar: `PUT /posts/:id` — pré-preencher o formulário com os dados atuais do post.
- Deletar: `DELETE /posts/:id` — exibir um diálogo de confirmação antes de executar.
- Tratar o HTTP 403 explicitamente: exibir um erro claro de "não autorizado" caso ocorra.

---

### ❤️ Épico: Interação Social

#### 3.8 — Curtir / Descurtir Posts
- Rota: `POST /posts/:id/like`.
- **Atualização otimista:** alternar o ícone de curtida e incrementar/decrementar o `likesCount` imediatamente ao clicar, antes da resposta do servidor.
- Reverter a atualização otimista caso a requisição falhe.
- Apenas usuários autenticados podem curtir; exibir um aviso ou redirecionar caso não esteja autenticado.

---

## 4. Requisitos Não Funcionais

| Requisito | Regra |
|---|---|
| **Tipagem** | Todas as respostas da API devem ter interfaces ou tipos TypeScript definidos. |
| **Tratamento de Erros** | Toda chamada à API deve tratar os estados de carregamento, sucesso e erro. Nunca deixar rejeições de promise não tratadas chegarem ao usuário silenciosamente. |
| **Proteção de Rotas** | Rotas que exigem autenticação devem redirecionar usuários não autenticados para a página de login. |
| **Ciclo de Vida do Token** | Em respostas 401 da API, limpar o token e redirecionar para o login. |
| **Acessibilidade** | Elementos interativos (botões, inputs) devem ter labels acessíveis. |
| **Performance** | Aplicar debounce na busca (mínimo 300 ms). Evitar re-renders desnecessários com `React.memo` ou query keys estáveis. |

---

## 5. Funcionalidades Extras (Opcionais, mas Valorizadas)

Estas são funcionalidades bônus. Implementar apenas após todos os requisitos da Seção 3 estarem concluídos.

### 5.1 — Scroll Infinito
- Substituir a paginação padrão por carregamento baseado em scroll.
- Usar `useInfiniteQuery` do TanStack Query para isso.
- Carregar a próxima página automaticamente quando o usuário chegar ao fim da lista.

### 5.2 — Modo Escuro
- Usar a estratégia `class` do Tailwind CSS (`darkMode: 'class'` no `tailwind.config`).
- Disponibilizar um botão de alternância acessível em qualquer página.
- Persistir a preferência do usuário no `localStorage`.

### 5.3 — Estado Global
- Se necessário (ex: dados do usuário logado ou tema), usar **Zustand** ou **React Context API**.
- Não utilizar Redux ou outros gerenciadores de estado mais pesados.

---

## 6. Resumo do Contrato da API

| Ação | Método | Endpoint | Autenticação |
|---|---|---|---|
| Registrar | POST | `/auth/register` | Não |
| Logar | POST | `/auth/login` | Não |
| Sair | POST | `/auth/logout` | Sim |
| Listar posts | GET | `/posts?page=&search=` | Não |
| Criar post | POST | `/posts` | Sim |
| Editar post | PUT | `/posts/:id` | Sim (dono) |
| Deletar post | DELETE | `/posts/:id` | Sim (dono) |
| Curtir/Descurtir | POST | `/posts/:id/like` | Sim |

**Formato do header de autorização:** `Authorization: Bearer <jwt_token>`

---

## 7. Ordem de Implementação para o Agente

O agente deve seguir esta ordem para evitar bloqueios:

1. **Scaffold do projeto** — Vite + React + TypeScript, instalar todas as dependências.
2. **Instância Axios** — URL base, interceptors (token de auth, tratamento de 401).
3. **Fluxos de autenticação** — páginas de Registro, Login e Logout com React Hook Form + Zod.
4. **Proteção de rotas** — HOC de guard de autenticação ou componente wrapper.
5. **Timeline** — `GET /posts` com TanStack Query, componente de card de post.
6. **Busca de posts** — input de busca com debounce conectado à query.
7. **Criação de post** — modal ou página, formulário com validação, campo de URL de imagem.
8. **Edição e exclusão** — UI condicional, formulário de edição pré-preenchido, modal de confirmação.
9. **Curtidas** — padrão de atualização otimista com `useMutation` do TanStack Query.
10. **Extras** — em qualquer ordem, somente após todos os itens acima estarem concluídos e testados.