import * as fcl from "@onflow/fcl"
import {verify} from "hcaptcha"
import {INVALID_NETWORK_ADDRESS_ERROR} from "../../../lib/constants"
import publicConfig from "../../../lib/publicConfig"
import { NextResponse } from "next/server"
import config from "../../../lib/config"
import {fundAccount, getAuthorization} from "../../../lib/flow"
import {getSignerKeyIndex} from "../../../lib/keys"
import {fundAccountSchemaServer} from "../../../lib/validate"
import {verifyAPIKey} from "../../../lib/common"
import {ValidationError} from "yup"
import {isValidNetworkAddress} from "../../../lib/network"

export async function POST(req: Request) {
  const apiKey = req.headers.get("authorization")
  const body = await req.json()

  try {
    await fundAccountSchemaServer.validate(body, {context: {apiKey}})
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({errors: err.errors}, {status: 400});
    }
    throw err
  }

  const captchaToken = body["h-captcha-response"]
  const address = fcl.withPrefix(body.address) || ""
  const token = body.token

  // Validate Flow Address
  if (
    address.length <= 18 &&
    !isValidNetworkAddress(address, publicConfig.network)
  ) {
    return NextResponse
      .json({errors: [INVALID_NETWORK_ADDRESS_ERROR(publicConfig.network)]}, {status: 400})
  }

  if (apiKey) {
    if (!verifyAPIKey(apiKey, config.apiKeys)) {
      return NextResponse.json({errors: ["Invalid API key"]}, {status: 401})
    }
  } else {
    try {
      await verify(config.hcaptchaSecretKey, captchaToken)
    } catch {
      return NextResponse.json({errors: ["Invalid captcha token"]}, {status: 400})
    }
  }

  // get key index from DB (LRU proposal key)
  const keyIndex = await getSignerKeyIndex()

  const authorization = getAuthorization(keyIndex)

  if (address === null) {
    return NextResponse.json({errors: ["Missing address"]}, {status: 400})
  }

  const amount = await fundAccount(address, token, authorization)

  return NextResponse.json({token, amount})
}

