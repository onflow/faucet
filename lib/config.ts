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

const signerPrivateKey = process.env.SIGNER_PRIVATE_KEY
if (!signerPrivateKey) throw "Missing SIGNER_PRIVATE_KEY"

const apiKeys = process.env.API_KEYS ? process.env.API_KEYS.split(",") : []

type Config = {
  apiKeys: string[]
  hcaptchaSecretKey: string
  signerPrivateKey: string
  signerSigAlgo: SigAlgoTypes
  signerHashAlgo: HashAlgoTypes
  network: string
}

const config: Config = {
  apiKeys: apiKeys,
  hcaptchaSecretKey:
    process.env.HCAPTCHA_SECRET_KEY ||
    "0x0000000000000000000000000000000000000000",
  signerPrivateKey,
  signerSigAlgo: getDefaultSignerSig(),
  signerHashAlgo: getDefaultSignerHash(),
  network: process.env.NEXT_PUBLIC_NETWORK || ""
}

export default config
