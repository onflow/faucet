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
) => Promise<string>

export const createAccount: ClientCreateAccount = async (
  publicKey,
  sigAlgo,
  hashAlgo,
  captchaToken
) => {
  const data = await fetch("/api/account", {
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
  return data.address
}

export type ClientFundAccount = (
  address: string,
  token: string,
  captchaToken: string
) => Promise<string>

export const fundAccount: ClientFundAccount = async (
  address,
  token,
  captchaToken
) => {
  const data = await fetch("/api/fund", {
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

  return data.amount
}
