import * as fcl from "@onflow/fcl"
import config from "../config"
import {signWithKey} from "../crypto"
import publicConfig from "../publicConfig"
import type {Authorization} from "./send"

// The account FCL passes to an authorization function.
type AuthorizationAccount = Parameters<
  Extract<Authorization, (...args: any[]) => any>
>[0]

fcl.config().put("accessNode.api", publicConfig.accessAPIHost)

export const getAuthorization = (keyIndex: number) => {
  return (account: AuthorizationAccount) => {
    return {
      ...account,
      sequenceNum: null,
      tempId: `${account.addr}-${keyIndex}`,
      addr: fcl.sansPrefix(publicConfig.signerAddress) || "",
      keyId: keyIndex,
      signingFunction: (data: {message: string}) => ({
        addr: fcl.withPrefix(publicConfig.signerAddress) || "",
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
