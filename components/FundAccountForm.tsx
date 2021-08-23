/** @jsxImportSource theme-ui */
import * as fcl from "@onflow/fcl"
import FormContainer from "components/FormContainer"
import FundAccountFields from "components/FundAccountFields"
import TokenFundingInfo from "components/TokenFundingInfo"
import {Form, Formik} from "formik"
import {fundAccount} from "lib/client"
import {useMixpanel} from "lib/mixpanel"
import {fundAccountSchemaClient} from "lib/validate"
import {useState} from "react"
import {Box, Themed} from "theme-ui"
import {ClientFundAccountResult} from "./FundAccountPanel"
import FundAccountSubmitted from "./FundAccountSubmitted"

// https://github.com/onflow/fusd/blob/main/transactions/setup_fusd_vault.cdc
const txInitFUSD = `
  // This transaction configures the signer's account with an empty FUSD vault.
  //
  // It also links the following capabilities:
  //
  // - FungibleToken.Receiver: this capability allows this account to accept FUSD deposits.
  // - FungibleToken.Balance: this capability allows anybody to inspect the FUSD balance of this account.

  import FUSD from 0xFUSDADDRESS
  import FungibleToken from 0xFUNGIBLETOKENADDRESS

  transaction {
      prepare(signer: AuthAccount) {
          // It's OK if the account already has a Vault, but we don't want to replace it
          if (signer.borrow<&FUSD.Vault>(from: /storage/fusdVault) != nil) {
              return
          }

          // Create a new FUSD Vault and put it in storage
          signer.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

          // Create a public capability to the Vault that only exposes
          // the deposit function through the Receiver interface
          signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
              /public/fusdReceiver,
              target: /storage/fusdVault
          )

          // Create a public capability to the Vault that only exposes
          // the balance field through the Balance interface
          signer.link<&FUSD.Vault{FungibleToken.Balance}>(
              /public/fusdBalance,
              target: /storage/fusdVault
          )
      }
  }
`

export default function FundAccountForm() {
  const [errors, setErrors] = useState<string[]>([])
  const [captchaToken, setCaptchaToken] = useState("")
  const {mixpanel} = useMixpanel()
  const [result, setResult] = useState<ClientFundAccountResult | undefined>(
    undefined
  )

  return (
    <FormContainer>
      <Formik
        initialValues={{
          address: "",
          token: "FLOW",
        }}
        validationSchema={fundAccountSchemaClient}
        onSubmit={async ({address, token}, {setSubmitting}) => {
          setErrors([])
          setCaptchaToken("")

          if (token === "FUSD") {
            const currentUser = fcl.currentUser()
            const currentUserAddress = (await currentUser.snapshot()).addr
            if (currentUserAddress !== address) {
              currentUser.unauthenticate()
            }
            try {
              await fcl.mutate({
                cadence: txInitFUSD,
                limit: 50,
                proposer: fcl.authz,
                payer: fcl.authz,
                authorizations: [fcl.authz],
              })
            } catch (e: unknown) {
              // eslint-disable-next-line no-console
              console.log("txInitFUSD Error")
              // eslint-disable-next-line no-console
              console.log(e)
              setErrors(["FUSD funding failed. Please try again."])
              return
            }
          }

          const response = await fundAccount(address, token, captchaToken)

          if (response.errors) {
            setErrors(response.errors)
          } else if (response.amount) {
            const {amount} = response
            setResult({address, token, amount})
            mixpanel.track("Faucet: Fund Account", {address, token, amount})
          }

          setSubmitting(false)
        }}
      >
        {({isSubmitting}) => (
          <Form data-test="fund-account-form">
            <Box mt={4} mb={3}>
              <Themed.h1>Fund Account</Themed.h1>
            </Box>
            <TokenFundingInfo description="when you fund your account" />
            {isSubmitting || typeof result !== "undefined" ? (
              <FundAccountSubmitted result={result} />
            ) : (
              <FundAccountFields
                captchaToken={captchaToken}
                setCaptchaToken={setCaptchaToken}
                errors={errors}
              />
            )}
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}
