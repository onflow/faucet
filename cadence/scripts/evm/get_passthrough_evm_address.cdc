import "EVM"

import "FlowEVMPassthrough"

/// Returns the EVM address of the FlowEVM passthrough contract.
access(all) fun main(): EVM.EVMAddress {
    return FlowEVMPassthrough.passthroughEVMAddress
}
