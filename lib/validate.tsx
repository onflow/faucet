import {TOKEN_OPTIONS} from "components/FundAccountFields"
import {
  ACCOUNTS_KEYS_DOCS_URL,
  ADDRESS_FORMAT_ERROR,
  ADDRESS_MISSING_ERROR,
  GENERATE_KEYS_DOCS_URL,
  PUBLIC_KEY_FORMAT_ERROR,
  PUBLIC_KEY_MISSING_ERROR,
} from "lib/constants"
import {Link} from "theme-ui"
import * as yup from "yup"

const authSchemaShape = {
  "api-key": yup.string().when("h-captcha-response", {
    is: (val: string) => !val || val.length === 0,
    then: yup.string().required(),
    otherwise: yup.string(),
  }),
  "h-captcha-response": yup.string().when("api-key", {
    is: (val: string) => !val || val.length === 0,
    then: yup.string().required(),
    otherwise: yup.string(),
  }),
}

const createAccountSchemaClientShape = {
  publicKey: yup
    .string()
    .matches(/^([0-9a-f]{128})$/i, () => (
      <>
        {PUBLIC_KEY_FORMAT_ERROR}{" "}
        <Link href={GENERATE_KEYS_DOCS_URL} target="_blank" variant="underline">
          Read Documentation
        </Link>
      </>
    ))
    .required(PUBLIC_KEY_MISSING_ERROR),
  signatureAlgorithm: yup
    .string()
    .oneOf(["ECDSA_P256", "ECDSA_secp256k1"])
    .required(),
  hashAlgorithm: yup.string().oneOf(["SHA2_256", "SHA3_256"]).required(),
}

const createAccountSchemaServerShape = {
  ...createAccountSchemaClientShape,
  ...authSchemaShape,
}

export const createAccountSchemaClient = yup
  .object()
  .shape(createAccountSchemaClientShape)

export const createAccountSchemaServer = yup
  .object()
  .shape(createAccountSchemaServerShape, [["h-captcha-response", "api-key"]])

const fundAccountSchemaClientShape = {
  address: yup
    .string()
    .matches(/^(0x)?([0-9a-f]{16})$/i, () => (
      <>
        {ADDRESS_FORMAT_ERROR}{" "}
        <Link href={ACCOUNTS_KEYS_DOCS_URL} target="_blank" variant="underline">
          Read Documentation
        </Link>
      </>
    ))
    .required(ADDRESS_MISSING_ERROR),
  token: yup
    .string()
    .oneOf(TOKEN_OPTIONS.map(o => o.value))
    .required(),
}

const fundAccountSchemaServerShape = {
  ...fundAccountSchemaClientShape,
  ...authSchemaShape,
}

export const fundAccountSchemaClient = yup
  .object()
  .shape(fundAccountSchemaClientShape)

export const fundAccountSchemaServer = yup
  .object()
  .shape(fundAccountSchemaServerShape, [["h-captcha-response", "api-key"]])

export function verifyAPIKey(req: string, keys: string[]): boolean {
  const len = req.length
  for (const key of keys) {
    if (key.length != len) {
      continue
    }
    // Do constant time comparison of the API key for protection
    // against timing attacks.
    let err = 0
    for (let i = 0; i < len; ++i) {
      err |= req.charCodeAt(i) ^ key.charCodeAt(i)
    }
    if (err == 0) {
      return true
    }
  }
  return false
}
