import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { homePage } from '../../pageObjects/singletonPages';

const getIframe = () => {
  return cy
    .get('iframe[title="SP Consent Message"]')
    .its('0.contentDocument') // iFrame body sits inside 0.contentDocument
    .should('exist');
};

const getIframeBody = () => {
  return getIframe()
    .its('body')
    .should('not.be.undefined') // retries until body is loaded
    .then(cy.wrap); // wrap body to continue chaining methods
};

Given(/I am a user in '(.*), (.*)'/, (city: string, country: string) => {
  // In reality, do some test set up based on their location
  cy.log(`City: ${city}, Country: ${country}`);
  Cypress.env('CITY', city);
});

Given("I'm on the Sky News Home page", () => {
  homePage.visit();
  getIframeBody().find('[title=Agree]').should('have.text', 'Agree').click();
  homePage.shouldBeLoaded();
});

When('I go to view the weather forecast', () => {
  cy.get('.ui-weather-widget__wrapper').click();
});

Then('the local weather forecast should be shown', () => {
  cy.location('pathname').should('equal', '/weather');

  cy.get('h1 picture').should(($title) => {
    const sanitisedTitle = $title.text().replace('\n', '').trim();
    expect(sanitisedTitle).equals('Weather');
  });

  const city: string = Cypress.env('CITY');
  cy.get('.weather-location__selected').should('have.text', city);
});
