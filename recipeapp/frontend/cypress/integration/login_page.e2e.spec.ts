/// <reference types="Cypress" />
// Problem with typescript config in cypress, we need to define it once here
// see: https://github.com/cypress-io/cypress/issues/1065
declare namespace Cypress {
    interface Chainable {
        login(): void;
        logout(): void;
        addRecipe(recipe: any): void;
        resetDb(): void;
        register(username, password): void;
        prepTest(): void;
    }
}

describe('Login Page', () => {
    beforeEach(() => {
        cy.prepTest();
        cy.register('Kwinten', 'testtesttest');
        cy.logout();
    });

   it('should go to the login page and try to login', () => {
       cy.visit('');

       cy.get('[data-test=username]').type('Kwinten');
       cy.get('[data-test=password]').type('testtesttest');
       cy.get('[data-test=loginBtn]').click();

       cy.url().should('include', 'recipe/list');
       cy.contains('Kwinten');
   });

   it('should show an error when the login is invalid', () => {
       cy.visit('');

       cy.get('[data-test=username]').type('notKwinten');
       cy.get('[data-test=password]').type('invalid');
       cy.get('[data-test=loginBtn]').click();

       cy.contains('Error 401 while trying to login user notKwinten');
   });

   it('should not be possible to click the login button when the username is not filled in ', () => {
       cy.visit('');

       cy.get('[data-test=username]').type('notKwinten');

       cy.get('[data-test=loginBtn]').should('be.disabled');
   });

    it('should not be possible to click the login button when the password is not filled in ', () => {
        cy.visit('');

        cy.get('[data-test=password]').type('invalid');

        cy.get('[data-test=loginBtn]').should('be.disabled');
    });
});
