import "FlowToken"
import "FungibleToken"

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