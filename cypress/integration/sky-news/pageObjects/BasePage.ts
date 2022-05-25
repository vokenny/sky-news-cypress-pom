export default class BasePage {
  urlPath: string;
  titleText: String;

  get title(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('h1 picture');
  }

  get sanitisedTitle(): Cypress.Chainable<string> {
    return this.title
      .invoke('text')
      .then((titleText: string): string => titleText.replace('\n', '').trim());
  }

  visit(): void {
    cy.visit(this.urlPath);
  }

  shouldBeLoaded(): void {
    cy.location('pathname').should('equal', this.urlPath);
    this.sanitisedTitle.should('equal', this.titleText);
  }
}
