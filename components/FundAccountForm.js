import React, {useState} from "react"
import {Formik, Form, Field} from "formik"
import HCaptcha from "@hcaptcha/react-hcaptcha"

import {fundAccountSchemaClient} from "../lib/validate"
import {CustomInputComponent, CustomSelectComponent} from "./inputs"

const padded = { marginTop: "1rem", marginBottom: "1rem" }

export default function FundAccountForm({hcaptchaSiteKey, fundAccount, onResult}) {
  const [captchaToken, setCaptchaToken] = useState("")
  
  return (
    <Formik
      initialValues={{
        address: "",
        token: "FLOW",
      }}
      validationSchema={fundAccountSchemaClient}
      onSubmit={async (
        {address, token},
        {setSubmitting}
      ) => {
        const amount = await fundAccount(
          address,
          token,
          captchaToken
        )

        setSubmitting(false)
        setCaptchaToken("")

        onResult({ address, token, amount })
      }}
    >
      {({errors, touched, isSubmitting}) => (
        <Form>
          <Field 
            component={CustomInputComponent} 
            textLabel="Account Address" 
            name="address" 
            placeholder="Address" />

          <Field 
            component={CustomSelectComponent} 
            name="token"
            textLabel="Token"
            options={[
              { value: "FLOW", label: "Testnet FLOW" },
            ]} />

          <div style={padded}>
            <HCaptcha
              sitekey={hcaptchaSiteKey}
              onVerify={(token, _) => setCaptchaToken(token)}
            />
          </div>

          <button type="submit" disabled={!captchaToken || isSubmitting}>
            Fund Your Account
          </button>

          {isSubmitting && "Submitting..."}
        </Form>
      )}
    </Formik>
  )
}
