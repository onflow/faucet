import "FungibleToken"
import "FlowToken"

import "EVM"

/// Mints Flow and transfers it to the given EVM address via the signer's CadenceOwnedAccount.
///
transaction(to: EVM.EVMAddress, amount: UFix64, gasLimit: UInt64) {

    let tokenAdmin: &FlowToken.Administrator
    let coa: auth(EVM.Call) &EVM.CadenceOwnedAccount

    prepare(signer: auth(Storage) &Account) {
        self.tokenAdmin = signer.storage.borrow<&FlowToken.Administrator>(from: /storage/flowTokenAdmin)
            ?? panic("Signer is not the token admin")

        if signer.storage.borrow<&EVM.CadenceOwnedAccount>(from: /storage/evm) == nil {
            signer.storage.save(<-EVM.createCadenceOwnedAccount(), to: /storage/evm)
        }
        self.coa = signer.storage.borrow<auth(EVM.Call) &EVM.CadenceOwnedAccount>(from: /storage/evm)
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
