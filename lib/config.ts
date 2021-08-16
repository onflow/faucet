import {HashAlgos, HashAlgoTypes, SigAlgos, SigAlgoTypes} from "./crypto"

const getDefaultSignerSig = () => {
  const algo = process.env.SIGNER_SIG_ALGO || "ECDSA_P256"
  if (!Object.keys(SigAlgos).includes(algo)) {
    throw "Incorrect signer algorithm"
  }

  return algo as SigAlgoTypes
}

const getDefaultSignerHash: () => HashAlgoTypes = () => {
  const algo = process.env.SIGNER_HASH_ALGO || "SHA3_256"
  if (!Object.keys(HashAlgos).includes(algo)) {
    throw "Incorrect hash algorithm"
  }
  return algo as HashAlgoTypes
}

const signerAddress = process.env.SIGNER_ADDRESS
if (!signerAddress) throw "Missing SIGNER_ADDRESS"

const signerPrivateKey = process.env.SIGNER_PRIVATE_KEY
if (!signerPrivateKey) throw "Missing SIGNER_PRIVATE_KEY"

type Config = {
  accessAPIHost: string
  hcaptchaSecretKey: string
  signerAddress: string
  signerPrivateKey: string
  signerSigAlgo: SigAlgoTypes
  signerHashAlgo: HashAlgoTypes
  contractFungibleToken: string
  contractFlowToken: string
  contractFUSD: string
}

const config: Config = {
  accessAPIHost: process.env.ACCESS_API_HOST || "http://localhost:8080",
  hcaptchaSecretKey:
    process.env.HCAPTCHA_SECRET_KEY ||
    "0x0000000000000000000000000000000000000000",
  signerAddress,
  signerPrivateKey,
  signerSigAlgo: getDefaultSignerSig(),
  signerHashAlgo: getDefaultSignerHash(),
  contractFungibleToken:
    process.env.CONTRACT_FUNGIBLE_TOKEN || "0xee82856bf20e2aa6",
  contractFlowToken: process.env.CONTRACT_FLOW_TOKEN || "0x0ae53cb6e3f42a79",
  contractFUSD: signerAddress,
}

export default config
