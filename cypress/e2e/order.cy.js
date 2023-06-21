require('cypress-xpath')

describe('Order Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Sign-in');
    cy.get('input[type="text"]').type('orel@ac.sce.ac.il');
    cy.get('input[type="password"]').type('123456');
    cy.xpath('/html/body/div/div/section/div[2]/form/div[3]/span').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
  


  it('should fill out and submit the form', () => {
    cy.wait(4000); 
  cy.get('.singleDestination').first().find('button').click();
  
  cy.get('.DepartInput input').type('2023-09-05{enter}');

    cy.get('.ReturnInput input').type('2023-09-07{enter}');
    cy.get('#terms-checkbox').check({ force: true });


    cy.get('button.btn2').contains("Submit").click().then(() => {
      cy.url().should('include', 'http://localhost:3000/Myorders');
    });
    
  });

});