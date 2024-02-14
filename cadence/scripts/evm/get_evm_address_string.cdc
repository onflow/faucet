import "EVM"

/// Returns the hex encoded address of the COA in the given Flow address
///
access(all) fun main(flowAddress: Address): String? {
    let account = getAuthAccount<auth(BorrowValue) &Account>(flowAddress)
    if let address = account.storage.borrow<&EVM.BridgedAccount>(from: /storage/evm)?.address() {
        let bytes: [UInt8] = []
        for byte in address.bytes {
            bytes.append(byte)
        }
        return String.encodeHex(bytes)
    }
    return nil
}
