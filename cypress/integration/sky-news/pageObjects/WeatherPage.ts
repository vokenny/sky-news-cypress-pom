import BasePage from './BasePage';

export default class WeatherPage extends BasePage {
  urlPath: string = '/weather';
  titleText: string = 'Weather';

  get location(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.weather-location__selected');
  }

  get weeklyForecastDays(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.weekly-weather__list').children();
  }

  get todaysForecast(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.weeklyForecastDays.first();
  }

  get activeForecastDay(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.day-summary--active > .day-summary__date');
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

  selectDaysFromToday(inc: number): void {
    if (inc < 0)
      throw new Error('Select a day from today. 0 for today, +ve for future.');

    this.weeklyForecastDays.then(($days): void => {
      const targetDayEl: HTMLElement = Array.from($days)[inc];

      cy.wrap(targetDayEl)
        .find('.day-summary__date')
        .invoke('text')
        .as('expectedDay');

      // Click on the day
      cy.wrap(targetDayEl).click();
    });
  }

  selectTodaysForecast(): void {
    this.todaysForecast.click();
  }
}
