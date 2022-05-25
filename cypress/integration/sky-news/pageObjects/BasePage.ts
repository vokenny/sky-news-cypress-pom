export default class BasePage {
  urlPath: string;
  titleText: String;

  get title() {
    return cy.get('h1 picture');
  }

  visit() {
    cy.visit(this.urlPath);
  }

  shouldBeLoaded() {
    cy.location('pathname').should('equal', this.urlPath);

    this.title.should(($title) => {
      const sanitisedTitle = $title.text().replace('\n', '').trim();
      expect(sanitisedTitle).equals('Top Stories');
    });
  }
}
