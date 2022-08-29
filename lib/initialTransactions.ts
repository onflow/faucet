import fcl from "@onflow/fcl"
import dotenv from "dotenv"
dotenv.config()
import fs from "fs"
import path from "path"
import {getAuthorization} from "./flow/index"
import {getSignerKeyIndex} from "./keys"

const txDepositFUSDMinter = fs.readFileSync(
  path.resolve(__dirname, "../cadence/transactions/deposit_fusd_minter.cdc"),
  "utf8"
)
const txSetupFUSDMinter = fs.readFileSync(
  path.resolve(__dirname, "../cadence/transactions/setup_fusd_minter.cdc"),
  "utf8"
)

const signerAddress = process.env.NEXT_PUBLIC_SIGNER_ADDRESS
if (!signerAddress) throw "Missing NEXT_PUBLIC_SIGNER_ADDRESS"

fcl.config().put("0xFUSDADDRESS", signerAddress)

const runTransactions = async () => {
  const keyIndex = await getSignerKeyIndex()
  const authz = getAuthorization(keyIndex)
  try {
    await fcl.mutate({
      cadence: txSetupFUSDMinter,
      limit: 50,
      proposer: authz,
      payer: authz,
      authorizations: [authz],
    })
  } catch (e: unknown) {
    // eslint-disable-next-line no-console
    console.log("txSetupFUSDMinter error")
    // eslint-disable-next-line no-console
    console.log(e)
  }

  try {
    await fcl.mutate({
      cadence: txDepositFUSDMinter,
      limit: 50,
      proposer: authz,
      payer: authz,
      authorizations: [authz],
      args: (arg, t) => [arg(signerAddress, t.Address)],
    })
  } catch (e: unknown) {
    // eslint-disable-next-line no-console
    console.log("txDepositFUSDMinter error")
    // eslint-disable-next-line no-console
    console.log(e)
  }

  process.exit()
}

runTransactions()
