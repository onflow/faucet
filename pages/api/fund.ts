import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {verify} from "hcaptcha"
import {NextApiRequest, NextApiResponse} from "next"
import config from "../../lib/config"
import {fundAccount, getAuthorization} from "../../lib/flow"
import {getSignerKeyIndex} from "../../lib/keys"
import {fundAccountSchemaServer} from "../../lib/validate"

const scriptCheckFUSDVault = `
  import FUSD from 0xFUSDADDRESS
  import FungibleToken from 0xFUNGIBLETOKENADDRESS

  pub fun main(address: Address): Bool {
    let account = getAccount(address)
    let vaultRef = account.getCapability(/public/fusdBalance)
        .borrow<&FUSD.Vault{FungibleToken.Balance}>()
    return vaultRef != nil
  }
`

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await fundAccountSchemaServer.validate(req.body)
    } catch (err) {
      res.status(400).json({errors: err.errors})
      return
    }

    const captchaToken = req.body["h-captcha-response"]
    const address = fcl.withPrefix(req.body.address) || ""
    const token = req.body.token

    if (token === "FUSD") {
      let hasFUSDVault = false
      try {
        hasFUSDVault = await fcl
          .send([
            fcl.script(scriptCheckFUSDVault),
            fcl.args([fcl.arg(address, t.Address)]),
          ])
          .then(fcl.decode)

        if (hasFUSDVault === false) {
          res
            .status(400)
            .json({errors: ["This account does not have an FUSD vault"]})
          return
        }
      } catch {
        res.status(400).json({errors: ["FUSD vault check failed"]})
        return
      }
    }

    try {
      await verify(config.hcaptchaSecretKey, captchaToken)
    } catch (e) {
      res.status(400).send("")
      return
    }

    // get key index from DB (LRU proposal key)
    const keyIndex = await getSignerKeyIndex()

    const authorization = getAuthorization(keyIndex)

    if (address === null) {
      res.status(400).json({errors: ["Missing address"]})
      return
    }

    const amount = await fundAccount(address, token, authorization)

    res.status(200).json({token, amount})
  } else {
    res.status(405).send("")
  }
}
