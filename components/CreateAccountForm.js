import React, {useState} from "react"
import {Formik, Form, Field} from "formik"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import {Loading} from "@geist-ui/react"

import {createAccountSchemaClient} from "../lib/validate"
import {CustomInputComponent, CustomSelectComponent} from "./inputs"

import {useMixpanel} from "../lib/mixpanel"

const padded = {marginTop: "1rem", marginBottom: "1rem"}

export default function CreateAccountForm({
  hcaptchaSiteKey,
  createAccount,
  onResult,
}) {
  const [captchaToken, setCaptchaToken] = useState("")
  const {mixpanel} = useMixpanel()
  return (
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
        const address = await createAccount(
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
          <Field
            component={CustomInputComponent}
            inputLabel="Public Key"
            name="publicKey"
            placeholder="Public Key"
          />

          <Field
            component={CustomSelectComponent}
            name="signatureAlgorithm"
            inputLabel="Signature Algorithm"
            options={[
              {value: "ECDSA_P256", label: "ECDSA_P256"},
              {value: "ECDSA_secp256k1", label: "ECDSA_secp256k1"},
            ]}
          />

          <Field
            component={CustomSelectComponent}
            name="hashAlgorithm"
            inputLabel="Hash Algorithm"
            options={[
              {value: "SHA2_256", label: "SHA2_256"},
              {value: "SHA3_256", label: "SHA3_256"},
            ]}
          />

          <div style={padded}>
            <HCaptcha
              sitekey={hcaptchaSiteKey}
              onVerify={(token, _) => setCaptchaToken(token)}
            />
          </div>

          <button type="submit" disabled={!captchaToken || isSubmitting}>
            Create New Account
          </button>

          {isSubmitting && <Loading>Creating your account</Loading>}
        </Form>
      )}
    </Formik>
  )
}
