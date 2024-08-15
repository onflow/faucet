import {createHash} from "crypto"
import {ec as EC} from "elliptic"
import {SHA3} from "sha3"

export type SigAlgoTypes = "ECDSA_P256" | "ECDSA_secp256k1"
export type HashAlgoTypes = "SHA2_256" | "SHA3_256"

export const SigAlgos: Record<SigAlgoTypes, number> = {
  ECDSA_P256: 1,
  ECDSA_secp256k1: 2,
}

export const HashAlgos: Record<HashAlgoTypes, number> = {
  SHA2_256: 1,
  SHA3_256: 3,
}

const hashSHA2 = (msg: string) => {
  const sha = createHash("sha256")
  sha.update(Buffer.from(msg, "hex"))
  return sha.digest()
}

const hashSHA3 = (msg: string) => {
  const sha = new SHA3(256)
  sha.update(Buffer.from(msg, "hex"))
  return sha.digest()
}

const signers = {
  ECDSA_P256: () => new EC("p256"),
  ECDSA_secp256k1: () => new EC("secp256k1"),
}

const hashers = {
  SHA2_256: hashSHA2,
  SHA3_256: hashSHA3,
}

const getSigner = (sigAlgo: SigAlgoTypes) => signers[sigAlgo]()
const getHasher = (hashAlgo: HashAlgoTypes) => hashers[hashAlgo]

export function signWithKey(
  privateKey: string,
  sigAlgo: SigAlgoTypes,
  hashAlgo: HashAlgoTypes,
  msg: string
) {
  const signer = getSigner(sigAlgo)
  const hasher = getHasher(hashAlgo)

  const key = signer.keyFromPrivate(Buffer.from(privateKey, "hex"))

  const sig = key.sign(hasher(msg))

  const n = 32
  const r = sig.r.toArrayLike(Buffer, "be", n)
  const s = sig.s.toArrayLike(Buffer, "be", n)

  return Buffer.concat([r, s]).toString("hex")
}
