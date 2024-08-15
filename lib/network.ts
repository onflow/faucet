import capitalize from "./capitalize"
import {ADDRESS_REGEXP, NETWORK_CODEWORDS} from "./constants"
import publicConfig from "./publicConfig"
import * as fcl from "@onflow/fcl"

export const NETWORK_DISPLAY_NAME = capitalize(publicConfig.network)

// Network address validation taken from flow-go
// https://github.com/onflow/flow-go/blob/043570794069a876072d50de4dc03bbd34f063c7/model/flow/address.go

const linearCodeN = 64
const parityCheckMatrixColumns = [
  0x00001, 0x00002, 0x00004, 0x00008, 0x00010, 0x00020, 0x00040, 0x00080,
  0x00100, 0x00200, 0x00400, 0x00800, 0x01000, 0x02000, 0x04000, 0x08000,
  0x10000, 0x20000, 0x40000, 0x7328d, 0x6689a, 0x6112f, 0x6084b, 0x433fd,
  0x42aab, 0x41951, 0x233ce, 0x22a81, 0x21948, 0x1ef60, 0x1deca, 0x1c639,
  0x1bdd8, 0x1a535, 0x194ac, 0x18c46, 0x1632b, 0x1529b, 0x14a43, 0x13184,
  0x12942, 0x118c1, 0x0f812, 0x0e027, 0x0d00e, 0x0c83c, 0x0b01d, 0x0a831,
  0x0982b, 0x07034, 0x0682a, 0x05819, 0x03807, 0x007d2, 0x00727, 0x0068e,
  0x0067c, 0x0059d, 0x004eb, 0x003b4, 0x0036a, 0x002d9, 0x001c7, 0x0003f,
]

export function isValidNetworkAddress(
  address: string,
  network: keyof typeof NETWORK_CODEWORDS
) {
  address = fcl.withPrefix(address) || ""
  if (ADDRESS_REGEXP.test(address) === false) return false

  let codeword = BigInt(address) ^ BigInt(NETWORK_CODEWORDS[network])
  let parity = 0

  if (codeword === BigInt(0)) return false

  for (let i = 0; i < linearCodeN; i++) {
    if (codeword % BigInt(2) === BigInt(1)) {
      parity ^= parityCheckMatrixColumns[i]
    }
    codeword >>= BigInt(1)
  }
  return parity === 0
}
