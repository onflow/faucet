import "FungibleToken"
import "FlowToken"

import "EVM"

/// Creates a Flow account with a COA and saves it in the created account. The provided amount is then minted,
/// deposited into the Flow account at the specified ratio and the remaining amount is deposited into the newly
/// created COA.
///
transaction(
    publicKey: String,
    flowTokenAmount: UFix64,
    sigAlgorithm: UInt8,
    hashAlgorithm: UInt8,
    fundingRatio: UFix64
) {
    let tokenAdmin: &FlowToken.Administrator
    let newAccount: auth(Keys, Storage) &Account
    let tokenReceiver: &{FungibleToken.Receiver}

    prepare(signer: auth(Storage) &Account) {
        self.newAccount = Account(payer: signer)

        let signatureAlgorithm = SignatureAlgorithm(sigAlgorithm)
            ?? panic("Invalid SignatureAlgorithm")
        log(signatureAlgorithm)
        let hashAlgorithm = HashAlgorithm(hashAlgorithm)
            ?? panic("Invalid HashAlgorithm")
        log(hashAlgorithm)

        let key = PublicKey(
                publicKey: publicKey.decodeHex(),
                signatureAlgorithm: signatureAlgorithm
            )
        self.newAccount.keys.add(
            publicKey: key,
            hashAlgorithm: hashAlgorithm,
            weight: 1000.0
        )

        self.tokenAdmin = signer.storage.borrow<&FlowToken.Administrator>(from: /storage/flowTokenAdmin)
            ?? panic("Signer is not the token admin")

        self.tokenReceiver = self.newAccount.capabilities.borrow<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            ?? panic("Unable to borrow receiver reference")
    }

    pre {
        fundingRatio <= 1.0: "Funding mix must be less than or equal to 1.0"
    }

    execute {
        let minter <- self.tokenAdmin.createNewMinter(allowedAmount: flowTokenAmount)
        let flowVault <- minter.mintTokens(amount: flowTokenAmount * fundingRatio)
        let evmVault <- minter.mintTokens(amount: flowTokenAmount * (1.0 - fundingRatio))
        destroy minter

        self.tokenReceiver.deposit(from: <-flowVault)

        let coa <- EVM.createBridgedAccount()
        coa.address().deposit(from: <-evmVault)

        self.newAccount.storage.save(<-coa, to: StoragePath(identifier: "evm")!)
    }
}
