/** @jsxImportSource theme-ui */
import CreateAccountFields from "components/CreateAccountFields"
import CreateAccountSubmitted from "components/CreateAccountSubmitted"
import FormContainer from "components/FormContainer"
import TokenFundingInfo from "components/TokenFundingInfo"
import {Form, Formik} from "formik"
import {ClientCreateAccount} from "lib/client"
import {useMixpanel} from "lib/mixpanel"
import {createAccountSchemaClient} from "lib/validate"
import {useState} from "react"
import {Box, Themed} from "theme-ui"

export default function CreateAccountForm({
  clientCreateAccount,
}: {
  clientCreateAccount: ClientCreateAccount
}) {
  const [errors, setErrors] = useState<string[]>([])
  const [captchaToken, setCaptchaToken] = useState("")
  const [address, setAddress] = useState("")
  const {mixpanel} = useMixpanel()

  return (
    <FormContainer>
      <Formik
        initialValues={{
          publicKey: "",
          signatureAlgorithm: "ECDSA_P256",
          hashAlgorithm: "SHA3_256",
        }}
        validationSchema={createAccountSchemaClient}
        onSubmit={async (
          {publicKey, hashAlgorithm, signatureAlgorithm},
          {setSubmitting}
        ) => {
          setErrors([])
          setCaptchaToken("")

          const response = await clientCreateAccount(
            publicKey,
            signatureAlgorithm,
            hashAlgorithm,
            captchaToken
          )

          if (response.errors) {
            setErrors(response.errors)
          } else if (response.address) {
            const {address} = response
            setAddress(address)
            mixpanel.track("Faucet: Create Account", {address})
          }
          setSubmitting(false)
        }}
      >
        {({isSubmitting}) => (
          <Form data-test="create-account-form">
            <Box mt={4} mb={3}>
              <Themed.h1 sx={{mb: 0}}>Create Account</Themed.h1>
            </Box>
            <TokenFundingInfo description="after your account has been generated!" />
            {isSubmitting || address.length > 0 ? (
              <CreateAccountSubmitted address={address} />
            ) : (
              <CreateAccountFields
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
