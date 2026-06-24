class loginPage{
    //locators
    get usernameInput() { return cy.get('[data-cy="login-email"]')};
    get passwordInput() { return cy.get('[data-cy="login-password"]')};
    get submitButton() { return cy.get('[data-cy="login-submit"]')};
    get loginError() {return cy.get('[data-cy="login-error"]')};
    get dashboardWelcome() {return cy.get('[data-testid="dashboard-welcome"]')};
    get pageLoginId() {return cy.get('#page-login')};
    // get usernameInput() { return cy.get('[]')}

    //actions
    visit(){
        cy.visit('/#login');
    }

    login(username, password){
        this.usernameInput.type(username);
        this.passwordInput.type(password);
        this.submitButton.click();
    }
}

export default new loginPage();
