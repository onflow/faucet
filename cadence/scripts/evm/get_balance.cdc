import "EVM"

/// Returns the Flow balance of of a given EVM address in FlowEVM
///
access(all) fun main(address: String): UFix64 {
    let bytes = address.decodeHex().toConstantSized<[UInt8; 20]>()!
    return EVM.EVMAddress(bytes: bytes).balance().inFLOW()
}
