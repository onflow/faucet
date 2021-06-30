/** @jsxImportSource theme-ui */
import FormContainer from "components/FormContainer"
import FundAccountFields from "components/FundAccountFields"
import TokenFundingInfo from "components/TokenFundingInfo"
import {Form, Formik} from "formik"
import {fundAccount} from "lib/client"
import {useMixpanel} from "lib/mixpanel"
import publicConfig from "lib/publicConfig"
import {fundAccountSchemaClient} from "lib/validate"
import {useState} from "react"
import {Box, Flex, Themed} from "theme-ui"
import {ClientFundAccountResult} from "./FundAccountPanel"
import FundAccountSubmitted from "./FundAccountSubmitted"

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
            <Box my={3}>
              <Flex>
                <img
                  src={`${publicConfig.network}-faucet-icon.svg`}
                  alt="Test Net Faucet"
                  sx={{mr: 3}}
                  width={42}
                />
                <Themed.h1>Fund Account</Themed.h1>
              </Flex>
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
