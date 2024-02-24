import * as fcl from "@onflow/fcl"

export async function sendTransaction({
  transaction,
  args,
  proposer,
  authorizations,
  payer,
}: {
  transaction: string
  args: fcl.TransactionArg[]
  proposer: fcl.Authorization
  authorizations: fcl.Authorization[]
  payer: fcl.Authorization
}) {
  const response = await fcl.send([
    fcl.transaction(transaction),
    fcl.args(args),
    fcl.proposer(proposer),
    fcl.authorizations(authorizations),
    fcl.payer(payer),
    fcl.limit(9999),
  ])

  console.error("RESPONSE: ", response)

  return fcl.tx(response).onceSealed()
}
