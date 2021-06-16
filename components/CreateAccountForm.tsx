/** @jsxImportSource theme-ui */
import HCaptcha from "@hcaptcha/react-hcaptcha"
import Button from "components/Button"
import FormContainer from "components/FormContainer"
import {Field, Form, Formik} from "formik"
import {ClientCreateAccount} from "lib/client"
import {HashAlgos, SigAlgos} from "lib/crypto"
import {useMixpanel} from "lib/mixpanel"
import {createAccountSchemaClient} from "lib/validate"
import {useState} from "react"
import {Box, Grid, Text, Themed} from "theme-ui"
import {CustomSelectComponent, CustomTextareaComponent} from "./inputs"

const styles = {
  publicKeyInput: {
    fontFamily: "monospace",
    px: 20,
    py: 15,
    width: 358,
  },
}

export default function CreateAccountForm({
  hcaptchaSiteKey,
  clientCreateAccount,
  onResult,
}: {
  hcaptchaSiteKey: string
  clientCreateAccount: ClientCreateAccount
  onResult: (result: string) => void
}) {
  const [captchaToken, setCaptchaToken] = useState("")
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
          const address = await clientCreateAccount(
            publicKey,
            signatureAlgorithm,
            hashAlgorithm,
            captchaToken
          )

          setSubmitting(false)
          setCaptchaToken("")

          onResult(address)
          mixpanel.track("Faucet: Create Account", {address})
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Box mb={4}>
              <Themed.h2>Create Account</Themed.h2>
            </Box>
            <Box mb={4}>
              <Themed.h3 sx={{mb: 0}}>Public Key</Themed.h3>
              <Themed.p>
                A public key is a cryptographic code that allows users to
                receive cryptocurrencies into their accounts. The public key and
                the private key are the tools required to ensure the security of
                the crypto economy.
              </Themed.p>
            </Box>
            <Box mb={4}>
              <Field
                component={CustomTextareaComponent}
                inputLabel="Paste Your Public Key"
                name="publicKey"
                placeholder="Public Key"
                required
                sx={styles.publicKeyInput}
                spellcheck={false}
                rows="4"
              />
            </Box>
            <Box mb={4}>
              <Themed.h3>Signature & Hash Algorithms</Themed.h3>
              <Themed.p>
                These algorithms are pre-set by default. When should you switch
                these options? consectetur adipiscing elit. Curabitur quis
                gravida nunc, luctus sodales erat.
              </Themed.p>
            </Box>
            <Box mb={4}>
              <Grid gap={20} columns={["auto", "1fr 1fr"]}>
                <div>
                  <Field
                    component={CustomSelectComponent}
                    name="signatureAlgorithm"
                    inputLabel="Signature Algorithm"
                    options={Object.keys(SigAlgos).map(k => ({
                      value: k,
                      label: k,
                    }))}
                  />
                </div>
                <div>
                  <Field
                    component={CustomSelectComponent}
                    name="hashAlgorithm"
                    inputLabel="Hash Algorithm"
                    options={Object.keys(HashAlgos).map(k => ({
                      value: k,
                      label: k,
                    }))}
                  />
                </div>
              </Grid>
            </Box>
            <Box mb={4}>
              <Themed.h3>Privacy & Security</Themed.h3>
              <Themed.p>
                Please confirm you’re human. FLOW uses hCAPTCHA for increased
                security.
              </Themed.p>
            </Box>
            <Box mb={3}>
              <HCaptcha
                sitekey={hcaptchaSiteKey}
                onVerify={(token: string) => setCaptchaToken(token)}
              />
            </Box>

            <Box mb={3}>
              <Button
                type="submit"
                size="lg"
                block
                disabled={!captchaToken || isSubmitting}
              >
                Create Account
              </Button>
            </Box>

            <Box mb={4}>
              <Text variant="small" sx={{textAlign: "center"}}>
                After clicking “Create Account” we will provide consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </Text>
            </Box>

            <Themed.p sx={{textAlign: "center"}}>
              Already have an account? Fund Account
            </Themed.p>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}
