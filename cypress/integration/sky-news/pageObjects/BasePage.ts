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

  get weatherWidget(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.ui-weather-widget__wrapper');
  }

  get navbar(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.sdc-site-header__menu');
  }

  get newsTabs(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.navbar.find('[data-role="main-nav-item"] a');
  }

  visit(): void {
    cy.visit(this.urlPath);
  }

  shouldBeLoaded(): void {
    cy.location('pathname').should('equal', this.urlPath);
    this.sanitisedTitle.should('equal', this.titleText);
  }

  viewWeatherForecast(): void {
    this.weatherWidget.click();
  }

  selectNewsTab(navLabel: string): void {
    this.newsTabs.filter(`:contains(${navLabel})`).as('targetTab');
    cy.get('@targetTab').click();
  }
}
