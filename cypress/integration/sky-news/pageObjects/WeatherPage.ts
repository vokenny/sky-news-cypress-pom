import BasePage from './BasePage';

export default class WeatherPage extends BasePage {
  urlPath: string = '/weather';
  titleText: string = 'Weather';

  static locators = {
    V1: {
      weeklyForecastDays: '.weekly-weather__list',
    },
    V2: {
      weeklyForecastDays: '.weekly-weather__list',
    },
  };

  get location(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.weather-location__selected');
  }

  get weeklyForecastDays(): Cypress.Chainable<JQuery<HTMLElement>> {
    cy.log(Cypress.env('APP_VERSION'));
    const locator: string =
      WeatherPage.locators[Cypress.env('APP_VERSION')].weeklyForecastDays;
    return cy.get(locator).children();
  }

  get todaysForecast(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.weeklyForecastDays.first();
  }

  get activeForecastDay(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.day-summary--active > .day-summary__date');
  }

  shouldBeLoaded(): void {
    cy.location('pathname').should('equal', this.urlPath);
    this.skyLogo.should('have.attr', 'src').should('include', this.logoPath);
    this.sanitisedTitle.should('equal', this.titleText);

    const city: string = Cypress.env('CITY');
    this.location.should('have.text', city);

    Cypress.env('PAGE', this);
  }

  selectDaysFromToday(inc: number): void {
    if (inc < 0)
      throw new Error('Select a day from today. 0 for today, +ve for future.');

    this.weeklyForecastDays.then(($days: JQuery<HTMLElement>): void => {
      const $targetDay: HTMLElement = Array.from($days)[inc];

      cy.wrap($targetDay)
        .find('.day-summary__date')
        .invoke('text')
        .as('expectedDay');

      cy.wrap($targetDay).click();
    });
  }

  selectTodaysForecast(): void {
    this.todaysForecast.click();
  }

  validateNextDay(): void {
    cy.get('@expectedDay').then((expectedDay): void => {
      this.activeForecastDay.should('have.text', expectedDay);
    });
  }
}
