import * as fcl from "@onflow/fcl"
import {verify} from "hcaptcha"
import {NextApiRequest, NextApiResponse} from "next"
import config from "../../lib/config"
import {fundAccount, getAuthorization} from "../../lib/flow"
import {getSignerKeyIndex} from "../../lib/keys"
import {fundAccountSchemaServer} from "../../lib/validate"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await fundAccountSchemaServer.validate(req.body)
    } catch (err) {
      res.status(400).json({errors: err.errors})
      return
    }

    const captchaToken = req.body["h-captcha-response"]
    const address = fcl.withPrefix(req.body.address)
    const token = req.body.token

    try {
      await verify(config.hcaptchaSecretKey, captchaToken)
    } catch (e) {
      res.status(400).send("")
      return
    }

    // get key index from DB (LRU proposal key)
    const keyIndex = await getSignerKeyIndex()

    const authorization = getAuthorization(keyIndex)

    const amount = await fundAccount(address, token, authorization)

    res.status(200).json({token, amount})
  } else {
    res.status(405).send("")
  }
}
