export const navbar = {
  get newsTabs(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get('.sdc-site-header__menu')
      .find('[data-role="main-nav-item"] a');
  },

  selectNewsTab(navLabel: string): void {
    this.newsTabs.filter(`:contains(${navLabel})`).click();
  },
};
