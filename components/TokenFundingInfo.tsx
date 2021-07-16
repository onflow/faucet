/** @jsxImportSource theme-ui */

import {NETWORK_DISPLAY_NAME} from "lib/network"
import publicConfig from "lib/publicConfig"
import {Text, Themed, ThemeUICSSObject} from "theme-ui"

export default function TokenFundingInfo({description}: {description: string}) {
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
        Receive {parseFloat(publicConfig.tokenAmountFlow).toLocaleString()}{" "}
        {NETWORK_DISPLAY_NAME} FLOW tokens
      </Themed.h4>
      <Text color="gray.400">{description}</Text>
    </div>
  )
}
