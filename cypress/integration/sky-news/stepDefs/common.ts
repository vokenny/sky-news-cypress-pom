import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { pageMap } from '../../../support/constants/pageMapping';
import { cookiesIFrame } from '../components/cookiesIFrame';
import { articlePage, homePage } from '../pageObjects/singletonPages';

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

When('I go to view the {string} news', (navLabel: string): void => {
  homePage.selectNewsTab(navLabel);
});

When('I view the top story', (): void => {
  const page = Cypress.env('PAGE');
  page.viewTopStory();
});

Then('the {string} page should be shown', (pageName: string): void => {
  const pageObj = pageMap[pageName];
  if (!pageObj) throw new Error(`Invalid page name key. Received: ${pageName}`);

  pageObj.shouldBeLoaded();
});

Then('the news article should be shown', (): void => {
  articlePage.shouldBeLoaded();
});
