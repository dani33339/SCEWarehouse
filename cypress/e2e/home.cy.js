require('cypress-xpath')

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Sign-in');
    cy.get('input[type="text"]').type('admin@ac.sce.il');
    cy.get('input[type="password"]').type('123456');
    cy.xpath('/html/body/div/div/section/div[2]/form/div[3]/span').click();
    cy.wait(4000); // Wait for four seconds
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('Filters and search for items', () => {

    
    cy.get('select').select(5);

    
    cy.get('.searchOptions').click();
    cy.wait(6000);

    
    cy.get('.singleDestination').each(($item) => {
        cy.wrap($item).within(() => {
          cy.get('.desc').should('contain', 'Description:');
        });
      }).then(() => {
        
      });
  });

  it('should set the description search term correctly', () => {


    cy.get('select').select(5);

    cy.get('.Description') // based on the class name in your component
      .type('ac2')
      .should('have.value', 'ac2')

    cy.get('.searchOptions').click();
    cy.wait(6000);


    cy.get('.singleDestination').each(($item) => {
        cy.wrap($item).within(() => {
          cy.get('.desc').should('contain', 'Description:');
        });
      }).then(() => {

      });
  });
});