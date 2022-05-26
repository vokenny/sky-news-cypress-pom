import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { homePage, weatherPage } from '../pageObjects/singletonPages';

When('I go to view the weather forecast', (): void => {
  homePage.viewWeatherForecast();
});

When("I view today's forecast", (): void => {
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
    weatherPage.validateNextDay();
  }
);
