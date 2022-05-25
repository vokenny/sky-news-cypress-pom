export default class BasePage {
  urlPath: string;
  titleText: String;

  get title(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('h1 picture');
  }

  visit(): void {
    cy.visit(this.urlPath);
  }

  shouldBeLoaded(): void {
    cy.location('pathname').should('equal', this.urlPath);

    this.title.should(($title): void => {
      const sanitisedTitle: string = $title.text().replace('\n', '').trim();
      expect(sanitisedTitle).equals(this.titleText);
    });
  }
}
