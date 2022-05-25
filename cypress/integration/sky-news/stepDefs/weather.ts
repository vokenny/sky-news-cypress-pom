import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { cookiesIFrame } from '../components/cookiesIFrame';
import { homePage, weatherPage } from '../pageObjects/singletonPages';

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

When("I view today's forecast", () => {
  weatherPage.selectTodaysForecast();
});

When('I view the weather for the next day', (): void => {
  weatherPage.selectDaysFromToday(1);
});

Then('the local weather forecast should be shown', (): void => {
  weatherPage.shouldBeLoaded();
});

Then(
  'the local weather forecast should be shown for the next day',
  (): void => {
    weatherPage.shouldBeLoaded();

    cy.get('@expectedDay').then((expectedDay) => {
      weatherPage.activeForecastDay.should('have.text', expectedDay);
    });
  }
);
