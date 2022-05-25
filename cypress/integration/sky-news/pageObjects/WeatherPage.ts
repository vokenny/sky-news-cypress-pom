import BasePage from './BasePage';

export default class WeatherPage extends BasePage {
  urlPath: string = '/weather';
  titleText: string = 'Weather';

  get location(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.weather-location__selected');
  }

  shouldBeLoaded(): void {
    cy.location('pathname').should('equal', this.urlPath);

    this.title.should(($title): void => {
      const sanitisedTitle: string = $title.text().replace('\n', '').trim();
      expect(sanitisedTitle).equals(this.titleText);
    });

    const city: string = Cypress.env('CITY');
    this.location.should('have.text', city);
  }
}
