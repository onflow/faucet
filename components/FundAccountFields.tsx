/** @jsxImportSource theme-ui */
import Button from "components/Button"
import Captcha from "components/Captcha"
import FormErrors from "components/FormErrors"
import {Field, useFormikContext} from "formik"
import {FLOW_TYPE, paths} from "lib/constants"
import {NETWORK_DISPLAY_NAME} from "lib/network"
import {Box, Link, Themed} from "theme-ui"
import {CustomInputComponent} from "./inputs"

export const TOKEN_OPTIONS = [
  {value: FLOW_TYPE, label: `${NETWORK_DISPLAY_NAME} FLOW`},
]

export default function FundAccountFields({
  captchaToken,
  setCaptchaToken,
  errors,
}: {
  captchaToken: string
  setCaptchaToken: React.Dispatch<React.SetStateAction<string>>
  errors: string[]
}) {
  const {isSubmitting, isValid} = useFormikContext()

  return (
    <>
      <Box mb={4} mt={4}>
        <Themed.h3 sx={{mb: 0}}>Fund your FLOW account</Themed.h3>
        <Themed.p>
          Once you have created an account, you can incrementally add additional
          funds to it. Your address should be a 16 character hexadecimal string.
        </Themed.p>
      </Box>
      <Field
        component={CustomInputComponent}
        inputLabel="Paste Your Account Address"
        name="address"
        placeholder="Your Account Address"
        autoComplete="off"
        required
        max={128}
        sx={{fontFamily: "monospace"}}
      />
      {/*<Box mb={3} mt={4}>*/}
      {/*  <Themed.h3 sx={{mb: 0}}>Token</Themed.h3>*/}
      {/*</Box>*/}
      {/*<Box mb={4}>*/}
      {/*  <Field*/}
      {/*    component={CustomSelectComponent}*/}
      {/*    name="token"*/}
      {/*    inputLabel="Token"*/}
      {/*    options={TOKEN_OPTIONS}*/}
      {/*  />*/}
      {/*</Box>*/}
      <Box mb={3} mt={4}>
        <Captcha onVerify={setCaptchaToken} />
      </Box>
      <Box mb={3}>
        <Button
          type="submit"
          size="lg"
          block
          disabled={!captchaToken || isSubmitting || !isValid}
          data-test="fund-account-submit-button"
        >
          Fund Your Account
        </Button>
        {errors.length > 0 && <FormErrors errors={errors} />}
      </Box>
      <Box mb={5}>
        <Themed.p sx={{textAlign: "center"}}>
          Don&apos;t have an account?{" "}
          <Link
            href={paths.root}
            variant="underline"
            data-test="fund-account-create-link"
          >
            Create Account
          </Link>
        </Themed.p>
      </Box>
    </>
  )
}
