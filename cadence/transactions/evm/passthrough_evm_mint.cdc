import "FungibleToken"
import "FlowToken"

import "EVM"

import "FlowEVMPassthrough"

/// Mints Flow and transfers it to the given EVM address via the saved Passthrough resource.
///
transaction(to: EVM.EVMAddress, amount: UFix64, gasLimit: UInt64) {

    let tokenAdmin: &FlowToken.Administrator
    let auth: auth(Storage) &Account
    let tokenReceiver: &{FungibleToken.Receiver}
    let passthrough: &FlowEVMPassthrough.Passthrough

    prepare(signer: auth(BorrowValue) &Account) {
        self.tokenAdmin = signer.storage.borrow<&FlowToken.Administrator>(from: /storage/flowTokenAdmin)
            ?? panic("Signer is not the token admin")

        self.tokenReceiver = signer.capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            ?? panic("Unable to borrow receiver reference")
        self.passthrough = signer.storage.borrow<&FlowEVMPassthrough.Passthrough>(from: FlowEVMPassthrough.StoragePath)
            ?? panic("Could not borrow reference to the owner's Passthrough!")
    }

    execute {
        let minter <- self.tokenAdmin.createNewMinter(allowedAmount: amount)
        let mintedVault <- minter.mintTokens(amount: amount)
        destroy minter

        self.passthrough.evmTransfer(from: <-mintedVault, to: to, gasLimit: gasLimit)
    }
}
