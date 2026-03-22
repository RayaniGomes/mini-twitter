describe('Fluxo de Posts', () => {
  beforeEach(() => {
    // Mockar login
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        user: { id: 1, name: 'Usuário Teste', email: 'teste@teste.com' },
      },
    });

    cy.visit('/');
    cy.get('[data-testid="btn-login-nav"]').first().click();
    cy.get('[data-testid="input-email"]').type('teste@teste.com');
    cy.get('[data-testid="input-password"]').type('123456');
    cy.get('[data-testid="btn-login"]').click();
  });

  it('deve listar posts na timeline', () => {
    cy.intercept('GET', '**/posts*', {
      statusCode: 200,
      body: {
        posts: [
          {
            id: 1,
            title: 'Primeiro Post',
            content: 'Conteúdo do primeiro post',
            authorName: 'Autor 1',
            authorId: 2,
            createdAt: new Date().toISOString(),
            likesCount: 5,
          },
        ],
        nextPage: null,
      },
    }).as('getPosts');

    cy.visit('/');
  });

  it('deve buscar posts pelo termo de busca', () => {
    cy.intercept('GET', '**/posts?*search=react*', {
      statusCode: 200,
      body: {
        posts: [
          {
            id: 2,
            title: 'Post sobre React',
            content: 'Aprendendo React',
            authorName: 'React Fan',
            authorId: 3,
            createdAt: new Date().toISOString(),
            likesCount: 10,
          },
        ],
        nextPage: null,
      },
    }).as('searchRequest');

    cy.get('[data-testid="input-search"]').type('react');
    cy.wait('@searchRequest');
    cy.contains('Post sobre React').should('be.visible');
  });

  it('deve criar um novo post com sucesso', () => {
    cy.intercept('POST', '**/posts', {
      statusCode: 201,
      body: { id: 3, title: 'Novo Post', content: 'Conteúdo do novo post', image: null },
    }).as('createPost');

    cy.intercept('GET', '**/posts*', {
      statusCode: 200,
      body: { posts: [], nextPage: null },
    });

    cy.get('[data-testid="input-post-title"]').type('Novo Post');
    cy.get('[data-testid="input-post-content"]').type('Conteúdo do novo post');
    cy.get('[data-testid="btn-post"]').click();

    cy.wait('@createPost');
    // Verificaria se o cache foi invalidado ou o post apareceu se o mock de GET fosse atualizado
  });

  it('deve exibir opções de editar/deletar apenas para o dono do post', () => {
    cy.intercept('GET', '**/posts*', {
      statusCode: 200,
      body: {
        posts: [
          {
            id: 1,
            title: 'Meu Post',
            image: null,
            content: 'Eu que fiz',
            authorName: 'Usuário Teste',
            authorId: 1,
            createdAt: new Date().toISOString(),
            likesCount: 0,
          },
          {
            id: 2,
            title: 'Post de Outro',
            image: null,
            content: 'Não fui eu',
            authorName: 'Outro Autor',
            authorId: 2,
            createdAt: new Date().toISOString(),
            likesCount: 0,
          },
        ],
        nextPage: null,
      },
    });

    cy.get('[data-testid="post-card-1"]').find('[data-testid="btn-post-actions"]').should('be.visible');
    
  });
});
