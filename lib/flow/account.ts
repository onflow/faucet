import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import publicConfig from "../publicConfig"
import {sendTransaction} from "./send"

const accountCreatedEventType = "flow.AccountCreated"

const txCreateAccount = `
import FlowToken from ${publicConfig.contractFlowToken}
import FungibleToken from ${publicConfig.contractFungibleToken}

transaction(publicKey: String, flowTokenAmount: UFix64, sigAlgorithm: UInt8, hashAlgorithm: UInt8) {
	let tokenAdmin: &FlowToken.Administrator
	let tokenReceiver: &{FungibleToken.Receiver}

	prepare(signer: auth(BorrowValue) &Account) {
		let account = Account(payer: signer)

		let signatureAlgorithm = SignatureAlgorithm(sigAlgorithm)
			?? panic("Invalid SignatureAlgorithm")
		let hashAlgorithm = HashAlgorithm(hashAlgorithm)
			?? panic("Invalid HashAlgorithm")

		let key = PublicKey(
			publicKey: publicKey.decodeHex(),
			signatureAlgorithm: signatureAlgorithm
		)
		account.keys.add(
			publicKey: key,
			hashAlgorithm: hashAlgorithm,
			weight: 1000.0
		)

		self.tokenAdmin = signer.storage.borrow<&FlowToken.Administrator>(from: /storage/flowTokenAdmin)
			?? panic("Signer is not the token admin")

		self.tokenReceiver = account.capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
			?? panic("Unable to borrow receiver reference")
	}

	execute {
		let minter <- self.tokenAdmin.createNewMinter(allowedAmount: flowTokenAmount)
		let mintedVault <- minter.mintTokens(amount: flowTokenAmount)

		self.tokenReceiver.deposit(from: <-mintedVault)

		destroy minter
	}
}
`

export async function createAccount(
  publicKey: string,
  sigAlgo: number,
  hashAlgo: number,
  authorization: typeof fcl.authorization
) {
  const result = await sendTransaction({
    transaction: txCreateAccount,
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
