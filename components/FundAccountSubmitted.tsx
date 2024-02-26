/** @jsxImportSource theme-ui */
import Label from "components/Label"
import LoadingFeedback from "components/LoadingFeedback"
import {Box, Flex, Link, Themed, ThemeUICSSObject} from "theme-ui"
import {ClientFundAccountResult} from "./FundAccountPanel"
import publicConfig from "lib/publicConfig"

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
  return (
    <>
      <Box mb={4} mt={4}>
        <Themed.h3 sx={{mb: 0}}>Funding account</Themed.h3>
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
                {publicConfig.network !== "testnet" ? (
                  <Link
                    href={`https://${publicConfig.network}.flowdiver.io/account/${result.address}`}
                    target="_blank"
                    variant="secondary"
                    sx={{fontSize: 1}}
                  >
                    View Account
                  </Link>
                ) : (
                  <>
                    <label>Balance</label>
                    <div>1000.00</div>
                  </>
                )}
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
