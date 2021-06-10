import * as fcl from "@onflow/fcl"

export async function sendTransaction({
  transaction,
  args,
  proposer,
  authorizations,
  payer,
}: {
  transaction: string
  args: unknown[]
  proposer: unknown
  authorizations: unknown[]
  payer: unknown
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
