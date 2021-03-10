export default {
  accessAPIHost: process.env.ACCESS_API_HOST || "http://localhost:8080",
  hcaptchaSiteKey:
    process.env.HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001",
  hcaptchaSecretKey:
    process.env.HCAPTCHA_SECRET_KEY ||
    "0x0000000000000000000000000000000000000000",
  signerAddress: process.env.SIGNER_ADDRESS,
  signerPrivateKey: process.env.SIGNER_PRIVATE_KEY,
  signerSigAlgo: process.env.SIGNER_SIG_ALGO || "ECDSA_P256",
  signerHashAlgo: process.env.SIGNER_HASH_ALGO || "SHA3_256",
  tokenAmountFlow: process.env.TOKEN_AMOUNT_FLOW,
  contractFungibleToken:
    process.env.CONTRACT_FUNGIBLE_TOKEN || "0xee82856bf20e2aa6",
  contractFlowToken: process.env.CONTRACT_FLOW_TOKEN || "0x0ae53cb6e3f42a79",
}
