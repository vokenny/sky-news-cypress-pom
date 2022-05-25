import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given(/I am a user in '(.*), (.*)'/, (city: string, country: string) => {
  // In reality, do some test set up based on their location
  cy.log(`City: ${city}, Country: ${country}`);
  Cypress.env('CITY', city);
});

Given("I'm on the Sky News Home page", () => {
  cy.visit('/');
});

When('I go to view the weather forecast', () => {
  cy.get('.ui-weather-widget__wrapper').click();
});

Then('the local weather forecast should be shown', () => {
  cy.location('hash').should('be', 'weather');
  cy.get('h1 picture').should('have.text', 'WEATHER');

  const city: string = Cypress.env('CITY');
  cy.get('.weather-location__selected').should('have.text', city);
});
