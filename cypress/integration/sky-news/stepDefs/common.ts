import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { pageMap } from '../../../support/constants/pageMapping';
import { cookiesIFrame } from '../components/cookiesIFrame';
import { homePage } from '../pageObjects/singletonPages';

Given(
  'I am a user in {string}, {string}',
  (city: string, country: string): void => {
    // In reality, do some test set up based on their location
    cy.log(`City: ${city}, Country: ${country}`);
    Cypress.env('CITY', city);
  }
);

Given("I'm on the Sky News Home page", (): void => {
  homePage.visit();
  cookiesIFrame.accept();
  homePage.shouldBeLoaded();
});

When('I go to view the {string} news', (navLabel: string) => {
  homePage.selectNewsTab(navLabel);
});

Then('the {string} page should be shown', (pageName: string): void => {
  const pageObj = pageMap[pageName];
  if (!pageObj) throw new Error(`Invalid page name key. Received: ${pageName}`);

  pageObj.shouldBeLoaded();
});
