import "FungibleToken"
import "FlowToken"

import "EVM"

/// Creates a COA and saves it in the signer's Flow account & passing the given value of Flow into FlowEVM
///
transaction(amount: UFix64) {
    let sentVault: @FlowToken.Vault
    let coa: &EVM.BridgedAccount

    prepare(signer: auth(Storage) &Account) {
        let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdrawable) &FlowToken.Vault>(
                from: /storage/flowTokenVault
            ) ?? panic("Could not borrow reference to the owner's Vault!")

        self.sentVault <- vaultRef.withdraw(amount: amount) as! @FlowToken.Vault
        if signer.storage.borrow<&EVM.BridgedAccount>(from: /storage/EVM) != nil {
            signer.storage.save(<-EVM.createBridgedAccount(), to: /storage/evm)
        }
        self.coa = signer.storage.borrow<&EVM.BridgedAccount>(from: /storage/EVM)
            ?? panic("Could not borrow reference to the signer's COA!")

    }

    execute {
        self.coa.deposit(from: <-self.sentVault)
    }
}
