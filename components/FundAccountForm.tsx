/** @jsxImportSource theme-ui */
import FormContainer from "components/FormContainer"
import FundAccountFields from "components/FundAccountFields"
import TokenFundingInfo from "components/TokenFundingInfo"
import {Form, Formik} from "formik"
import {fundAccount} from "lib/client"
import {FLOW_TYPE, TokenTypes} from "lib/constants"
import {useMixpanel} from "lib/mixpanel"
import {fundAccountSchemaClient} from "lib/validate"
import {useState} from "react"
import {Box} from "theme-ui"
import {Themed} from "@theme-ui/mdx"
import {ClientFundAccountResult} from "./FundAccountPanel"
import FundAccountSubmitted from "./FundAccountSubmitted"
import publicConfig from "../lib/publicConfig"

export default function FundAccountForm({address}: {address: string}) {
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
          address: address,
          token: FLOW_TYPE,
        }}
        enableReinitialize
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
            mixpanel.track("Faucet: Fund Account", {
              address,
              token,
              amount,
              network: publicConfig.network,
            })
          }

          setSubmitting(false)
        }}
      >
        {({
          values,
          isSubmitting,
        }: {
          values: {token: TokenTypes; address: string}
          isSubmitting: boolean
        }) => (
          <Form data-test="fund-account-form">
            <Box mt={4} mb={3}>
              <Themed.h1>Fund Account</Themed.h1>
            </Box>
            <TokenFundingInfo
              description="when you fund your account"
              token={values.token}
            />
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
