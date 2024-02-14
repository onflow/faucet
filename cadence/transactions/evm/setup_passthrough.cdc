import "EVM"

import "FlowEVMPassthrough"

/// Configures a Passthrough resource in the signer's storage
///
transaction {

    prepare(signer: auth(BorrowValue, IssueStorageCapabilityController, PublishCapability, SaveValue) &Account) {
        if signer.storage.borrow<&FlowEVMPassthrough.Passthrough>(from: FlowEVMPassthrough.StoragePath) != nil {
            return
        }
        if signer.storage.borrow<&EVM.BridgedAccount>(from: /storage/evm) == nil {
            signer.storage.save(<-EVM.createBridgedAccount(), to: /storage/evm)
        }
        let coaCapability = signer.capabilities.storage.issue<&EVM.BridgedAccount>(/storage/evm)
        signer.storage.save(<-FlowEVMPassthrough.createPassthrough(with: coaCapability), to: FlowEVMPassthrough.StoragePath)
        let passthroughCapability = signer.capabilities.storage.issue<&FlowEVMPassthrough.Passthrough>(
                FlowEVMPassthrough.StoragePath
            )
        signer.capabilities.publish(passthroughCapability, at: FlowEVMPassthrough.PublicPath)
    }
}
