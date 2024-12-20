/** @jsxImportSource theme-ui */
import Button from "components/Button"
import {paths, TEST_NET} from "lib/constants"
import publicConfig from "lib/publicConfig"
import Image from "next/image"
import {Link, Text, ThemeUICSSObject} from "theme-ui"

export default function Header({fund}: {fund?: boolean}) {
  const styles: Record<string, ThemeUICSSObject> = {
    header: {
      height: [100, 120, 188],
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      width: [145, 175, 250, 350],
      transition: "width 0.2s",
      display: "flex",
      alignItems: "center",
    },
    buttonDescription: {
      color: publicConfig.network === TEST_NET ? "white" : "black",
      mr: 4,
      display: ["none", "none", "inline-flex"],
    },
  }

  return (
    // eslint-disable-next-line react/no-unknown-property
    <header sx={styles.header} data-test="header">
      <Link href={paths.root} sx={styles.logo}>
        <Image
          style={{width: "100%"}}
          src={`/flow-faucet-logo-${publicConfig.network}.svg`}
          alt="Flow"
          width={350}
          height={85}
        />
      </Link>

      <div>
        <Text sx={styles.buttonDescription}>
          {fund ? "Already have an account?" : "Don't have an account?"}
        </Text>
        <Button
          href={fund ? paths.fundAccount : paths.createAccount}
          data-test={`header-${fund ? "fund" : "create"}-link`}
          variant="secondary"
        >
          {fund ? "Fund" : "Create"} Account
        </Button>
      </div>
    </header>
  )
}
