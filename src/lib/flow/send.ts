import * as fcl from "@onflow/fcl"
import * as sdk from "@onflow/sdk"

export async function sendTransaction({
  transaction,
  args,
  proposer,
  authorizations,
  payer,
}: {
  transaction: string
  args: sdk.CadenceArgument<any>[]
  proposer: typeof fcl.authorization
  authorizations: (typeof fcl.authorization)[]
  payer: typeof fcl.authorization
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

export async function sendScript({
  script,
  args,
}: {
  script: string
  args: sdk.CadenceArgument<any>[]
}) {
  return fcl.send([fcl.script(script), fcl.args(args)]).then(fcl.decode)
}
