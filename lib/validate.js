import * as yup from "yup"

const captchaSchemaShape = {
  "h-captcha-response": yup.string().required(),
}

const createAccountSchemaClientShape = {
  publicKey: yup
    .string()
    .matches(/^([0-9a-f]{128})$/i, "Public key must be a hexadecimal string with no spaces.")
    .required("Public key is required."),
  signatureAlgorithm: yup
    .string()
    .oneOf(["ECDSA_P256", "ECDSA_secp256k1"])
    .required(),
  hashAlgorithm: yup.string().oneOf(["SHA2_256", "SHA3_256"]).required(),
}

const createAccountSchemaServerShape = {
  ...createAccountSchemaClientShape,
  ...captchaSchemaShape,
}

export const createAccountSchemaClient = yup
  .object()
  .shape(createAccountSchemaClientShape)

export const createAccountSchemaServer = yup
  .object()
  .shape(createAccountSchemaServerShape)

const fundAccountSchemaClientShape = {
  address: yup
    .string()
    .matches(/^(0x)?([0-9a-f]{16})$/i, "Address must be a 16-character hexadecimal string.")
    .required("Address is required."),
  token: yup.string().oneOf(["FLOW"]).required(),
}

const fundAccountSchemaServerShape = {
  ...fundAccountSchemaClientShape,
  ...captchaSchemaShape,
}

export const fundAccountSchemaClient = yup
  .object()
  .shape(fundAccountSchemaClientShape)

export const fundAccountSchemaServer = yup
  .object()
  .shape(fundAccountSchemaServerShape)
