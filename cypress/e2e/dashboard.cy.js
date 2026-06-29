import dashboardPage from '../pages/dashboardPage'
beforeEach(()=>{
    cy.login();
})

describe('should validate navigation bar', ()=>{
    it('TC-001: should validate the logo text', ()=>{
        dashboardPage.navBrandLogo.within(()=>{
            cy.contains('span', 'PH').should('be.visible');
            cy.contains('span', 'Procure').should('be.visible');
            cy.contains('span', 'Hub').should('be.visible');
        })
    })

    it('TC-002: should validate the dashboard tab text', ()=>{
        dashboardPage.dashboardTab.should('have.text', 'Dashboard').and('be.visible');
    })

    it('TC-003: should validate the dashboard info text', ()=>{
        dashboardPage.orderInfo.within(()=>{
            cy.contains('strong','Products').should('be.visible');
            cy.contains('strong','Cart').should('be.visible');
            cy.contains('strong','Orders').should('be.visible');
            cy.contains('strong','Profile').should('be.visible');
        });
    })
})