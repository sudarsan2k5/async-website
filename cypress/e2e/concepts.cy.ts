describe('Documentation Navigation Test', () => {
    // Array of pages in order of navigation
    const documentPages = [
        'Overview',
        'Server',
        'Producer',
        'Consumer',
        'Channel',
        'Application',
        'Protocol',
        'Message',
        'Introduction'
    ]

    beforeEach(() => {
        // Setup: Navigate to concepts page
        cy.visit('http://localhost:3000/en')
        cy.wait(1000) // Wait after page load
        cy.get('[data-id="open-side-bar"]').click()
        cy.get('[data-testid="MobileNav-docs"]').click()
        cy.contains('a', 'Concepts').click()
    })

    it('Should navigate through all documentation pages', () => {
        // Verify initial page
        cy.get('h1').should('contain', documentPages[0])

        // Navigate through all pages
        documentPages.slice(1).forEach(pageName => {
            cy.get('[data-testid="DocsButton-NextPage"]').click()
            cy.get('h1').should('contain', pageName)
        })

        // Navigate back one page
        cy.get('[data-testid="DocsButton-PrevPage"]').click()
    })

    it('Should test feedback functionality', () => {
        // Test suggestion box
        cy.get('[data-id="suggestion-box"]')
            .click()
            .type("Help us improve the docs by adding your contribution.")
            .clear()
            .should('have.value', '')

        // Submit feedback
        cy.get('[data-id="feedback-button"]').click()
    })

    it('Should return to homepage', () => {
        // Click logo to return home
        cy.get('[data-testid="Navbar-logo"]').click()
        cy.url().should('eq', 'http://localhost:3000/en')
    })
})
