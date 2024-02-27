/** @jsxImportSource theme-ui */
import * as fcl from "@onflow/fcl"
import copy from "clipboard-copy"
import Button from "components/Button"
import Label from "components/Label"
import LoadingFeedback from "components/LoadingFeedback"
import {Field} from "formik"
import {NETWORK_DISPLAY_NAME} from "lib/network"
import publicConfig from "lib/publicConfig"
import {useRef, useState} from "react"
import {Box, Flex, Themed, ThemeUICSSObject} from "theme-ui"
import {CustomInputComponent} from "./inputs"

const styles: Record<string, ThemeUICSSObject> = {
  addressContainer: {
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

export default function CreateAccountSubmitted({address}: {address: string}) {
  const [copied, setCopied] = useState(false)
  const timeout = useRef<number | undefined>(undefined)

  const copyToClipboard = () => {
    copy(address)
    clearTimeout(timeout.current)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <>
      <Box mb={4} mt={4}>
        <Themed.h3 sx={{mb: 0}}>Generating Account Address</Themed.h3>
        <Themed.p>
          We are generating your {NETWORK_DISPLAY_NAME} Address this will only
          take a moment. Please make sure you save your generated address for
          future use.
        </Themed.p>
      </Box>
      <Box mb={4} sx={styles.addressContainer}>
        {address.length > 0 ? (
          <>
            <Box mb={4}>
              <Themed.h3 sx={{my: 0}}>Account Address Generated!</Themed.h3>
              <Themed.p>
                Congratulations! Your new {NETWORK_DISPLAY_NAME} account has
                been created.
              </Themed.p>
            </Box>
            <Box mb={4}>
              <Field
                component={CustomInputComponent}
                sx={styles.publicAddressInputField}
                inputLabel="Address"
                name="address"
                readOnly
                value={address.length > 0 ? fcl.display(address) || "" : ""}
              />
            </Box>
            <Box>
              <Label>Added Amount</Label>
              <Flex
                sx={{alignItems: "center", justifyContent: "space-between"}}
              >
                <div sx={styles.walletAmount}>
                  {`${parseFloat(
                    publicConfig.tokenAmountFlow
                  ).toLocaleString()} FLOW tokens`}
                </div>
                {/*<Link*/}
                {/*  href={`https://flow-view-source.com/testnet/account/${address}`}*/}
                {/*  target="_blank"*/}
                {/*  variant="secondary"*/}
                {/*  sx={{fontSize: 1}}*/}
                {/*>*/}
                {/*  View Account*/}
                {/*</Link>*/}
              </Flex>
            </Box>
          </>
        ) : (
          <LoadingFeedback>
            Your account address is being generated.
            <br />
            This may take a moment.
          </LoadingFeedback>
        )}
      </Box>
      <Box mb={3}>
        <Button
          type="button"
          size="lg"
          block
          disabled={address.length === 0}
          onClick={copyToClipboard}
          data-test="copy-address-button"
        >
          {copied ? "Copied" : "Copy Address"}
        </Button>
      </Box>
      <Themed.hr />
      <Box mb={5}>
        <div sx={styles.infoBox}>
          <Themed.h3 sx={{my: 0}}>What can I build on Flow?</Themed.h3>
          <Themed.p>
            Flow is designed for high-throughput, low-latency consumer
            applications, games, and digital assets. Protocol-level usability
            and onboarding features make it easy to bring new users while a new
            decentralized architecture ensures security at scale.
          </Themed.p>
          <Button
            variant="ghost"
            size="sm"
            block
            href="https://www.onflow.org"
            target="_blank"
          >
            Join the Flow alpha community
          </Button>
        </div>
      </Box>
    </>
  )
}
