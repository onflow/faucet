import {
  CREATE_ACCOUNT_ERROR,
  paths,
  PUBLIC_KEY_FORMAT_ERROR,
  PUBLIC_KEY_MISSING_ERROR,
} from "lib/constants"

const CORRECT_PUBLIC_KEY =
  "eb0a7553960b603a2416adc82dbf96ed2125fc20c208210337567826e681073509a4d5c718d122a838836c9fe24388fbe90a2d1cd0fd8f01fa38914494055d18"
const SUCCESS_RESPONSE = {address: "0xeb179c27144f783c"}

const createAccountForm = () => cy.get("[data-test='create-account-form'")
const publicKeyInput = () => cy.get("textarea[name='publicKey']")
const addressInput = () => cy.get("input[name='address']")
const createAccountButton = () =>
  cy.get("[data-test='create-account-submit-button']")
const copyButton = () => cy.get("[data-test='copy-address-button']")

describe("Create account", () => {
  beforeEach(() => {
    cy.stubCaptchaSuccess()
    cy.visit(paths.root)
  })

  it("Creates an account", () => {
    cy.intercept("POST", "/api/account", {body: SUCCESS_RESPONSE, delay: 50})

    createAccountButton().should("be.disabled")

    cy.submitCaptcha()
    publicKeyInput().type(CORRECT_PUBLIC_KEY)

    createAccountButton().click()

    createAccountForm().should(
      "contain",
      "Your account address is being generated"
    )
    copyButton().should("be.disabled")

    createAccountForm().should("contain", "Account Address Generated!")
    copyButton().should("be.enabled")
    addressInput().invoke("val").should("contain", SUCCESS_RESPONSE.address)
  })

  it("Shows error on submit failure", () => {
    cy.intercept("POST", "/api/account", {
      errors: [CREATE_ACCOUNT_ERROR],
    })

    publicKeyInput().type(CORRECT_PUBLIC_KEY)
    cy.submitCaptcha()
    createAccountButton().click()

    createAccountForm().should("not.contain", "Account Address Generated!")
    createAccountForm().should("contain", CREATE_ACCOUNT_ERROR)
  })

  it("Validates public key presence", () => {
    createAccountForm().should("not.contain", PUBLIC_KEY_MISSING_ERROR)

    cy.submitCaptcha()
    createAccountButton().click()

    createAccountForm().should("contain", PUBLIC_KEY_MISSING_ERROR)

    publicKeyInput().clear().type(CORRECT_PUBLIC_KEY)

    createAccountForm().should("not.contain", PUBLIC_KEY_MISSING_ERROR)
    createAccountButton().should("be.enabled")
  })

  it("Validates public key format", () => {
    const error = `${PUBLIC_KEY_FORMAT_ERROR} Read Documentation`
    createAccountForm().should("not.contain", error)

    cy.submitCaptcha()
    createAccountButton().click()

    publicKeyInput().type("incorrect-format")
    createAccountForm().should("contain", error)
    createAccountForm().should("contain", "Read Documentation")

    publicKeyInput().clear().type(CORRECT_PUBLIC_KEY)

    createAccountForm().should("not.contain", error)
    createAccountButton().should("be.enabled")
  })

  it("Visits fund account page", () => {
    cy.get("[data-test='create-account-fund-link']").click()
    cy.get("h1").should("contain", "Fund Account")
  })
})
