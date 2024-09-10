import {
  allBuns,
  allMain,
  allSause,
  bunBottom,
  bunTop,
  burgerConstructor,
  burgerConstructorMain,
  closeButton,
  ingredientBun,
  ingredientMain,
  ingredientSause,
  orderButton,
  orderNumber
} from 'cypress/constants';

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
  cy.visit('/');
});

afterEach(function () {
  cy.clearLocalStorage();
  cy.clearCookies();
});

it('Добавление булок', function () {
  // добавили первую булку
  cy.get(allBuns).contains('Добавить').click();
  // проверили наличие в конструкторе
  cy.get(bunTop).contains(ingredientBun).should('exist');
  cy.get(bunBottom).contains(ingredientBun).should('exist');
});

it('Добавление начинки', function () {
  // добавили первый ингредиент
  cy.get(allMain).contains('Добавить').click();
  // проверили наличие в конструкторе
  cy.get(burgerConstructorMain).contains(ingredientMain).should('exist');
});

it('Добавление соуса', function () {
  // добавили первый соус
  cy.get(allSause).contains('Добавить').click();
  // проверили наличие в конструкторе
  cy.get(burgerConstructorMain).contains(ingredientSause).should('exist');
});

it('Оформление заказа', function () {
  // добавили игредиенты
  cy.get(allBuns).contains('Добавить').click();
  cy.get(allMain).contains('Добавить').click();
  cy.get(allSause).contains('Добавить').click();
  // нажали на кнопку "оформить заказ"
  cy.get(orderButton).click();
  // проверили номер заказа
  cy.get(orderNumber).contains('12345').should('exist');
  // нажали на крестик для закрытия модалки
  cy.get(closeButton).click();
  // убедились в закрытии модалки
  cy.get(orderNumber).should('not.exist');
  // убедились в очистке конструктора
  cy.get(burgerConstructor).contains(ingredientBun).should('not.exist');
  cy.get(burgerConstructor).contains(ingredientMain).should('not.exist');
  cy.get(burgerConstructor).contains(ingredientSause).should('not.exist');
});
