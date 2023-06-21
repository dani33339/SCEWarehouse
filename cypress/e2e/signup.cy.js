describe('Signup Page', function() {
    beforeEach(() => {
      cy.visit('http://localhost:3000/Sign-up');
    });
  
    it('Allows a new user to sign up', function() {
      cy.get('.emailInput input').type('testIntergration500557@ac.sce.ac.il');
      cy.get('.PassWordInput input').type('testpassword');
      cy.get('.FnameInput input').type('Test');
      cy.get('.LnameInput input').type('User');
      cy.get('.dateInput input').type('2000-01-01');
  
      cy.get('.submit span').click();
      cy.wait(10000);

      cy.url().should('eq', 'http://localhost:3000/');
  
      cy.reload();
      cy.window().its('localStorage.user').should('exist');
    });
  
    it('Shows an error if the email is already in use', function() {
      cy.get('.emailInput input').type('admin@ac.sce.il');
      cy.get('.PassWordInput input').type('testpassword');
      cy.get('.FnameInput input').type('Test');
      cy.get('.LnameInput input').type('User');
      cy.get('.dateInput input').type('2000-01-01');
  
      cy.get('.submit span').click();
      cy.wait(3000);
      cy.get('.error-notification').should('be.visible');
      
    });
  });
  