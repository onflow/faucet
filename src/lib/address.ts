export const with0x = (address: string) =>
  !address?.startsWith("0x") ? "0x" + address : address

export const isEvmAddress = (address: string) => {
  if (!address) return false
  // add 0x if not supplied
  const formattedAddress = with0x(address)
  return /^0x[a-fA-F0-9]{40}$/.test(formattedAddress)
}

export const getAccountExplorerUrl = (address: string) =>
  isEvmAddress(address)
    ? `https://evm-testnet.flowscan.io/address/${address}`
    : `https://testnet.flowdiver.io/account/${address}`
