/// <reference types="cypress" />

describe('Weather App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('renders the app title', () => {
    cy.get('h1', { timeout: 10000 }).should('contain.text', 'Weather Application').should('be.visible');
  });

  it('shows city search result', () => {
    cy.get('[data-testid="search-input"]').type('Melbourne');
    cy.get('[data-testid="search-button"]').click();
    
    cy.wait(2000); 
    
    cy.get('[data-testid="search-results"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('Melbourne').should('be.visible');
      });
  });
  

  it('adds search result to the weather list and checks the weather data', () => {
   
    cy.get('[data-testid="search-input"]', { timeout: 10000 })
      .should('be.visible') 
      .type('Melbourne'); 
  
    cy.get('[data-testid="search-button"]', { timeout: 10000 })
      .should('be.visible')
      .click();
    
    
    cy.get('[data-testid="search-results"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        
        cy.contains('div', 'Melbourne')
          .should('be.visible')
          .first() 
          .click();
      });
  
    
    cy.get('.weather-container', { timeout: 10000 })
      .should('be.visible');
  
    
    cy.get('[data-testid="temperature"]', { timeout: 10000 })
      .should('be.visible')
      .and('not.have.text', 'Loading...')
      .and('not.be.empty');
  
    cy.get('[data-testid="weather-category"]', { timeout: 10000 })
      .should('be.visible')
      .and('not.have.text', 'No data')
      .and('not.be.empty');
  
    
    cy.get('[data-testid="search-results"]', { timeout: 10000 })
      .should('not.exist');
  });
  
  
  
  
});