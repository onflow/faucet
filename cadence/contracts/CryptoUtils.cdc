/// Util methods to reconstruct HashAlgorithm and SignatureAlgorithm from their raw enum values
///
access(all) contract CryptoUtils {

    access(all) fun getHashAlgo(fromRawValue: UInt8): HashAlgorithm? {
        switch fromRawValue {
            case HashAlgorithm.SHA2_256.rawValue:
            return HashAlgorithm.SHA2_256
            case HashAlgorithm.SHA2_384.rawValue:
            return HashAlgorithm.SHA2_384
            case HashAlgorithm.SHA3_256.rawValue:
            return HashAlgorithm.SHA3_256
            case HashAlgorithm.SHA3_384.rawValue:
            return HashAlgorithm.SHA3_384
            case HashAlgorithm.KMAC128_BLS_BLS12_381.rawValue:
            return HashAlgorithm.KMAC128_BLS_BLS12_381
            case HashAlgorithm.KECCAK_256.rawValue:
            return HashAlgorithm.KECCAK_256
            default:
            return nil
        }
    }

    access(all) fun getSigAlgo(fromRawValue: UInt8): SignatureAlgorithm? {
        switch fromRawValue {
            case SignatureAlgorithm.ECDSA_P256.rawValue:
            return SignatureAlgorithm.ECDSA_P256
            case SignatureAlgorithm.ECDSA_secp256k1.rawValue:
            return SignatureAlgorithm.ECDSA_secp256k1
            default:
            return nil
        }
    }
}