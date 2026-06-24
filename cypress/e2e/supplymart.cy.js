describe('SupplyMart E2E Test Suite', () => {

  // ─────────────────────────────────────────────
  // REQUIREMENT 1 — Login flow
  // ─────────────────────────────────────────────
  describe('Req 1: Login Flow', () => {
    it('logs in with valid credentials and redirects to dashboard with welcome message', () => {
      cy.visit('/#login')

      cy.get('[data-testid="login-email"]').type(Cypress.env('USER_EMAIL'))
      cy.get('[data-testid="login-password"]').type(Cypress.env('USER_PASSWORD'))
      cy.get('[data-testid="login-submit"]').click()

      cy.url().should('include', '#dashboard')
      cy.get('[data-testid="dashboard-welcome"]').should('be.visible')
    })
  })

  // ─────────────────────────────────────────────
  // REQUIREMENT 2 — Product search
  // ─────────────────────────────────────────────
  describe('Req 2: Product Search', () => {
    beforeEach(() => {
      cy.login()
      cy.get('[data-testid="nav-products"]').click()
    })

    it('returns at least one result with a visible name and price per row', () => {
      // search is real-time on input — no button needed
      cy.get('[data-testid="product-search"]').type('pipe')

      cy.get('[data-testid="product-row"]').should('have.length.at.least', 1)

      cy.get('[data-testid="product-row"]').each(($row) => {
        cy.wrap($row).within(() => {
          // name is in the first cell as <strong>
          cy.get('strong').should('be.visible')
          // price is the third cell, prefixed with $
          cy.contains('td', '$').should('be.visible')
        })
      })
    })
  })

  // ─────────────────────────────────────────────
  // REQUIREMENT 3 + 4 — Add to cart & API validation
  // ─────────────────────────────────────────────
  describe('Req 3 + 4: Add to Cart with API Validation', () => {
    beforeEach(() => {
      cy.login()
      cy.get('[data-testid="nav-products"]').click()
    })

    it('adds the first product to cart and validates POST /cart request and response', () => {
      cy.intercept('POST', `${Cypress.env('API_URL')}/cart`).as('addToCart')

      cy.get('[data-testid="product-search"]').type('pipe')
      cy.get('[data-testid="product-row"]').should('have.length.at.least', 1)

      // Add to Cart button is inline in the row — no detail page
      cy.get('[data-testid="product-row"]').first()
        .find('[data-testid="add-to-cart-btn"]').click()

      cy.wait('@addToCart').then(({ request, response }) => {
        // Request assertions
        expect(request.body).to.have.property('productId')
        expect(request.body).to.have.property('quantity', 1)

        // Response assertions
        expect(response).to.exist
        expect(response.statusCode).to.equal(200)
        expect(response.body).to.have.property('cartTotal')
      })

      // Cart badge must show at least 1
      cy.get('[data-testid="cart-badge"]').invoke('text').then((text) => {
        expect(parseInt(text.trim())).to.be.at.least(1)
      })
    })
  })

  // ─────────────────────────────────────────────
  // REQUIREMENT 5 — API error state
  // ─────────────────────────────────────────────
  describe('Req 5: API Error State', () => {
    beforeEach(() => {
      cy.login()
      cy.get('[data-testid="nav-products"]').click()
    })

    it('shows an error toast when POST /cart returns 500', () => {
      cy.intercept('POST', `${Cypress.env('API_URL')}/cart`, {
        statusCode: 500,
        body: { error: 'Internal Server Error' },
      }).as('cartError')

      cy.get('[data-testid="product-search"]').type('pipe')
      cy.get('[data-testid="product-row"]').should('have.length.at.least', 1)

      cy.get('[data-testid="product-row"]').first()
        .find('[data-testid="add-to-cart-btn"]').click()

      cy.wait('@cartError').then(({ response }) => {
        expect(response.statusCode).to.equal(500)
      })

      cy.get('[data-testid="toast-error"]').should('be.visible')
    })
  })
})
