import "FungibleToken"
import "FlowToken"

import "EVM"

/// This contract defines a resource implementing FungibleToken Receiver and Provider interfaces that enables deposits
/// to an encapsulated COA and transfers to EVM addresses. Recipients in Flow EVM will receive the transfer from the
/// FlowPassthrough.sol contract address, but an event is emitted in both the Cadence & EVM environments denoting the
/// source and target addresses involved in the passthrough transfer.
///
access(all) contract FlowEVMPassthrough {

    /// The address of the passthrough Solidity contract
    access(all) let passthroughEVMAddress: EVM.EVMAddress
    
    /// Default storage path for the Passthrough resource
    access(all) let StoragePath: StoragePath
    /// Default public path for the Passthrough resource
    access(all) let PublicPath: PublicPath

    /// Event emitted when a transfer occurs, denoting the transferor, recipient and amount transfered via passthrough
    access(all) event Transfered(from: EVM.EVMAddress, to: EVM.EVMAddress, amount: UFix64)

    /* --- Public Methods --- */
    ///
    access(all) fun createPassthrough(with coa: Capability<&EVM.BridgedAccount>): @Passthrough {
        return <-create Passthrough(coa)
    }

    /* --- Passthrough --- */
    //
    /// Encapsulates a COA and provides a FungibleToken Receiver and Provider interface through which to deposit & 
    /// withdraw to/from the COA. Also enables transfers to EVM addresses using a call to a passthrough Solidity
    /// contract.
    ///
    access(all) resource Passthrough : FungibleToken.Receiver, FungibleToken.Provider {
        /// Capability to owner's COA 
        access(self) let coaCapability: Capability<&EVM.BridgedAccount>

        init(_ coaCapability: Capability<&EVM.BridgedAccount>) {
            pre {
                coaCapability.check(): "Invalid COA Capability provided"
            }
            self.coaCapability = coaCapability
        }

        /// getSupportedVaultTypes optionally returns a list of vault types that this receiver accepts
        access(all) view fun getSupportedVaultTypes(): {Type: Bool} {
            return { Type<@FlowToken.Vault>(): true }
        }

        /// Returns whether or not the given type is accepted by the Receiver
        /// A vault that can accept any type should just return true by default
        access(all) view fun isSupportedVaultType(type: Type): Bool {
            return self.getSupportedVaultTypes()[type] ?? false
        }
        
        /// Deposits Flow to encapsulated COA according to Receiver interface
        access(all) fun deposit(from: @{FungibleToken.Vault}) {
            pre {
                self.isSupportedVaultType(type: from.getType()): "Passthrough only supports FlowToken.Vaults"
            }
            let flowVault <- from as! @FlowToken.Vault
            self.borrowCOA().deposit(from: <-flowVault)
        }

        access(FungibleToken.Withdrawable) fun withdraw(amount: UFix64): @{FungibleToken.Vault} {
            return <-self.borrowCOA().withdraw(
                balance: EVM.Balance(flow: amount)
            )
        }

        /// Deposits Flow to defined EVM Address using a call to passthrough Solidity contract
        access(all) fun evmTransfer(from: @{FungibleToken.Vault}, to: EVM.EVMAddress, gasLimit: UInt64) {
            pre {
                self.isSupportedVaultType(type: from.getType()): "Passthrough only supports FlowToken.Vaults"
            }
            let amount = from.getBalance()
            // TODO: Replace with UInt256(EVM.Balance(flow: from.balance).toAttoFlow())
            let amountInAttoFlow = FlowEVMPassthrough.ufix64ToUInt256(value: from.getBalance(), decimals: 8)
            // TODO: Replace with EVM.encodeABIWithSignature("transferFlow(address)", [to])
            let calldata = FlowEVMPassthrough.encodeABIWithSignature(
                    "transferFlow(address)", 
                    [to]
                )
            let coa = self.borrowCOA()
            let flowVault <- from as! @FlowToken.Vault
            coa.deposit(from: <-flowVault)
            coa.call(
                to: FlowEVMPassthrough.passthroughEVMAddress,
                data: calldata,
                gasLimit: gasLimit,
                value: EVM.Balance(flow: amount)
            )

            emit Transfered(from: self.borrowCOA().address(), to: to, amount: amount)
        }

        access(self) fun borrowCOA(): &EVM.BridgedAccount {
            return self.coaCapability.borrow() ?? panic("COA Capability has been revoked and is no longer valid")
        }
    }

    /* --- Internal Helpers --- */
    // TODO: Remove helpers once EVM.Balance.toAttoFlow() is implemented

    /// Raises the base to the power of the exponent
    access(self) view fun pow(base: UInt256, exponent: UInt8): UInt256 {
        if exponent == 0 {
            return 1
        }
        var r = base
        var exp: UInt8 = 1
        while exp < exponent {
            r = r * base
            exp = exp + 1
        }
        return r
    }

    /// Converts a UFix64 to a UInt256
    access(self) view fun ufix64ToUInt256(value: UFix64, decimals: UInt8): UInt256 {
        let integerPart: UInt64 = UInt64(value)
        var r = UInt256(integerPart)
        var multiplier: UInt256 = self.pow(base:10, exponent: decimals)
        return r * multiplier
    }

    access(self) fun encodeABIWithSignature(
        _ signature: String,
        _ values: [AnyStruct]
    ): [UInt8] {
        let methodID = HashAlgorithm.KECCAK_256.hash(
            signature.utf8
        ).slice(from: 0, upTo: 4)
        let arguments = EVM.encodeABI(values)

        return methodID.concat(arguments)
    }

    init(passthroughBytecode: String) {
        let coa = self.account.storage.borrow<&EVM.BridgedAccount>(from: /storage/evm)
            ?? panic("COA not found")
        let passthroughEVMAddress = coa.deploy(
            code: passthroughBytecode.decodeHex(),
            gasLimit: 12000000,
            value: EVM.Balance(flow: 0.0)
        )
        self.passthroughEVMAddress = passthroughEVMAddress
        self.StoragePath = /storage/flowEVMPassthrough
        self.PublicPath = /public/flowEVMPassthroughPublic
    }
}
