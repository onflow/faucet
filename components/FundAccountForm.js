import React, {useState} from "react"
import {Formik, Form, Field} from "formik"
import HCaptcha from "@hcaptcha/react-hcaptcha"

import {fundAccountSchemaClient} from "../lib/validate"

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
          <div>
            <Field type="text" name="address" placeholder="Address" />
            {errors.address && touched.address &&  <div>{errors.address}</div>}
          </div>

          <Field as="select" name="token">
            <option value="FLOW">FLOW</option>
          </Field>  

          <HCaptcha
            sitekey={hcaptchaSiteKey}
            onVerify={(token, _) => setCaptchaToken(token)}
          />

          <button type="submit" disabled={!captchaToken || isSubmitting}>
            Fund Your Account
          </button>

          {isSubmitting && "Submitting..."}
        </Form>
      )}
    </Formik>
  )
}
