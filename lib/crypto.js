import {createHash} from "crypto"
import {SHA3} from "sha3"
import {ec as EC} from "elliptic"

const hashSHA2 = msg => {
  const sha = createHash("sha256")
  sha.update(Buffer.from(msg, "hex"))
  return sha.digest()
}

const hashSHA3 = msg => {
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

const getSigner = sigAlgo => signers[sigAlgo]()
const getHasher = hashAlgo => hashers[hashAlgo]

export function signWithKey(privateKey, sigAlgo, hashAlgo, msg) {
  const signer = getSigner(sigAlgo)
  const hasher = getHasher(hashAlgo)

  const key = signer.keyFromPrivate(Buffer.from(privateKey, "hex"))

  const sig = key.sign(hasher(msg))

  const n = 32
  const r = sig.r.toArrayLike(Buffer, "be", n)
  const s = sig.s.toArrayLike(Buffer, "be", n)

  return Buffer.concat([r, s]).toString("hex")
}
