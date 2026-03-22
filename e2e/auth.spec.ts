describe('Fluxo de Autenticação', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="btn-login-nav"]').first().click(); // O botão de login na navbar
  });

  it('deve exibir erro ao tentar logar com credenciais inválidas', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 401,
      body: { message: 'Credenciais inválidas' },
    }).as('loginRequest');

    cy.get('[data-testid="input-email"]').type('errado@teste.com');
    cy.get('[data-testid="input-password"]').type('123456');
    cy.get('[data-testid="btn-login"]').click();

    cy.wait('@loginRequest');
    cy.contains('Credenciais inválidas').should('be.visible');
  });

  it('deve logar com sucesso e redirecionar para a home', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        user: { id: 5, name: 'Teste', email: 'teste@teste.com', password: '12345678' },
      },
    }).as('loginSuccess');

    cy.intercept('GET', '**/posts*', {
      statusCode: 200,
      body: [],
    });

    cy.get('[data-testid="input-email"]').type('teste@teste.com');
    cy.get('[data-testid="input-password"]').type('12345678');
    cy.get('[data-testid="btn-login"]').click();

    cy.wait('@loginSuccess');
    cy.contains('Teste').should('be.visible');
    cy.get('[data-testid="btn-logout"]').should('be.visible');
  });

  it('deve registrar um novo usuário e fazer login automático', () => {
    cy.get('[data-testid="tab-cadastro"]').click();

    cy.intercept('POST', '**/auth/register', {
      statusCode: 201,
      body: { message: 'Usuário criado com sucesso' },
    }).as('registerRequest');

    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        token: 'new-fake-token',
        user: { id: 2, name: 'Novo Teste', email: 'novo@teste.com' },
      },
    }).as('loginAfterRegister');

    cy.intercept('GET', '**/posts*', {
      statusCode: 200,
      body: [],
    });

    cy.get('[data-testid="input-name"]').type('Novo Teste');
    cy.get('[data-testid="input-email"]').type('novo@teste.com');
    cy.get('[data-testid="input-password"]').type('123456');
    cy.get('[data-testid="btn-register"]').click();

    cy.wait('@registerRequest');
    cy.wait('@loginAfterRegister');

  });

  it('deve fazer logout com sucesso', () => {
    // Mockar estado logado no localStorage se necessário, ou apenas logar
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        token: 'fake-jwt-token',
        user: { id: 1, name: 'Usuário Teste', email: 'teste@teste.com' },
      },
    });

    cy.get('[data-testid="input-email"]').type('teste@teste.com');
    cy.get('[data-testid="input-password"]').type('123456');
    cy.get('[data-testid="btn-login"]').click();

    cy.intercept('POST', '**/auth/logout', {
      statusCode: 200,
    }).as('logoutRequest');

    cy.get('[data-testid="btn-logout"]').click();
    cy.get('[data-testid="btn-login"]').should('be.visible');
  });
});
