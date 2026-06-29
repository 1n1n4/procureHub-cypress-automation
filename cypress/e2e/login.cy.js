import loginPage from '../pages/loginPage'

describe('shoudl validate login into SupplyHouse', ()=>{
    it('TC_001: Login with correct credentials', ()=>{
        loginPage.visit();
        loginPage.login(
            Cypress.env('username'), 
            Cypress.env('password')
        );
        loginPage.dashboardWelcome.should('have.text','Welcome, admin@procurehub.com');
    })

    it('TC_002: Login with incorrect username', ()=>{
        loginPage.visit();
        loginPage.login('adminas@supplymart.com', Cypress.env('password'));
        loginPage.loginError.should('include.text', 'Invalid credentials. Please try again.');
    })

    it('TC_003: Login with incorrect password', ()=>{
        loginPage.visit();
        loginPage.login('admin@procurehub.com', 'password');
        loginPage.loginError.should('include.text', 'Invalid credentials. Please try again.');
    })

    it('TC_004: Login with both incorrect username & password', ()=>{
        loginPage.visit();
        loginPage.login('user', 'pass');
        loginPage.loginError.should('include.text', 'Invalid credentials. Please try again.');
    })
})

describe('should validate login page texts and placeholders', ()=>{
    beforeEach(()=>{
        loginPage.visit();
    })

    it('TC_005: Validating login page texts and placeholders', ()=>{
        loginPage.pageLoginId.within(()=>{
            cy.contains('h1','ProcureHub').should('be.visible');
            cy.contains('p', 'Sign in to your account to continue.').should('be.visible');
        })
    })

    it('TC_006: validating placeholders', ()=>{
        loginPage.usernameInput.should('be.visible').and('have.attr','placeholder','admin@procurehub.com');
        loginPage.passwordInput.invoke('attr', 'placeholder').should('eq', '••••••••');
    })
})