import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import publicConfig from "../publicConfig"
import {sendTransaction} from "./send"
import TxCreateAccount from "../../cadence/transactions/create_account.cdc"

const accountCreatedEventType = "flow.AccountCreated"

export async function createAccount(
  publicKey: string,
  sigAlgo: number,
  hashAlgo: number,
  authorization: typeof fcl.authorization
) {
  const result = await sendTransaction({
    transaction: TxCreateAccount,
    args: [
      fcl.arg(publicKey, t.String),
      fcl.arg(publicConfig.tokenAmountFlow, t.UFix64),
      fcl.arg(sigAlgo.toString(), t.UInt8),
      fcl.arg(hashAlgo.toString(), t.UInt8),
    ],
    authorizations: [authorization],
    payer: authorization,
    proposer: authorization,
  })

  const accountCreatedEvent = result.events.find(
    event => event.type === accountCreatedEventType
  )

  if (!accountCreatedEvent) {
    throw "Transaction did not emit account creation event"
  }

  const address = accountCreatedEvent.data.address
  const transactionId = accountCreatedEvent.transactionId

  return {
    address,
    transactionId,
  }
}
