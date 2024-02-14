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
        let bytes = toAsHex.decodeHex()
        let to = EVM.EVMAddress(
            bytes: [
                bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9],
                bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19]
            ])
        self.passthrough.evmTransfer(from: <-self.sentVault, to: to, gasLimit: gasLimit)
    }
}
