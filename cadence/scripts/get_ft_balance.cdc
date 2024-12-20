import "FungibleToken"
import "FlowToken"

access(all) fun main(account: Address): UFix64 {

    let vaultRef = getAccount(account)
        .capabilities.borrow<&{FungibleToken.Balance}>(/public/flowTokenBalance)
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}