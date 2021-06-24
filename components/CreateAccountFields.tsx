/** @jsxImportSource theme-ui */
import HCaptcha from "@hcaptcha/react-hcaptcha"
import Button from "components/Button"
import {Field, useFormikContext} from "formik"
import {paths} from "lib/constants"
import {HashAlgos, SigAlgos} from "lib/crypto"
import publicConfig from "lib/publicConfig"
import {Box, Grid, Link, Text, Themed} from "theme-ui"
import {CustomSelectComponent, CustomTextareaComponent} from "./inputs"

const styles = {
  publicKeyInputContainer: {
    width: [300, 358],
  },
  publicKeyInputField: {
    fontFamily: "monospace",
    fontSize: [1, 2],
    overflow: "hidden",
  },
}

export default function CreateAccountFields({
  captchaToken,
  setCaptchaToken,
}: {
  captchaToken: string
  setCaptchaToken: React.Dispatch<React.SetStateAction<string>>
}) {
  const {isSubmitting, isValid, setFieldValue} = useFormikContext()

  return (
    <>
      <Box mb={4} mt={4}>
        <Themed.h3 sx={{mb: 0}}>Public Key</Themed.h3>
        <Themed.p>
          A public key is a cryptographic code that allows users to receive
          cryptocurrencies into their accounts. The public key and the private
          key are the tools required to ensure the security of the crypto
          economy.
        </Themed.p>
      </Box>
      <Box mb={4} sx={styles.publicKeyInputContainer}>
        <Field
          component={CustomTextareaComponent}
          inputLabel="Paste Your Public Key"
          name="publicKey"
          placeholder="Your Public Key"
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue("publicKey", e.target.value.slice(0, 128))
          }
          sx={styles.publicKeyInputField}
          spellcheck={false}
          rows="4"
        />
      </Box>
      <Box mb={4}>
        <Themed.h3>Signature & Hash Algorithms</Themed.h3>
        <Themed.p>
          These algorithms are pre-set by default. When should you switch these
          options? consectetur adipiscing elit. Curabitur quis gravida nunc,
          luctus sodales erat.
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
      <Box mb={3}>
        <HCaptcha
          sitekey={publicConfig.hcaptchaSiteKey}
          onVerify={(token: string) => setCaptchaToken(token)}
        />
      </Box>
      <Box mb={3}>
        <Button
          type="submit"
          size="lg"
          block
          disabled={!captchaToken || isSubmitting || !isValid}
        >
          Create Account
        </Button>
      </Box>
      <Box mb={4}>
        <Text as="div" variant="small" sx={{textAlign: "center"}}>
          After clicking “Create Account” we will provide consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </Text>
      </Box>
      <Box mb={5}>
        <Themed.p sx={{textAlign: "center"}}>
          Already have an account?{" "}
          <Link href={paths.fundAccount} variant="underline">
            Fund Account
          </Link>
        </Themed.p>
      </Box>
    </>
  )
}
