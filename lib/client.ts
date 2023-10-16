import {
  CREATE_ACCOUNT_ERROR,
  FUND_ACCOUNT_ERROR,
  INVALID_NETWORK_ADDRESS_ERROR,
  Networks,
} from "lib/constants"
import {isValidNetworkAddress} from "./network"

export type CreateAccountURLParams = {
  publicKey: string
  trafficSource: string
  sigAlgo: string
}

export type ClientCreateAccountResult = {
  address: string
  token: string
  amount: string
}

export type ClientCreateAccount = (
  publicKey: string,
  sigAlgo: string,
  hashAlgo: string,
  captchaToken: string
) => Promise<{
  errors?: string[]
  address?: string
}>

export const clientCreateAccount: ClientCreateAccount = async (
  publicKey,
  sigAlgo,
  hashAlgo,
  captchaToken
) => {
  try {
    const response = await fetch("/api/account", {
      body: JSON.stringify({
        publicKey: publicKey,
        signatureAlgorithm: sigAlgo,
        hashAlgorithm: hashAlgo,
        "h-captcha-response": captchaToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(response => response.json())
    return response
  } catch {
    return {errors: [CREATE_ACCOUNT_ERROR]}
  }
}

export type ClientFundAccount = (
  address: string,
  network: Networks,
  token: string,
  captchaToken: string
) => Promise<{
  errors?: string[]
  amount?: string
}>

export const fundAccount: ClientFundAccount = async (
  address,
  network,
  token,
  captchaToken
) => {
  // Validate address
  if (!isValidNetworkAddress(address, network)) {
    return {errors: [INVALID_NETWORK_ADDRESS_ERROR(network)]}
  }

  try {
    const response = await fetch("/api/fund", {
      body: JSON.stringify({
        address: address,
        token: token,
        "h-captcha-response": captchaToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(response => response.json())
    return response
  } catch {
    return {errors: [FUND_ACCOUNT_ERROR]}
  }
}
