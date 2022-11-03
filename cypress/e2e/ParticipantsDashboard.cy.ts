/// <reference types="cypress" />

describe('ParticipantsDashboard.vue', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('disable button when endpoint url is blank', () => {
    // Make sure when the page is loaded, the input is blank and the button is disabled
    cy.get('button#load-participants-api').should('have.attr', 'disabled')
    cy.get('input#participants-api-input').should('have.value', '')
    cy.get('p#endpoint-error').should('not.be.visible')
  })

  it('disable button when endpoint url is invalid', () => {
    // Make sure when an invalid input is typed, we get validation error and a disabled button
    cy.get('input#participants-api-input').type("foo bar")
    cy.get('button#load-participants-api').should('have.attr', 'disabled')
    cy.get('p#endpoint-error').should('be.visible')
  })

  it('allow button when endpoint url is valid', () => {
    // Make sure when an valid input is typed, we get not validation error and an enabled button
    cy.get('input#participants-api-input').type("https://data.sandbox.directory.openbankingbrasil.org.br/participants")
    cy.get('button#load-participants-api').should('not.have.attr', 'disabled')
    cy.get('p#endpoint-error').should('not.be.visible')
  })

  context('loading participants api data', () => {
    beforeEach(() => {
      cy.get('input#participants-api-input').type("https://data.sandbox.directory.openbankingbrasil.org.br/participants")
      cy.get('button#load-participants-api').click()
    })

    it('display all participants rows in the table', () => {
      cy.get('table>tbody tr').should('have.length', 163)

      cy.get('h3#participant-details-title').should('not.exist')
    })

    it('filter participants by registration number', () => {
      cy.get('table>tbody tr').should('have.length', 163)
      cy.get("#registration-numbers-combobox input").type("07853842000135{enter}")
      cy.get('table>tbody tr').should('have.length', 1)
      cy.get('table>tbody tr td').first().should('have.text', '07853842000135')
    })

    it('filter participants by organisation name', () => {
      cy.get('table>tbody tr').should('have.length', 163)
      cy.get("#organisation-names-combobox input").type("CCR DE OURO{enter}")
      cy.get('table>tbody tr').should('have.length', 1)
      cy.get('table>tbody tr td').first().should('have.text', '07853842000135')
    })

    it('filter participants by country', () => {
      cy.get('table>tbody tr').should('have.length', 163)
      cy.get("#countries-combobox input").type("BR{enter}")
      cy.get('table>tbody tr').should('have.length', 160)
    })

    it('filter participants by cities', () => {
      cy.get('table>tbody tr').should('have.length', 163)
      cy.get("#cities-combobox input").type("SAO PAULO{enter}")
      cy.get('table>tbody tr').should('have.length', 76)
    })

    it('open participant details slide over', () => {
      cy.get("#organisation-names-combobox input").type("CCR DE OURO{enter}")
      cy.get('table>tbody tr').should('have.length', 1)

      cy.get('table>tbody tr button').click()
      cy.get('h3#participant-details-title').should('exist')
      cy.get('h3#participant-details-title').should('be.visible')
    })
  })
})
