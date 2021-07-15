import "cypress-iframe"

Cypress.Commands.add("submitCaptcha", () => {
  cy.stubCaptchaSuccess()
  cy.iframe("[data-test=hcaptcha] iframe").find("#checkbox").click()
})

Cypress.Commands.add("stubCaptchaSuccess", () => {
  cy.intercept("POST", "https://hcaptcha.com/checksiteconfig*", {pass: true})
  cy.intercept("POST", "https://hcaptcha.com/getcaptcha*", {
    pass: true,
    generated_pass_UUID: "10000000-aaaa-bbbb-cccc-000000000001",
    expiration: 120,
  })
})
