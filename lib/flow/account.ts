import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import { encodeKey } from "@onflow/util-encode-key"
import publicConfig from "../publicConfig"
import { sendTransaction } from "./send"

const accountCreatedEventType = "flow.AccountCreated"

const txCreateAccount = `
import CryptoUtils from ${publicConfig.contractFlowToken}
import FlowToken from ${publicConfig.contractFlowToken}
import FungibleToken from ${publicConfig.contractFungibleToken}

transaction(publicKey: String, flowTokenAmount: UFix64, sigAlgorithm: UInt8, hashAlgorithm: UInt8) {
  let tokenAdmin: &FlowToken.Administrator
  let tokenReceiver: &{FungibleToken.Receiver}

  prepare(signer: auth(BorrowValue) &Account) {
    let account = Account(payer: signer)

    let signatureAlgorithm = CryptoUtils.getSigAlgo(fromRawValue: sigAlgorithm)
      ?? panic("Invalid SignatureAlgorithm")
    let hashAlgorithm = CryptoUtils.getHashAlgo(fromRawValue: sigAlgorithm)
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
  authorization: fcl.Authorization
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
    (event: fcl.Event) => event.type === accountCreatedEventType
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
