export type Networks = "testnet" | "canarynet"
export type TokenTypes = typeof FLOW_TYPE | typeof FUSD_TYPE

export const TEST_NET = "testnet"
export const CANARY_NET = "canarynet"
export const FLOW_TYPE = "FLOW"
export const FUSD_TYPE = "FUSD"
export const NETWORK_STATUS_URL = "https://docs.onflow.org/status/"
export const GENERATE_KEYS_DOCS_URL =
  "https://docs.onflow.org/flow-cli/generate-keys/"
export const ACCOUNTS_KEYS_DOCS_URL =
  "https://docs.onflow.org/concepts/accounts-and-keys/"
export const H_CAPTCHA_URL = "https://www.hcaptcha.com/"
export const FAUCET_GITHUB_URL = "https://www.github.com/onflow/faucet/issues"
export const DEVELOPER_DOCS_URL = "https://docs.onflow.org"
export const DISCORD_URL = "https://discord.gg/flow"

export const PUBLIC_KEY_FORMAT_ERROR =
  "Public key must be a hexadecimal string with no spaces."
export const PUBLIC_KEY_MISSING_ERROR = "Public key is required."
export const ADDRESS_FORMAT_ERROR =
  "Address must be a 16-character hexadecimal string."
export const ADDRESS_MISSING_ERROR = "Address is required."
export const CREATE_ACCOUNT_ERROR = "Account creation has failed"
export const FUND_ACCOUNT_ERROR = "Account funding has failed"
export const MISSING_FUSD_VAULT_ERROR =
  "This account does not have an FUSD vault"

export const paths = {
  root: "/",
  fundAccount: "/fund-account",
}
