/** @jsxImportSource theme-ui */

import TabNav, {TabNavLink} from "components/TabNav"
import {CANARY_NET, TEST_NET} from "lib/constants"
import publicConfig from "lib/publicConfig"

export default function NetworkLinks() {
  const styles = {
    container: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      backgroundColor: "white",
      borderRadius: 4,
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
          activeColor="secondary"
        >
          Test Net
        </TabNavLink>
        <TabNavLink
          href={publicConfig.canaryNetUrl}
          active={publicConfig.network === CANARY_NET}
          activeColor="secondary"
        >
          Canary Net
        </TabNavLink>
      </TabNav>
    </div>
  )
}
