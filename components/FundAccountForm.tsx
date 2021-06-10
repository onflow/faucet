import {Loading} from "@geist-ui/react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import {Field, Form, Formik} from "formik"
import React, {useState} from "react"
import {ClientFundAccount} from "../lib/client"
import {useMixpanel} from "../lib/mixpanel"
import {fundAccountSchemaClient} from "../lib/validate"
import {ClientFundAccountResult} from "./FundAccountPanel"
import {CustomInputComponent, CustomSelectComponent} from "./inputs"

const padded = {marginTop: "1rem", marginBottom: "1rem"}

export default function FundAccountForm({
  hcaptchaSiteKey,
  fundAccount,
  onResult,
}: {
  hcaptchaSiteKey: string
  fundAccount: ClientFundAccount
  onResult: (result: ClientFundAccountResult) => void
}) {
  const [captchaToken, setCaptchaToken] = useState("")
  const {mixpanel} = useMixpanel()
  return (
    <Formik
      initialValues={{
        address: "",
        token: "FLOW",
      }}
      validationSchema={fundAccountSchemaClient}
      onSubmit={async ({address, token}, {setSubmitting}) => {
        const amount = await fundAccount(address, token, captchaToken)

        setSubmitting(false)
        setCaptchaToken("")

        onResult({address, token, amount})
        mixpanel.track("Faucet: Fund Account", {address, token, amount})
      }}
    >
      {({isSubmitting}) => (
        <Form>
          <Field
            component={CustomInputComponent}
            inputLabel="Account Address"
            name="address"
            placeholder="Address"
          />

          <Field
            component={CustomSelectComponent}
            name="token"
            inputLabel="Token"
            options={[{value: "FLOW", label: "Testnet FLOW"}]}
          />

          <div style={padded}>
            <HCaptcha
              sitekey={hcaptchaSiteKey}
              onVerify={(token: string) => setCaptchaToken(token)}
            />
          </div>

          <button type="submit" disabled={!captchaToken || isSubmitting}>
            Fund Your Account
          </button>

          {isSubmitting && <Loading>Funding your account</Loading>}
        </Form>
      )}
    </Formik>
  )
}
