import {verify} from "hcaptcha"
import { NextResponse } from 'next/server'
import config from "../../../lib/config"
import {
  HashAlgos,
  HashAlgoTypes,
  SigAlgos,
  SigAlgoTypes,
} from "../../../lib/crypto"
import {createAccount, getAuthorization} from "../../../lib/flow"
import {getSignerKeyIndex} from "../../../lib/keys"
import {createAccountSchemaServer} from "../../../lib/validate"
import {verifyAPIKey} from "../../../lib/common"
import {ValidationError} from "yup"

export async function POST(req: Request) {
  const apiKey = req.headers.get("authorization")
  const body = await req.json()

  try {
    await createAccountSchemaServer.validate(body, {context: {apiKey}})
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.json({errors: err.errors}, {status: 400})
    }
    throw err
  }

  const signatureAlgorithm: SigAlgoTypes = body.signatureAlgorithm
  const hashAlgorithm: HashAlgoTypes = body.hashAlgorithm

  if (!Object.keys(SigAlgos).includes(signatureAlgorithm)) {
    throw "Incorrect singature algorithm"
  }

  if (!Object.keys(HashAlgos).includes(hashAlgorithm)) {
    throw "Incorrect hash algorithm"
  }

  const captchaToken = body["h-captcha-response"]
  const publicKey = body.publicKey
  const sigAlgo = SigAlgos[signatureAlgorithm]
  const hashAlgo = HashAlgos[hashAlgorithm]

  if (apiKey) {
    if (!verifyAPIKey(apiKey, config.apiKeys)) {
      return NextResponse.json({errors: ["Invalid API key"]}, {status: 401})
    }
  } else {
    try {
      await verify(config.hcaptchaSecretKey, captchaToken)
    } catch {
      NextResponse.json({errors: ["Invalid captcha token"]}, {status: 400})
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
  
  return NextResponse.json({address})
}
