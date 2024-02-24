import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {verify} from "hcaptcha"
import {
  FUSD_TYPE,
  INVALID_NETWORK_ADDRESS_ERROR,
  MISSING_FUSD_VAULT_ERROR,
} from "lib/constants"
import publicConfig from "lib/publicConfig"
import {NextApiRequest, NextApiResponse} from "next"
import config from "../../lib/config"
import {fundAccount, getAuthorization} from "../../lib/flow"
import {getSignerKeyIndex} from "../../lib/keys"
import {fundAccountSchemaServer} from "../../lib/validate"
import {verifyAPIKey} from "../../lib/common"
import {ValidationError} from "yup"
import {isValidNetworkAddress} from "lib/network"

const scriptCheckFUSDVault = `
  import FUSD from ${publicConfig.contractFUSD}
  import FungibleToken from ${publicConfig.contractFungibleToken}

  pub fun main(address: Address): Bool {
    let receiver = getAccount(address)
      .getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)
      .check()
    let balance = getAccount(address)
      .getCapability<&FUSD.Vault{FungibleToken.Balance}>(/public/fusdBalance)
      .check()
    return receiver && balance
  }
`

export default async function fund(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const apiKey = req.headers["authorization"]

    try {
      await fundAccountSchemaServer.validate(req.body, {context: {apiKey}})
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).json({errors: err.errors})
        return
      }
      throw err
    }

    const captchaToken = req.body["h-captcha-response"]
    const address = fcl.withPrefix(req.body.address) || ""
    const token = req.body.token

    // Validate Flow Address
    if (
      address.length <= 18 &&
      !isValidNetworkAddress(address, publicConfig.network)
    ) {
      res
        .status(400)
        .json({errors: [INVALID_NETWORK_ADDRESS_ERROR(publicConfig.network)]})
      return
    }

    if (token === FUSD_TYPE) {
      try {
        const hasFUSDVault = await fcl
          .send([
            fcl.script(scriptCheckFUSDVault),
            fcl.args([fcl.arg(address, t.Address)]),
          ])
          .then(fcl.decode)

        if (hasFUSDVault === false) {
          res.status(400).json({errors: [MISSING_FUSD_VAULT_ERROR]})
          return
        }
      } catch {
        res.status(400).json({errors: ["FUSD vault check failed"]})
        return
      }
    }

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
