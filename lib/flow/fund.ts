import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import publicConfig from "lib/publicConfig"
import config from "../config"
import {sendTransaction} from "./send"

const txFundAccountFLOW = `
import FlowToken from ${config.contractFlowToken}
import FungibleToken from ${config.contractFungibleToken}

transaction(address: Address, amount: UFix64) {
  let tokenAdmin: &FlowToken.Administrator
  let tokenReceiver: &{FungibleToken.Receiver}

  prepare(signer: AuthAccount) {
		self.tokenAdmin = signer
		  .borrow<&FlowToken.Administrator>(from: /storage/flowTokenAdmin)
		  ?? panic("Signer is not the token admin")

		self.tokenReceiver = getAccount(address)
		  .getCapability(/public/flowTokenReceiver)!
		  .borrow<&{FungibleToken.Receiver}>()
		  ?? panic("Unable to borrow receiver reference")
	}

	execute {
		let minter <- self.tokenAdmin.createNewMinter(allowedAmount: amount)
		let mintedVault <- minter.mintTokens(amount: amount)

		self.tokenReceiver.deposit(from: <-mintedVault)

		destroy minter
	}
}
`

type TokenType = "FLOW"
type Token = {
  tx: string
  amount: string
}
type Tokens = Record<TokenType, Token>

const tokens: Tokens = {
  FLOW: {tx: txFundAccountFLOW, amount: publicConfig.tokenAmountFlow},
}

export async function fundAccount(
  address: string,
  token: TokenType,
  authorization: fcl.Authorization
) {
  const {tx, amount} = tokens[token]

  await sendTransaction({
    transaction: tx,
    args: [fcl.arg(address, t.Address), fcl.arg(amount, t.UFix64)],
    authorizations: [authorization],
    payer: authorization,
    proposer: authorization,
  })

  return amount
}
