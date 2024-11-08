describe('Интеграционные тесты конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'mockIngredients'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'mockOrder'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'mockUser'
    );

    cy.setCookie('accessToken', 'TEST_ACCESS_TOKEN');
    localStorage.setItem('refreshToken', 'TEST_REFRESH_TOKEN');

    cy.visit('http://localhost:4000');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Добавление ингредиентов в конструктор', () => {
    beforeEach(() => {
      cy.wait('@mockIngredients');
    });

    it('Добавление булок в конструктор', () => {
      cy.get('[data-cy="bun"]').contains('Добавить').click();
      cy.get('[data-cy="burgerConstructor"]').should(
        'contain',
        'Краторная булка N-200i'
      );
    });

    it('Добавление основных ингредиентов в конструктор', () => {
      cy.get('[data-cy="main"]').contains('Добавить').click();
      cy.get('[data-cy="burgerConstructor"]').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
    });
  });

  describe('Модальные окна ингредиентов', () => {
    beforeEach(() => {
      cy.get('[data-cy="bun"]').first().click();
      cy.get('[data-cy="modal"]').should('be.visible');
    });

    it('должен закрывать модальное окно по клику на кнопку', () => {
      cy.get('[data-cy="closeModalButton"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('должен закрывать модальное окно по клику на оверлей', () => {
      cy.get('[data-cy="modalOverlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('должен оформлять заказ и проверять модальное окно', () => {
      cy.get('[data-cy="bun"]').first().contains('Добавить').click();
      cy.get('[data-cy="main"]').first().contains('Добавить').click();
      cy.get('[data-cy="orderButton"]').click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="orderNumber"]').should('contain', '101');
      cy.get('[data-cy="closeModalButton"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
      cy.get('[data-cy="burgerConstructor"]').should(
        'contain',
        'Выберите булки'
      );
    });
  });
});
