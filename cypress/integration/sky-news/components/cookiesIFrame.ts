export const cookiesIFrame = {
  accept: (): void => {
    cy.getIFrameBody('iframe[title="SP Consent Message"]')
      .find('[title=Agree]')
      .should('have.text', 'Agree')
      .click();
  },
};
