import "FlowToken"
import "FungibleToken"

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