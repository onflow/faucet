/** @jsxImportSource theme-ui */
import Label from "components/Label"
import LoadingFeedback from "components/LoadingFeedback"
import {Box, Flex, Link, Themed, ThemeUICSSObject} from "theme-ui"
import {ClientFundAccountResult} from "./FundAccountPanel"
import publicConfig from "lib/publicConfig"
import {useEffect, useState} from "react"
import {sendScript} from "../lib/flow/send"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {getAddressType} from "../lib/common"
import {getAccountExplorerUrl} from "lib/address"

const styles: Record<string, ThemeUICSSObject> = {
  resultsContainer: {
    backgroundColor: "gray.100",
    borderRadius: 3,
    border: "1px solid",
    borderColor: "gray.200",
    padding: 4,
  },
  publicAddressInputField: {
    fontFamily: "monospace",
    backgroundColor: "white",
  },
  infoBox: {
    p: 4,
    backgroundColor: "pink",
  },
  walletAmount: {fontFamily: "monospace"},
}

export default function FundAccountSubmitted({
  result,
}: {
  result?: ClientFundAccountResult
}) {
  const [_isFetchingBalance, setIsFetchingBalance] = useState(false)
  const [_balance, setBalance] = useState("")
  const [_balanceError, setBalanceError] = useState("")

  useEffect(() => {
    if (typeof result === "undefined") return

    const fetchBalance = async (addr: string) => {
      try {
        setIsFetchingBalance(true)

        const addressType = getAddressType(result.address)
        let addressArg

        const addressArgType =
          publicConfig.network === "testnet" || addressType === "FLOW"
            ? t.Address
            : t.String

        if (addressType === "FLOWEVM") {
          const withoutPrefix = fcl.sansPrefix(result.address)
          if (!withoutPrefix) {
            throw new Error("Invalid address")
          }

          addressArg = withoutPrefix
        } else {
          addressArg = addr
        }

        const balanceScript =
          addressType === "FLOWEVM"
            ? `import EVM from ${publicConfig.contractEVM}

      /// Returns the Flow balance of a given EVM address in FlowEVM
      ///
      access(all) fun main(address: String): UFix64 {
        let bytes = address.decodeHex().toConstantSized<[UInt8; 20]>()!
        return EVM.EVMAddress(bytes: bytes).balance().inFLOW()
      }`
            : `import FungibleToken from ${publicConfig.contractFungibleToken}
import FlowToken from ${publicConfig.contractFlowToken}

access(all) fun main(account: Address): UFix64 {

    let vaultRef = getAccount(account)
        .capabilities.borrow<&{FungibleToken.Balance}>(/public/flowTokenBalance)
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
}`

        const res = await sendScript({
          script: balanceScript,
          args: [fcl.arg(addressArg, addressArgType)],
        })
        setBalance(res)
      } catch (error) {
        setBalance("--")
        setBalanceError("An error occurred")
      } finally {
        setIsFetchingBalance(false)
      }
    }

    fetchBalance(result.address)
  }, [result])

  const accountExplorerUrl = getAccountExplorerUrl(result?.address ?? "")

  return (
    <>
      <Box mb={4} mt={4}>
        <Themed.h3 sx={{mb: 0}}>Funding Account</Themed.h3>
        <Themed.p>Great! Your request has been submitted.</Themed.p>
      </Box>
      <Box mb={6} sx={styles.resultsContainer}>
        {typeof result === "undefined" ? (
          <LoadingFeedback>
            We are funding your account.
            <br />
            This may take a moment.
          </LoadingFeedback>
        ) : (
          <>
            <Box mb={4}>
              <Themed.h3 sx={{my: 0}}>Account Funded!</Themed.h3>
              <Themed.p>
                {`The requested amount has been transferred to your ${publicConfig.network} account!`}
              </Themed.p>
            </Box>
            <Box>
              <Label>Added Amount</Label>
              <Flex
                sx={{alignItems: "center", justifyContent: "space-between"}}
              >
                <div sx={styles.walletAmount}>
                  {`${parseFloat(result.amount).toLocaleString()} ${
                    result.token
                  } tokens`}
                </div>
                <Link
                  href={accountExplorerUrl}
                  target="_blank"
                  variant="secondary"
                  sx={{fontSize: 1}}
                >
                  View Account
                </Link>
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
