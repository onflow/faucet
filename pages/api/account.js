const {verify} = require("hcaptcha")
import {
  ECDSA_P256,
  ECDSA_secp256k1,
  SHA2_256,
  SHA3_256,
} from "@onflow/util-encode-key"

import config from "../../lib/config"
import {getAuthorization, createAccount} from "../../lib/flow"
import {getSignerKeyIndex} from "../../lib/keys"
import {createAccountSchemaServer} from "../../lib/validate"

const sigAlgos = {
  ECDSA_P256: ECDSA_P256,
  ECDSA_secp256k1: ECDSA_secp256k1,
}

const hashAlgos = {
  SHA2_256: SHA2_256,
  SHA3_256: SHA3_256,
}

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      await createAccountSchemaServer.validate(req.body)
    } catch (err) {
      res.status(400).json({errors: err.errors})
      return
    }

    const captchaToken = req.body["h-captcha-response"]
    const publicKey = req.body.publicKey
    const sigAlgo = sigAlgos[req.body.signatureAlgorithm]
    const hashAlgo = hashAlgos[req.body.hashAlgorithm]

    try {
      await verify(config.hcaptchaSecretKey, captchaToken)
    } catch (e) {
      res.status(400).send()
      return
    }

    // get key index from DB (LRU proposal key)
    const keyIndex = await getSignerKeyIndex()

    const authorization = getAuthorization(keyIndex)

    const address = await createAccount(
      publicKey,
      sigAlgo,
      hashAlgo,
      authorization
    )

    res.status(200).json({address})
  } else {
    res.status(405).send()
  }
}
