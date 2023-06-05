/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe('Navigation', () => {
  it('should navigate to the login page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="/auth/login"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/auth/login')

    // The new page should contain an h1 with "About page"
    cy.get('.MuiTypography-h3').contains('Sign In with Email').then(() => {
      cy.get('input[name*="email"]').type("noqueffodabroi-9784@yopmail.com")
      cy.get('input[name*="password"]').type("123123")
      cy.get('button[type="submit"]').click()
    })

    cy.url().should('include', '/dashboard').then(() => {
      cy.find("div.MuiListItemButton-root > div.MuiListItemText-root > p.MuiTypography-root").last().contains("Sign Out").parentsUntil("div.MuiListItemButton-root").click();
    })

    cy.url().should('include', '/auth/login')
  })
})

// Prevent TypeScript from reading file as legacy script
export { }