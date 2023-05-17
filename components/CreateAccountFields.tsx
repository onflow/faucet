/** @jsxImportSource theme-ui */
import Button from "components/Button"
import Captcha from "components/Captcha"
import FormErrors from "components/FormErrors"
import {Field, useFormikContext} from "formik"
import {GENERATE_KEYS_DOCS_URL, paths} from "lib/constants"
import {HashAlgos, SigAlgos} from "lib/crypto"
import {Box, Grid, Link, Text, Themed} from "theme-ui"
import {CustomSelectComponent, CustomTextareaComponent} from "./inputs"

const styles = {
  publicKeyInputContainer: {
    width: [296, 358, 358, 451],
  },
  publicKeyInputField: {
    fontFamily: "monospace",
    fontSize: [1, 2],
    overflow: "hidden",
    letterSpacing: ["inherit", "inherit", "inherit", "0.182rem"],
  },
}

export default function CreateAccountFields({
  captchaToken,
  setCaptchaToken,
  errors,
}: {
  captchaToken: string
  setCaptchaToken: React.Dispatch<React.SetStateAction<string>>
  errors: string[]
}) {
  const {isSubmitting, isValid, setFieldValue} = useFormikContext()

  return (
    <>
      <Box mb={4} mt={4}>
        <Themed.h3 sx={{mb: 0}}>Public Key</Themed.h3>
        <Themed.p sx={{pr: 3}}>
          Your public key must be a 128 character hexadecimal string. You can
          generate your public/private key pairs using the{" "}
          <Link href={GENERATE_KEYS_DOCS_URL} target="_blank">
            Flow CLI
          </Link>
          .
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
          Select the signature and hash algorithm used to generate your keys. If
          you used the CLI to generate them, the defaults of ECDSA_P256 and
          SHA3_256 should be used.
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
        <Captcha onVerify={setCaptchaToken} />
      </Box>
      <Box mb={3}>
        <Button
          type="submit"
          size="lg"
          block
          disabled={!captchaToken || isSubmitting || !isValid}
          data-test="create-account-submit-button"
        >
          Create Account
        </Button>
        {errors.length > 0 && <FormErrors errors={errors} />}
      </Box>
      <Box mb={4}>
        <Text as="div" variant="small" sx={{textAlign: "center"}}>
          After clicking “Create Account”, your public account address will be
          created, funded with some tokens, and provided to you to copy and use.
        </Text>
      </Box>
      <Box mb={5}>
        <Themed.p sx={{textAlign: "center"}}>
          Already have an account?{" "}
          <Link
            href={paths.fundAccount}
            variant="underline"
            data-test="create-account-fund-link"
          >
            Fund Account
          </Link>
        </Themed.p>
      </Box>
    </>
  )
}
