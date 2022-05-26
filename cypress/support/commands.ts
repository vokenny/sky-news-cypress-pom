// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      getIFrameBody(locator: string): Chainable<unknown>;
    }
  }
}

Cypress.Commands.add(
  'getIFrameBody',
  (locator: string): Cypress.Chainable<unknown> => {
    return cy
      .get(locator)
      .its('0.contentDocument') // iFrame body sits inside 0.contentDocument
      .should('exist')
      .its('body')
      .then(cy.wrap); // wrap body to continue chaining methods
  }
);
