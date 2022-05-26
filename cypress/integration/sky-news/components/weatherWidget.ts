export const weatherWidget = {
  click(): void {
    cy.get('.ui-weather-widget__wrapper').click();
  },
};
