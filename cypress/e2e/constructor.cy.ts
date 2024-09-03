beforeEach(function () {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' });
  window.localStorage.setItem(
    'refreshToken',
    JSON.stringify('test-refreshToken')
  );
  cy.setCookie('accessToken', 'test-accessToken');
  cy.viewport(1920, 1080);
  cy.visit('http://localhost:4000');
});

afterEach(function () {
  cy.clearLocalStorage();
  cy.clearCookies();
});

it('Добавление булок', function () {
  // добавили первую булку
  cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
  // проверили наличие в конструкторе
  cy.get('[data-cy=constructor-bun-1]')
    .contains('Ингредиент 1')
    .should('exist');
  cy.get('[data-cy=constructor-bun-2]')
    .contains('Ингредиент 1')
    .should('exist');
});

it('Добавление начинки', function () {
  // добавили первый ингредиент
  cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
  // проверили наличие в конструкторе
  cy.get('[data-cy=constructor-main]').contains('Ингредиент 2').should('exist');
});

it('Добавление соуса', function () {
  // добавили первый соус
  cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
  // проверили наличие в конструкторе
  cy.get('[data-cy=constructor-main]').contains('Ингредиент 4').should('exist');
});

it('Оформление заказа', function () {
  // добавили игредиенты
  cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
  cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
  cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
  // нажали на кнопку "оформить заказ"
  cy.get('[data-cy=order-button] button').click();
  // проверили номер заказа
  cy.get('[data-cy=order-number]').contains('12345').should('exist');
  // нажали на крестик для закрытия модалки
  cy.get('[data-cy=close-modal]').click();
  // убедились в закрытии модалки
  cy.get('[data-cy=order-number]').should('not.exist');
  // убедились в очистке конструктора
  cy.get('[data-cy=constructor]').contains('Ингредиент 1').should('not.exist');
  cy.get('[data-cy=constructor]').contains('Ингредиент 2').should('not.exist');
  cy.get('[data-cy=constructor]').contains('Ингредиент 4').should('not.exist');
});
