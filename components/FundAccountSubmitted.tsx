/** @jsxImportSource theme-ui */
import LoadingFeedback from "components/LoadingFeedback"
import {Box, Flex, Link, Themed, ThemeUICSSObject} from "theme-ui"
import {ClientFundAccountResult} from "./FundAccountPanel"

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
        <Themed.p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          quis gravida nunc, luctus sodales erat. Ut sit amet lectus tempor elit
          scelerisque ornare ut non lectus. Etiam ultricies accumsan eros et
          vulputate.
        </Themed.p>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur quis gravida nunc, luctus sodales erat. Ut sit amet
                lectus tempor elit scelerisque ornare ut non lectus.
              </Themed.p>
              <Themed.p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur quis gravida nunc, luctus sod erat.
              </Themed.p>
            </Box>
            <Box mb={2}>
              <Themed.h4>My Tokens</Themed.h4>
              <Flex
                sx={{alignItems: "center", justifyContent: "space-between"}}
              >
                <div sx={styles.walletAmount}>
                  {`${parseFloat(result.amount).toLocaleString()} ${
                    result.token
                  } tokens`}
                </div>
                <Link
                  href={`https://flow-view-source.com/testnet/account/${result.address}`}
                  target="_blank"
                  variant="secondary"
                  sx={{fontSize: 1}}
                >
                  View Wallet
                </Link>
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}
