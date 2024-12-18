import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {FLOW_TYPE} from "../constants"
import publicConfig, {TOKEN_FUNDING_AMOUNTS} from "../publicConfig"
import {sendTransaction} from "./send"
import {getAddressType} from "../common"
import TxFundAccount from "../../cadence/transactions/fund_account.cdc"
import TxFundEVMAccount from "../../cadence/transactions/fund_evm_account.cdc"

type TokenType = "FLOW" | "FLOWEVM"
type Token = {
  tx: string
  amount: string
}
type Tokens = Record<TokenType, Token>

export const tokens: Tokens = {
  FLOW: {tx: TxFundAccount, amount: TOKEN_FUNDING_AMOUNTS[FLOW_TYPE]},
  FLOWEVM: {tx: TxFundEVMAccount, amount: TOKEN_FUNDING_AMOUNTS[FLOW_TYPE]},
}
export async function fundAccount(
  address: string,
  token: TokenType,
  authorization: typeof fcl.authorization
) {
  const addressType = getAddressType(address)

  const {tx, amount} = tokens[addressType]

  if (addressType === "FLOWEVM") {
    const withoutPrefix = fcl.sansPrefix(address)
    if (!withoutPrefix) {
      throw new Error("Invalid address")
    }
    const addressBytes = Array.from(Buffer.from(withoutPrefix, "hex")).map(b =>
      b.toString()
    )

    await sendTransaction({
      transaction: tx,
      args: [
        fcl.arg(
          {
            fields: [{name: "bytes", value: addressBytes}],
          },
          t.Struct(
            `A.${fcl.sansPrefix(publicConfig.contractEVM)}.EVM.EVMAddress`,
            [{value: t.Array(t.UInt8)}]
          )
        ),
        fcl.arg(amount, t.UFix64),
        fcl.arg("60000", t.UInt64),
      ],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    })
  } else {
    await sendTransaction({
      transaction: tx,
      args: [fcl.arg(address, t.Address), fcl.arg(amount, t.UFix64)],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    })
  }
  return amount
}
