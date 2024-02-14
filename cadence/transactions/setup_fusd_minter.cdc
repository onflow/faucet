// This transaction creates a new minter proxy resource and
// stores it in the signer's account.
//
// After running this transaction, the FUSD administrator
// must run deposit_fusd_minter.cdc to deposit a minter resource
// inside the minter proxy.

import FUSD from 0xFUSDADDRESS

transaction {
    prepare(minter: auth(IssueStorageCapabilityController, SaveValue) &Account) {

        let minterProxy <- FUSD.createMinterProxy()

        minter.storage.save(
            <- minterProxy,
            to: FUSD.MinterProxyStoragePath,
        )

        let minterProxyCap = minter.capabilities.storage.issue<&FUSD.MinterProxy>(FUSD.MinterProxyStoragePath)
        minter.capabilities.publish(minterProxyCap, at: FUSD.MinterProxyPublicPath)
    }
}