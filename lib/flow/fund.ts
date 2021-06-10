import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
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

type Tokens = "FLOW"

const tokens = {
  FLOW: {tx: txFundAccountFLOW, amount: config.tokenAmountFlow},
}

export async function fundAccount(
  address: string,
  token: Tokens,
  authorization: unknown
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
