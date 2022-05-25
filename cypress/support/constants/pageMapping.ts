import {
  homePage,
  scienceAndTechPage,
  weatherPage,
} from '../../integration/sky-news/pageObjects/singletonPages';

export const pageMap = Object.freeze({
  Home: homePage,
  Weather: weatherPage,
  'Science & Tech': scienceAndTechPage,
});
