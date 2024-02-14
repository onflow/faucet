import "FungibleToken"
import "FlowToken"

import "EVM"

import "FlowEVMPassthrough"

/// Withdraws tokens from the signer's FlowToken Vault and transfers them to the given EVM address via the saved
/// Passthrough resource.
///
transaction(to: EVM.EVMAddress, amount: UFix64, gasLimit: UInt64) {

    let sentVault: @{FungibleToken.Vault}
    let passthrough: &FlowEVMPassthrough.Passthrough

    prepare(signer: auth(BorrowValue) &Account) {
        let sourceVault = signer.storage.borrow<auth(FungibleToken.Withdrawable) &FlowToken.Vault>(from: /storage/flowTokenVault)
			?? panic("Could not borrow reference to the owner's Vault!")
        self.sentVault <- sourceVault.withdraw(amount: amount)
        self.passthrough = signer.storage.borrow<&FlowEVMPassthrough.Passthrough>(from: FlowEVMPassthrough.StoragePath)
            ?? panic("Could not borrow reference to the owner's Passthrough!")
    }

    execute {
        self.passthrough.evmTransfer(from: <-self.sentVault, to: to, gasLimit: gasLimit)
    }
}
