import {Loading} from "@geist-ui/react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import {Field, Form, Formik} from "formik"
import React, {useState} from "react"
import {ClientCreateAccount} from "../lib/client"
import {HashAlgos, SigAlgos} from "../lib/crypto"
import {useMixpanel} from "../lib/mixpanel"
import {createAccountSchemaClient} from "../lib/validate"
import {CustomInputComponent, CustomSelectComponent} from "./inputs"

const padded = {marginTop: "1rem", marginBottom: "1rem"}

export default function CreateAccountForm({
  hcaptchaSiteKey,
  createAccount,
  onResult,
}: {
  hcaptchaSiteKey: string
  createAccount: ClientCreateAccount
  onResult: (result: string) => void
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
            options={Object.keys(SigAlgos).map(k => ({value: k, label: k}))}
          />

          <Field
            component={CustomSelectComponent}
            name="hashAlgorithm"
            inputLabel="Hash Algorithm"
            options={Object.keys(HashAlgos).map(k => ({value: k, label: k}))}
          />

          <div style={padded}>
            <HCaptcha
              sitekey={hcaptchaSiteKey}
              onVerify={(token: string) => setCaptchaToken(token)}
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
