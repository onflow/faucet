export const createAccount = async (
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

export const fundAccount = async (address, token, captchaToken) => {
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
