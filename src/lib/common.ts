export function verifyAPIKey(req: string, keys: string[]): boolean {
  const len = req.length
  for (const key of keys) {
    if (key.length != len) {
      continue
    }
    // Do constant time comparison of the API key for protection
    // against timing attacks.
    let err = 0
    for (let i = 0; i < len; i++) {
      err |= req.charCodeAt(i) ^ key.charCodeAt(i)
    }
    if (err === 0) {
      return true
    }
  }
  return false
}

export const getAddressType = function (address: string): "FLOW" | "FLOWEVM" {
  if (address.length <= 18) {
    return "FLOW"
  } else {
    return "FLOWEVM"
  }
}
