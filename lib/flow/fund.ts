import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {FLOW_TYPE} from "../constants"
import publicConfig, {TOKEN_FUNDING_AMOUNTS} from "../publicConfig"
import {sendTransaction} from "./send"

const txFundAccountFLOW = `
import FlowToken from ${publicConfig.contractFlowToken}
import FungibleToken from ${publicConfig.contractFungibleToken}

transaction(address: Address, amount: UFix64) {
	let tokenAdmin: &FlowToken.Administrator
	let tokenReceiver: &{FungibleToken.Receiver}

	prepare(signer: auth(BorrowValue) &Account) {
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

const txFundAccountFlowEVM = `
import FungibleToken from ${publicConfig.contractFungibleToken}
import FlowToken from ${publicConfig.contractFlowToken}

import EVM from ${publicConfig.contractEVM}

/// Mints Flow and transfers it to the given EVM address via the signer's CadenceOwnedAccount.
///
transaction(to: EVM.EVMAddress, amount: UFix64, gasLimit: UInt64) {

    let tokenAdmin: &FlowToken.Administrator
    let coa: &EVM.BridgedAccount

    prepare(signer: auth(Storage) &Account) {
        self.tokenAdmin = signer.storage.borrow<&FlowToken.Administrator>(from: /storage/flowTokenAdmin)
            ?? panic("Signer is not the token admin")

        if signer.storage.borrow<&EVM.BridgedAccount>(from: /storage/evm) == nil {
            signer.storage.save(<-EVM.createBridgedAccount(), to: /storage/evm)
        }
        self.coa = signer.storage.borrow<&EVM.BridgedAccount>(from: /storage/evm)
            ?? panic("Could not borrow reference to the signer's COA!")
    }

    execute {
        let minter <- self.tokenAdmin.createNewMinter(allowedAmount: amount)
        let mintedVault <- minter.mintTokens(amount: amount)
        destroy minter

        self.coa.deposit(from: <-mintedVault)
        self.coa.call(
            to: to,
            data: [],
            gasLimit: gasLimit,
            value: EVM.Balance(flow: amount),
        )
    }
}
`

type TokenType = "FLOW" | "FLOWEVM"
type Token = {
  tx: string
  amount: string
}
type Tokens = Record<TokenType, Token>

export const tokens: Tokens = {
  FLOW: {tx: txFundAccountFLOW, amount: TOKEN_FUNDING_AMOUNTS[FLOW_TYPE]},
  FLOWEVM: {tx: txFundAccountFlowEVM, amount: TOKEN_FUNDING_AMOUNTS[FLOW_TYPE]},
}

function getAddressType(address: string): "FLOW" | "FLOWEVM" {
  if (address.length > 16) {
    return "FLOWEVM"
  } else {
    return "FLOW"
  }
}

export async function fundAccount(
  address: string,
  token: TokenType,
  authorization: fcl.Authorization
) {
  const addressType = getAddressType(address)

  const {tx, amount} = tokens[addressType]

  if (addressType === "FLOWEVM") {

    let addressBytes = Array.from(Buffer.from(address, "hex")).map(b => b.toString())

    await sendTransaction({
      transaction: tx,
      args: [
          fcl.arg(
              {
                fields: [{name: "bytes", value: addressBytes}],
              },
              t.Struct(`A.${publicConfig.contractEVM}.EVM.EVMAddress`, [{value: t.Array(t.UInt8)}])
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
