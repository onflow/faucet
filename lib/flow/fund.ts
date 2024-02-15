import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {FLOW_TYPE, FUSD_TYPE} from "../constants"
import publicConfig, {TOKEN_FUNDING_AMOUNTS} from "../publicConfig"
import {sendTransaction} from "./send"

const txFundAccountFLOW = `
import FlowToken from ${publicConfig.contractFlowToken}
import FungibleToken from ${publicConfig.contractFungibleToken}

transaction(address: Address, amount: UFix64) {
	let tokenAdmin: &FlowToken.Administrator
	let tokenReceiver: &{FungibleToken.Receiver}

	prepare(signer: AuthAccount) {
		self.tokenAdmin = signer.storage.borrow<&FlowToken.Administrator>(from: /storage/flowTokenAdmin)
			?? panic("Signer is not the token admin")

		self.tokenReceiver = getAccount(address).capabilities.borrow<&{FungibleToken.Receiver}>(
				/public/flowTokenReceiver
			) ?? panic("Could not borrow receiver reference to the recipient's Vault")
	}

	execute {
		let minter <- self.tokenAdmin.createNewMinter(allowedAmount: amount)
		let mintedVault <- minter.mintTokens(amount: amount)

		self.tokenReceiver.deposit(from: <-mintedVault)

		destroy minter
	}
}
`

const txFundAccountFUSD = `
import FUSD from ${publicConfig.contractFUSD}
import FungibleToken from ${publicConfig.contractFungibleToken}

transaction(address: Address, amount: UFix64) {
	let tokenMinter: auth(FUSD.ProxyOwner) &FUSD.MinterProxy
	let tokenReceiver: &{FungibleToken.Receiver}

	prepare(minterAccount: AuthAccount) {
			self.tokenMinter = minterAccount.storage.borrow<auth(FUSD.ProxyOwner) &FUSD.MinterProxy>(
					from: FUSD.MinterProxyStoragePath
				) ?? panic("No minter available")

			self.tokenReceiver = getAccount(address).capabilities.borrow<&{FungibleToken.Receiver}>(
					/public/fusdReceiver
				) ?? panic("Unable to borrow receiver reference")
	}

	execute {
			let mintedVault <- self.tokenMinter.mintTokens(amount: amount)
			self.tokenReceiver.deposit(from: <-mintedVault)
	}
}
`

type TokenType = "FLOW" | "FUSD"
type Token = {
  tx: string
  amount: string
}
type Tokens = Record<TokenType, Token>

export const tokens: Tokens = {
  FLOW: {tx: txFundAccountFLOW, amount: TOKEN_FUNDING_AMOUNTS[FLOW_TYPE]},
  FUSD: {tx: txFundAccountFUSD, amount: TOKEN_FUNDING_AMOUNTS[FUSD_TYPE]},
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
