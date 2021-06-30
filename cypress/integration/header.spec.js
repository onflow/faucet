import {paths} from "lib/constants"

describe("Header", () => {
  const header = () => cy.get("[data-test='header']")
  const headerFundLink = () => cy.get("[data-test='header-fund-link'")
  const headerCreateLink = () => cy.get("[data-test='header-create-link'")

  it("Navigates to fund account page", () => {
    cy.visit(paths.root)
    headerFundLink().click()
    cy.get("h1").should("contain", "Fund Account")
    header().should("contain", "Don't have an account?")
  })

  it("Navigates to create account page", () => {
    cy.visit(paths.fundAccount)
    headerCreateLink().click()
    cy.get("h1").should("contain", "Create Account")
    header().should("contain", "Already have an account?")
  })
})
