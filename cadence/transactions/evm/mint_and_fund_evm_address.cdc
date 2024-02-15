import "FungibleToken"
import "FlowToken"

import "EVM"

/// Mints Flow and transfers it to the given EVM address via the signer's CadenceOwnedAccount.
///
transaction(to: EVM.EVMAddress, amount: UFix64, gasLimit: UInt64) {

    let tokenAdmin: &FlowToken.Administrator
    let tokenReceiver: &{FungibleToken.Receiver}
    let coa: &EVM.BridgedAccount

    prepare(signer: auth(BorrowValue) &Account) {
        self.tokenAdmin = signer.storage.borrow<&FlowToken.Administrator>(from: /storage/flowTokenAdmin)
            ?? panic("Signer is not the token admin")

        self.tokenReceiver = signer.capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            ?? panic("Unable to borrow receiver reference")
        self.coa = signer.storage.borrow<&EVM.BridgedAccount>(from: /storage/evm)
            ?? panic("Could not borrow reference to the signer's COA!")
    }

    execute {
        let minter <- self.tokenAdmin.createNewMinter(allowedAmount: amount)
        let mintedVault <- minter.mintTokens(amount: amount)
        destroy minter

        // TODO: REMOVE
        let bytes = toStr.decodeHex()
        let to = EVM.EVMAddress(bytes: [
            bytes[0], bytes[1], bytes[2], bytes[3], bytes[4], bytes[5], bytes[6], bytes[7], bytes[8], bytes[9],
            bytes[10], bytes[11], bytes[12], bytes[13], bytes[14], bytes[15], bytes[16], bytes[17], bytes[18], bytes[19]
        ])
        self.coa.deposit(from: <-mintedVault)
        self.coa.call(
            to: to,
            data: [],
            gasLimit: gasLimit,
            value: EVM.Balance(flow: amount),
        )
    }
}
