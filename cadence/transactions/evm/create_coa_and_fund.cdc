import "FungibleToken"
import "FlowToken"

import "EVM"

/// Creates a COA and saves it in the signer's Flow account (if one doesn't already exist at the expected path) and
/// transfers the given value of Flow into FlowEVM, funding with the signer's Flow Vault.
///
transaction(amount: UFix64) {
    let sentVault: @FlowToken.Vault
    let coa: &EVM.CadenceOwnedAccount

    prepare(signer: auth(Storage) &Account) {
        let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &FlowToken.Vault>(
                from: /storage/flowTokenVault
            ) ?? panic("Could not borrow reference to the owner's Vault!")

        self.sentVault <- vaultRef.withdraw(amount: amount) as! @FlowToken.Vault
        if signer.storage.borrow<&EVM.CadenceOwnedAccount>(from: /storage/evm) == nil {
            signer.storage.save(<-EVM.createCadenceOwnedAccount(), to: /storage/evm)
        }
        self.coa = signer.storage.borrow<&EVM.CadenceOwnedAccount>(from: /storage/evm)
            ?? panic("Could not borrow reference to the signer's COA!")
    }

    execute {
        self.coa.deposit(from: <-self.sentVault)
    }
}
