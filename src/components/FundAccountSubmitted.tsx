/** @jsxImportSource theme-ui */
import Label from "../components/Label"
import LoadingFeedback from "../components/LoadingFeedback"
import {Box, Flex, Link, ThemeUICSSObject} from "theme-ui"
import {Themed} from "@theme-ui/mdx"
import {ClientFundAccountResult} from "./FundAccountPanel"
import publicConfig from "../lib/publicConfig"
import {useEffect, useState} from "react"
import {sendScript} from "../lib/flow/send"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import {getAddressType} from "../lib/common"
import {getAccountExplorerUrl} from "../lib/address"
import GetEVMBalance from "../../cadence/scripts/get_evm_balance.cdc"
import GetFTBalance from "../../cadence/scripts/get_ft_balance.cdc"

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isFetchingBalance, setIsFetchingBalance] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_balance, setBalance] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_balanceError, setBalanceError] = useState("")

  useEffect(() => {
    if (typeof result === "undefined") return

    const fetchBalance = async (addr: string) => {
      try {
        setIsFetchingBalance(true)

        const addressType = getAddressType(addr)
        let addressArg

        const addressArgType =
          publicConfig.network === "testnet" || addressType === "FLOW"
            ? t.Address
            : t.String

        if (addressType === "FLOWEVM") {
          const withoutPrefix = fcl.sansPrefix(addr)
          if (!withoutPrefix) {
            throw new Error("Invalid address")
          }

          addressArg = withoutPrefix
        } else {
          addressArg = addr
        }

        const balanceScript =
          addressType === "FLOWEVM" ? GetEVMBalance : GetFTBalance

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
                <Box sx={styles.walletAmount}>
                  {`${parseFloat(result.amount).toLocaleString()} ${
                    result.token
                  } tokens`}
                </Box>
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
