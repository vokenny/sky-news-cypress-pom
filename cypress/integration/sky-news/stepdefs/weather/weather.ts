import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { cookiesIFrame } from '../../components/cookiesIFrame';
import { homePage, weatherPage } from '../../pageObjects/singletonPages';

Given(/I am a user in '(.*), (.*)'/, (city: string, country: string): void => {
  // In reality, do some test set up based on their location
  cy.log(`City: ${city}, Country: ${country}`);
  Cypress.env('CITY', city);
});

Given("I'm on the Sky News Home page", (): void => {
  homePage.visit();
  cookiesIFrame.accept();
  homePage.shouldBeLoaded();
});

When('I go to view the weather forecast', (): void => {
  homePage.viewWeatherForecast();
});

Then('the local weather forecast should be shown', (): void => {
  weatherPage.shouldBeLoaded();
});
