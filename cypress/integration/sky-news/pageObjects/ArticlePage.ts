import BasePage from './BasePage';

export default class ArticlePage extends BasePage {
  urlPath: string = '/story';
  titleText: string = '';

  get title(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[class$="__long-title"]');
  }

  shouldBeLoaded(): void {
    cy.location('pathname').should('include', this.urlPath);
    cy.get('@headlineUrl').then((headlineUrl): void => {
      cy.location('pathname').should('equal', headlineUrl);
    });
  }
}
