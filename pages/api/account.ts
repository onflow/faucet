import {verify} from "hcaptcha"
import {NextApiRequest, NextApiResponse} from "next"
import config from "../../lib/config"
import {
  HashAlgos,
  HashAlgoTypes,
  SigAlgos,
  SigAlgoTypes,
} from "../../lib/crypto"
import {createAccount, getAuthorization} from "../../lib/flow"
import {getSignerKeyIndex} from "../../lib/keys"
import {createAccountSchemaServer} from "../../lib/validate"
import {verifyAPIKey} from "../../lib/common"
import { ValidationError } from "yup"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const apiKey = req.headers["authorization"]

    try {
      await createAccountSchemaServer.validate(req.body, {context: {apiKey}})
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).json({errors: err.errors})
        return
      }
      throw err;
    }

    const signatureAlgorithm: SigAlgoTypes = req.body.signatureAlgorithm
    const hashAlgorithm: HashAlgoTypes = req.body.hashAlgorithm

    if (!Object.keys(SigAlgos).includes(signatureAlgorithm)) {
      throw "Incorrect singature algorithm"
    }

    if (!Object.keys(HashAlgos).includes(hashAlgorithm)) {
      throw "Incorrect hash algorithm"
    }

    const captchaToken = req.body["h-captcha-response"]
    const publicKey = req.body.publicKey
    const sigAlgo = SigAlgos[signatureAlgorithm]
    const hashAlgo = HashAlgos[hashAlgorithm]

    if (apiKey) {
      if (!verifyAPIKey(apiKey, config.apiKeys)) {
        res.status(401).json({errors: ["Invalid API key"]})
        return
      }
    } else {
      try {
        await verify(config.hcaptchaSecretKey, captchaToken)
      } catch (e) {
        res.status(400).json({errors: ["Invalid captcha token"]})
        return
      }
    }

    // get key index from DB (LRU proposal key)
    const keyIndex = await getSignerKeyIndex()

    const authorization = getAuthorization(keyIndex)


    const {address} = await createAccount(
      publicKey,
      sigAlgo,
      hashAlgo,
      authorization
    )
    res.status(200).json({address})

  } else {
    res.status(405).send("")
  }
}
