// Cypress.Commands.add('login', () => {
//   cy.visit('/#login')
//   cy.get('[data-testid="login-email"]').type(Cypress.env('USER_EMAIL'))
//   cy.get('[data-testid="login-password"]').type(Cypress.env('USER_PASSWORD'))
//   cy.get('[data-testid="login-submit"]').click()
//   cy.url().should('include', '#dashboard')
// })

Cypress.Commands.add('login', ()=>{
    cy.visit('/#login');
    cy.get('[data-cy="login-email"]').type(Cypress.env('username'));
    cy.get('[data-cy="login-password"]').type(Cypress.env('password'));
    cy.get('[data-cy="login-submit"]').click();
})


