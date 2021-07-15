import {
  ADDRESS_FORMAT_ERROR,
  ADDRESS_MISSING_ERROR,
  FUND_ACCOUNT_ERROR,
  paths,
} from "lib/constants"

const CORRECT_ADDRESS = "0xeb179c27144f783c"
const SUCCESS_RESPONSE = {token: "FLOW", amount: "1000.0"}

const fundAccountForm = () => cy.get("[data-test='fund-account-form'")
const addressInput = () => cy.get("input[name='address']")
const fundAccountButton = () =>
  cy.get("[data-test='fund-account-submit-button']")

describe("Fund account", () => {
  beforeEach(() => {
    cy.visit(paths.fundAccount)
    cy.stubCaptchaSuccess()
  })

  it("Funds an account", () => {
    cy.intercept("POST", "/api/fund", {body: SUCCESS_RESPONSE, delay: 50})

    fundAccountButton().should("be.disabled")

    addressInput().type(CORRECT_ADDRESS)
    cy.submitCaptcha()

    fundAccountButton().click()

    fundAccountForm().should("contain", "We are funding your account")

    fundAccountForm().should("contain", "Account Funded!")
    fundAccountForm().should(
      "contain",
      `${parseFloat(SUCCESS_RESPONSE.amount).toLocaleString()} ${
        SUCCESS_RESPONSE.token
      } tokens`
    )
  })

  it("Shows error on submit failure", () => {
    cy.intercept("POST", "/api/fund", {
      errors: [FUND_ACCOUNT_ERROR],
    })

    addressInput().clear().type(CORRECT_ADDRESS)
    cy.submitCaptcha()
    fundAccountButton().click()

    fundAccountForm().should("not.contain", "Account Funded!")
    fundAccountForm().should("contain", FUND_ACCOUNT_ERROR)
  })

  it("Validates public key presence", () => {
    fundAccountForm().should("not.contain", ADDRESS_MISSING_ERROR)

    cy.submitCaptcha()
    fundAccountButton().click()

    fundAccountForm().should("contain", ADDRESS_MISSING_ERROR)

    addressInput().clear().type(CORRECT_ADDRESS)

    fundAccountForm().should("not.contain", ADDRESS_MISSING_ERROR)
    fundAccountButton().should("be.enabled")
  })

  it("Validates public key format", () => {
    const error = `${ADDRESS_FORMAT_ERROR} Read Documentation`
    fundAccountForm().should("not.contain", error)

    cy.submitCaptcha()
    fundAccountButton().click()

    addressInput().type("incorrect-format")
    fundAccountForm().should("contain", error)

    addressInput().clear().type(CORRECT_ADDRESS)

    fundAccountForm().should("not.contain", error)
    fundAccountButton().should("be.enabled")
  })

  it("Visits create account page", () => {
    cy.get("[data-test='fund-account-create-link']").click()
    cy.get("h1").should("contain", "Create Account")
  })
})
