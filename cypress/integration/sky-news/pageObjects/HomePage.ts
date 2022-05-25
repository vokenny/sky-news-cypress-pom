import BasePage from './BasePage';

export default class HomePage extends BasePage {
  urlPath = '/';
  titleText = 'Top Stories';

  get title() {
    return cy.get('h1.sdc-site-component-header--project-one picture');
  }
}
