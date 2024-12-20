import {
  ACCOUNTS_KEYS_DOCS_URL,
  ADDRESS_FORMAT_ERROR,
  ADDRESS_MISSING_ERROR,
  ADDRESS_REGEXP,
  GENERATE_KEYS_DOCS_URL,
  PUBLIC_KEY_FORMAT_ERROR,
  PUBLIC_KEY_MISSING_ERROR,
} from "../lib/constants"
import * as yup from "yup"

import {FLOW_TYPE} from "../lib/constants"
import {NETWORK_DISPLAY_NAME} from "../lib/network"

export const TOKEN_OPTIONS = [
  {value: FLOW_TYPE, label: `${NETWORK_DISPLAY_NAME} FLOW`},
]


const createAccountSchemaClientShape = {
  publicKey: yup
    .string()
    .matches(/^([0-9a-f]{128})$/i, () => (
      <>
        {PUBLIC_KEY_FORMAT_ERROR}{" "}
        <a href={GENERATE_KEYS_DOCS_URL} target="_blank">
          Read Documentation
        </a>
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
    .matches(ADDRESS_REGEXP, () => (
      <>
        {ADDRESS_FORMAT_ERROR}{" "}
        <a href={ACCOUNTS_KEYS_DOCS_URL} target="_blank">
          Read Documentation
        </a>
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
}

export const fundAccountSchemaClient = yup
  .object()
  .shape(fundAccountSchemaClientShape)

export const fundAccountSchemaServer = yup
  .object()
  .shape(fundAccountSchemaServerShape)
