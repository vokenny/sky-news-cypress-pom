import BasePage from './BasePage';

export default class HomePage extends BasePage {
  urlPath: string = '/';
  titleText: string = 'Top Stories';

  get title(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('h1.sdc-site-component-header--project-one picture');
  }

  get weatherWidget(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.ui-weather-widget__wrapper');
  }

  viewWeatherForecast(): void {
    this.weatherWidget.click();
  }
}
