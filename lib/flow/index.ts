import * as fcl from "@onflow/fcl"
import config from "../config"
import {signWithKey} from "../crypto"

fcl.config().put("accessNode.api", config.accessAPIHost)

export const getAuthorization = (keyIndex: number): fcl.Authorization => {
  return async (account = {}) => {
    return {
      ...account,
      tempId: "SIGNER",
      addr: fcl.sansPrefix(config.signerAddress) || "",
      keyId: keyIndex,
      signingFunction: (data: {message: string}) => ({
        addr: fcl.withPrefix(config.signerAddress) || "",
        keyId: keyIndex,
        signature: signWithKey(
          config.signerPrivateKey,
          config.signerSigAlgo,
          config.signerHashAlgo,
          data.message
        ),
      }),
    }
  }
}

export {createAccount} from "./account"
export {fundAccount} from "./fund"