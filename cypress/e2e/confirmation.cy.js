require('cypress-xpath')

describe("Confirmation Page", () => {
    before(() => {
    });
  
    it('should allow users to sign in with valid credentials', () => {
        cy.visit('http://localhost:3000/Sign-in');
        cy.get('input[type="text"]').type('admin@ac.sce.il');
        cy.get('input[type="password"]').type('123456');
        cy.xpath('/html/body/div/div/section/div[2]/form/div[3]/span').click();
        cy.wait(4000); // Wait for four seconds
        cy.url().should('eq', 'http://localhost:3000/');
      });
    it("renders confirmation page with correct reservation data", () => {
        cy.visit('http://localhost:3000/Sign-in');
        cy.get('input[type="text"]').type('admin@ac.sce.il');
        cy.get('input[type="password"]').type('123456');
        cy.xpath('/html/body/div/div/section/div[2]/form/div[3]/span').click();
        cy.wait(4000); // Wait for four seconds
        cy.url().should('eq', 'http://localhost:3000/');
    
      cy.visit("http://localhost:3000/Confirmation");
  
      cy.get(".title").should("contain", "Confirmation page");
  
      cy.get(".reservation-card").first().as("reservationCard");
  
      cy.get("@reservationCard").should("contain", "Reservation ID:");
      cy.get("@reservationCard").should("contain", "First Name:");
      cy.get("@reservationCard").should("contain", "Last Name:");
      cy.get("@reservationCard").should("contain", "From:");
      cy.get("@reservationCard").should("contain", "Return:");
      cy.get("@reservationCard").should("contain", "Status:");
  
      //Click the "Set as Pending" button and verify the status changes
      cy.wait(1000);  // Wait for one second
      cy.get("@reservationCard").find(".status-buttons .orange").click({force: true});
      cy.get("@reservationCard").should("contain", "Status: Pending");
      //Click the "Cancel" button and verify the status changes
      cy.get("@reservationCard").find(".status-buttons .red").click({force: true});
      cy.get("@reservationCard").should("contain", "Status: Cancel");
      //Click the "Accept" button and verify the status changes
      cy.get("@reservationCard").find(".status-buttons .btn").click({force: true});
      cy.get("@reservationCard").should("contain", "Status: Accept");
    });

   it("should show Lecturer text for teacher res", () => {
        cy.visit('http://localhost:3000/Sign-in');
        cy.get('input[type="text"]').type('admin@ac.sce.il');
        cy.get('input[type="password"]').type('123456');
        cy.xpath('/html/body/div/div/section/div[2]/form/div[3]/span').click();
        cy.wait(4000); // Wait for four seconds
        cy.url().should('eq', 'http://localhost:3000/');
    
      cy.visit("http://localhost:3000/Confirmation");
  
      cy.get(".title").should("contain", "Confirmation page");
  
      cy.get(".reservation-card").first().as("reservationCard");
  
      cy.get("@reservationCard").should("contain", "Reservation ID:");
      cy.get("@reservationCard").should("contain", "First Name:");
      cy.get("@reservationCard").should("contain", "Last Name:");
      cy.get("@reservationCard").should("contain", "From:");
      cy.get("@reservationCard").should("contain", "Return:");
      cy.get("@reservationCard").should("contain", "Status:");
      cy.get("@reservationCard").should("contain", "Lecturers reservation");
      
    });
  });
  