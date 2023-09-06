/** @jsxImportSource theme-ui */

import {TokenTypes} from "lib/constants"
import {NETWORK_DISPLAY_NAME} from "lib/network"
import {TOKEN_FUNDING_AMOUNTS} from "lib/publicConfig"
import {Text, ThemeUICSSObject} from "theme-ui"
import {Themed} from "@theme-ui/mdx"

export default function TokenFundingInfo({
  description,
  token,
}: {
  description: string
  token: TokenTypes
}) {
  const style: ThemeUICSSObject = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 4,
    borderTop: "1px solid",
    borderBottom: "1px solid",
    borderColor: "gray.200",
    py: 3,
  }

  return (
    <div sx={style}>
      <Themed.h4 sx={{my: 0}}>
        Receive {parseFloat(TOKEN_FUNDING_AMOUNTS[token]).toLocaleString()}{" "}
        {NETWORK_DISPLAY_NAME} {token} tokens
      </Themed.h4>
      <Text color="gray.400">{description}</Text>
    </div>
  )
}
