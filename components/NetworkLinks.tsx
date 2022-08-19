/** @jsxImportSource theme-ui */

import TabNav, {TabNavLink} from "components/TabNav"
import {TEST_NET, SANDBOX_NET} from "lib/constants"
import {NETWORK_DISPLAY_NAME} from "lib/network"
import publicConfig from "lib/publicConfig"

export default function NetworkLinks() {
  const styles = {
    container: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 4,
      paddingTop: 1,
      marginTop: 3,
    },
    children: {
      maxWidth: 450,
      px: [0, 4],
    },
  }

  return (
    <div sx={styles.container}>
      <TabNav>
        <TabNavLink
          href={publicConfig.testNetUrl}
          active={publicConfig.network === TEST_NET}
        >
          <img
            src={
              publicConfig.network === TEST_NET
                ? "testnet-faucet-icon.svg"
                : "gray-faucet-icon.svg"
            }
            alt={`${NETWORK_DISPLAY_NAME} Faucet`}
            sx={{mr: 2}}
          />
          Testnet
        </TabNavLink>
        <TabNavLink
          href={publicConfig.sandboxNetUrl}
          active={publicConfig.network === SANDBOX_NET}
        >
          <img
            src={
              publicConfig.network === SANDBOX_NET
                ? "sandboxnet-faucet-icon.svg"
                : "gray-faucet-icon.svg"
            }
            alt="Sandboxnet Faucet"
            sx={{mr: 2}}
          />
          Sandboxnet
        </TabNavLink>
      </TabNav>
    </div>
  )
}
