import * as fcl from "@onflow/fcl"

export async function sendTransaction({
  transaction,
  args,
  proposer,
  authorizations,
  payer,
}) {
  const response = await fcl.send([
    fcl.transaction(transaction),
    fcl.args(args),
    fcl.proposer(proposer),
    fcl.authorizations(authorizations),
    fcl.payer(payer),
    fcl.limit(9999),
  ])

  return fcl.tx(response).onceSealed()
}
