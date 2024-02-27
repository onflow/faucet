export type Networks = "testnet" | "previewnet"
export type TokenTypes = typeof FLOW_TYPE | typeof FUSD_TYPE

export const TEST_NET = "testnet"
export const PREVIEW_NET = "previewnet"
export const FLOW_TYPE = "FLOW"
export const FUSD_TYPE = "FUSD"
export const NETWORK_STATUS_URL = "https://status.onflow.org/"
export const GENERATE_KEYS_DOCS_URL =
  "https://developers.flow.com/tooling/flow-cli/generate-keys"
export const ACCOUNTS_KEYS_DOCS_URL =
  "https://developers.flow.com/concepts/start-here/accounts-and-keys"
export const H_CAPTCHA_URL = "https://www.hcaptcha.com/"
export const FAUCET_GITHUB_URL = "https://www.github.com/onflow/faucet/issues"
export const DISCORD_URL = "https://discord.gg/flow"

export const PUBLIC_KEY_FORMAT_ERROR =
  "Public key must be a hexadecimal string with no spaces."
export const PUBLIC_KEY_MISSING_ERROR = "Public key is required."
export const ADDRESS_FORMAT_ERROR =
  "Address must be a 16-character Cadence address or 42-character Ethereum address."
export const ADDRESS_MISSING_ERROR = "Address is required."
export const CREATE_ACCOUNT_ERROR = "Account creation has failed"
export const FUND_ACCOUNT_ERROR = "Account funding has failed"
export const MISSING_FUSD_VAULT_ERROR =
  "This account does not have an FUSD vault"
export const INVALID_NETWORK_ADDRESS_ERROR = (network: Networks) =>
  `This address is invalid for ${network}, please verify that it is correct`

export const paths = {
  root: "/",
  fundAccount: "/fund-account",
}

export const ADDRESS_REGEXP = /^(0x)?([0-9a-fA-F]{16}|[0-9a-fA-F]{40})$/

export const NETWORK_CODEWORDS = {
  testnet: "0x6834ba37b3980209",
  previewnet: "0x5211829E88528817",
}
