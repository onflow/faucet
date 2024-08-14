import {Networks, TokenTypes} from "./constants"

const network = process.env.NEXT_PUBLIC_NETWORK as Networks | undefined
if (!network) throw "Missing NEXT_PUBLIC_NETWORK"

const testNetUrl = process.env.NEXT_PUBLIC_TEST_NET_URL
if (!testNetUrl) throw "Missing NEXT_PUBLIC_TEST_NET_URL"

const tokenAmountFlow = process.env.NEXT_PUBLIC_TOKEN_AMOUNT_FLOW
if (!tokenAmountFlow) throw "Missing NEXT_PUBLIC_TOKEN_AMOUNT_FLOW"

const signerAddress = process.env.NEXT_PUBLIC_SIGNER_ADDRESS
if (!signerAddress) throw "Missing NEXT_PUBLIC_SIGNER_ADDRESS"

const contractFungibleToken = process.env.NEXT_PUBLIC_CONTRACT_FUNGIBLE_TOKEN
if (!contractFungibleToken) throw "Missing NEXT_PUBLIC_CONTRACT_FUNGIBLE_TOKEN"

const contractFlowToken = process.env.NEXT_PUBLIC_CONTRACT_FLOW_TOKEN
if (!contractFlowToken) throw "Missing NEXT_PUBLIC_CONTRACT_FLOW_TOKEN"

const contractEVM = process.env.NEXT_PUBLIC_CONTRACT_EVM
if (!contractEVM) throw "Missing NEXT_PUBLIC_CONTRACT_EVM"

const walletDiscovery = process.env.NEXT_PUBLIC_WALLET_DISCOVERY
// TODO: Integrate FCL wallets
// if (!walletDiscovery) throw "Missing NEXT_PUBLIC_WALLET_DISCOVERY"

export type PublicConfig = {
  network: Networks
  testNetUrl: string
  tokenAmountFlow: string
  hcaptchaSiteKey: string
  signerAddress: string
  contractFungibleToken: string
  contractFlowToken: string
  contractEVM: string
  accessAPIHost: string
  isLocal: boolean
  walletDiscovery?: string
}

const publicConfig: PublicConfig = {
  network,
  testNetUrl,
  tokenAmountFlow,
  hcaptchaSiteKey:
    process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ||
    "10000000-ffff-ffff-ffff-000000000001",
  signerAddress,
  contractFungibleToken,
  contractFlowToken,
  contractEVM,
  accessAPIHost:
    process.env.NEXT_PUBLIC_ACCESS_API_HOST || "http://localhost:8888",
  isLocal: process.env.NEXT_PUBLIC_IS_LOCAL === "true" || false,
  walletDiscovery,
}

export const TOKEN_FUNDING_AMOUNTS: Record<TokenTypes, string> = {
  FLOW: publicConfig.tokenAmountFlow,
}

export default publicConfig
