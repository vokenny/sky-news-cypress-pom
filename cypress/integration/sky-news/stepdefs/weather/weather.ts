import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { homePage, weatherPage } from '../../pageObjects/singletonPages';

const getIframe = (): Cypress.Chainable<any> => {
  return cy
    .get('iframe[title="SP Consent Message"]')
    .its('0.contentDocument') // iFrame body sits inside 0.contentDocument
    .should('exist');
};

const getIframeBody = (): Cypress.Chainable<unknown> => {
  return getIframe()
    .its('body')
    .should('not.be.undefined') // retries until body is loaded
    .then(cy.wrap); // wrap body to continue chaining methods
};

Given(/I am a user in '(.*), (.*)'/, (city: string, country: string): void => {
  // In reality, do some test set up based on their location
  cy.log(`City: ${city}, Country: ${country}`);
  Cypress.env('CITY', city);
});

Given("I'm on the Sky News Home page", (): void => {
  homePage.visit();
  getIframeBody().find('[title=Agree]').should('have.text', 'Agree').click();
  homePage.shouldBeLoaded();
});

When('I go to view the weather forecast', (): void => {
  homePage.viewWeatherForecast();
});

Then('the local weather forecast should be shown', (): void => {
  weatherPage.shouldBeLoaded();
});
