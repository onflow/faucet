import TabNav, {TabNavLink} from "components/TabNav"
import {TEST_NET} from "lib/constants"
import {NETWORK_DISPLAY_NAME} from "lib/network"
import publicConfig from "lib/publicConfig"
import {Box, Image} from "theme-ui"

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
    <Box sx={styles.container}>
      <TabNav>
        <TabNavLink
          href={publicConfig.testNetUrl}
          active={publicConfig.network === TEST_NET}
        >
          <Image
            src={
              publicConfig.network === TEST_NET
                ? "testnet-faucet-icon.svg"
                : "gray-faucet-icon.svg"
            }
            alt={`${NETWORK_DISPLAY_NAME} Faucet`}
            sx={{mr: 2}}
            width={30}
            height={30}
          />
          Testnet
        </TabNavLink>
      </TabNav>
    </Box>
  )
}
