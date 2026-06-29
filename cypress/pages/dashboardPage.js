class dashboardPage{
    //locators
    get navBrandLogo (){return cy.get('[data-testid="nav-brand"]')};
    get dashboardTab () {return cy.get('[data-testid="nav-dashboard"]')};
    get dashboardTitle() {return cy.get('[data-testid="dashboard-welcome"]')};
    get dashboardSubtitle() {return cy.get('[data-testid="dashboard-subtitle"]')};
    get productLabel() {return cy.get('[data-cy="stat-label-products"]')};
    get productStat() {return cy.get('[data-cy="stat-products"]')};
    get cartLabel() {return cy.get('[data-cy="stat-label-cart"]')};
    get cartStat() {return cy.get('[data-cy="stat-cart"]')};
    get orderLabel() {return cy.get('[data-cy="stat-label-orders"]')};
    get orderStat() {return cy.get('[data-cy="stat-orders"]')};
    get orderInfo() {return cy.get('[data-cy="dashboard-info-text"]')};
}

export default new dashboardPage();