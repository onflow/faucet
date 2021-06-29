/** @jsxImportSource theme-ui */
import HCaptcha from "@hcaptcha/react-hcaptcha"
import Button from "components/Button"
import {Field, useFormikContext} from "formik"
import {paths} from "lib/constants"
import publicConfig from "lib/publicConfig"
import {Box, Link, Text, Themed} from "theme-ui"
import {CustomInputComponent, CustomSelectComponent} from "./inputs"

export default function FundAccountFields({
  captchaToken,
  setCaptchaToken,
}: {
  captchaToken: string
  setCaptchaToken: React.Dispatch<React.SetStateAction<string>>
}) {
  const {isSubmitting, isValid} = useFormikContext()

  return (
    <>
      <Box mb={4} mt={4}>
        <Themed.h3 sx={{mb: 0}}>Fund your FLOW account</Themed.h3>
        <Themed.p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          quis gravida nunc, luctus sodales erat. Ut sit amet lectus tempor elit
          scelerisque ornare ut non lectus. Etiam ultricies accumsan eros et
          vulputate.
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
      />
      <Box mb={3} mt={4}>
        <Themed.h3 sx={{mb: 0}}>Token</Themed.h3>
        <Themed.p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          quis gravida nunc, luctus sodales erat.
        </Themed.p>
      </Box>
      <Box mb={4}>
        <Field
          component={CustomSelectComponent}
          name="token"
          inputLabel="Token"
          options={[{value: "FLOW", label: "Testnet FLOW"}]}
        />
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
          Fund Your Account
        </Button>
      </Box>
      <Box mb={4}>
        <Text as="div" variant="small" sx={{textAlign: "center"}}>
          After clicking “Fund Account” we will provide consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </Text>
      </Box>

      <Box mb={5}>
        <Themed.p sx={{textAlign: "center"}}>
          Don&apos;t have an account?{" "}
          <Link href={paths.root} variant="underline">
            Create Account
          </Link>
        </Themed.p>
      </Box>
    </>
  )
}
