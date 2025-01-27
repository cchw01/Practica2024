describe('Login Page E2E Tests', () => {
  const baseUrl = 'http://localhost:4200';

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });

  it('should display the login form', () => {
    cy.get('form').should('exist');
    cy.get('input[formControlName="email"]').should('exist');
    cy.get('input[formControlName="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
  });

  it('should show error messages for invalid inputs', () => {
    cy.get('button[type="submit"]').click();

    cy.get('mat-error').contains('E-mail is required!').should('be.visible');
    cy.get('mat-error').contains('Password is required!').should('be.visible');

    cy.get('input[formControlName="email"]').type('invalid-email');
    cy.get('mat-error').contains('Enter a valid email!').should('be.visible');
  });

  it('should log in successfully with valid credentials', () => {
    cy.intercept('POST', '/api/User/login', {
      statusCode: 200,
      body: {
        id: 1,
        email: 'admin@wateryairlines.com',
        token: 'fake-jwt-token',
      },
    }).as('loginRequest');

    cy.get('input[formControlName="email"]').type('admin@wateryairlines.com');
    cy.get('input[formControlName="password"]').type('admin');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
    });

    cy.url().should('eq', `${baseUrl}/`);
  });

  
});