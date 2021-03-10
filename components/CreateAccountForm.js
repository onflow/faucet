import React, {useState} from "react"
import {Formik, Form, Field} from "formik"
import HCaptcha from "@hcaptcha/react-hcaptcha"

import {createAccountSchemaClient} from "../lib/validate"

export default function CreateAccountForm({hcaptchaSiteKey, createAccount, onResult}) {
  const [captchaToken, setCaptchaToken] = useState("")
  
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
      }}
    >
      {({errors, touched, isSubmitting}) => (
        <Form>
          <div>
            <Field type="text" name="publicKey" placeholder="Public Key" />
            {errors.publicKey && touched.publicKey && <div>{errors.publicKey}</div>}
          </div>

          <Field as="select" name="signatureAlgorithm">
            <option value="ECDSA_P256">ECDSA_P256</option>
            <option value="ECDSA_secp256k1">ECDSA_secp256k1</option>
          </Field>

          <Field as="select" name="hashAlgorithm">
            <option value="SHA2_256">SHA2_256</option>
            <option value="SHA3_256">SHA3_256</option>
          </Field>

          <HCaptcha
            sitekey={hcaptchaSiteKey}
            onVerify={(token, _) => setCaptchaToken(token)}
          />

          <button type="submit" disabled={!captchaToken || isSubmitting}>
            Create New Account
          </button>

          {isSubmitting && "Submitting..."}
        </Form>
      )}
    </Formik>
  )
}
