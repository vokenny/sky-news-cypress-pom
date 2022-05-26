import { navbar } from '../components/navbar';
import { weatherWidget } from '../components/weatherWidget';

export default class BasePage {
  urlPath: string;
  titleText: String;

  logoPath: string = '/resources/sky-news-logo.svg';

  get skyLogo(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.sdc-site-header__logo img');
  }

  get title(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('h1 picture');
  }

  get sanitisedTitle(): Cypress.Chainable<string> {
    return this.title
      .invoke('text')
      .then((titleText: string): string => titleText.replace('\n', '').trim());
  }

  get headlineStory(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-type="hero-horizontal"]');
  }

  get headlineLink(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.headlineStory.find('[class$="__headline-link"]');
  }

  visit(): void {
    cy.visit(this.urlPath);
  }

  shouldBeLoaded(): void {
    cy.location('pathname').should('equal', this.urlPath);
    this.skyLogo.should('have.attr', 'src').should('include', this.logoPath);
    this.sanitisedTitle.should('equal', this.titleText);
    Cypress.env('PAGE', this);
  }

  viewWeatherForecast(): void {
    weatherWidget.click();
  }

  selectNewsTab(navLabel: string): void {
    navbar.selectNewsTab(navLabel);
  }

  viewTopStory(): void {
    this.headlineLink.should('have.attr', 'href').as('headlineUrl');
    this.headlineStory.click();
  }
}
