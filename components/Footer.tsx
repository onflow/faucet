/** @jsxImportSource theme-ui */

import {Container, Flex, ThemeUICSSObject} from "theme-ui"

export default function Footer() {
  const styles: Record<string, ThemeUICSSObject> = {
    footer: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "black",
      whiteSpace: "pre",
      color: "white",
      fontSize: 0,
      py: 2,
      pt: [20, 2],
      mt: [4, 5, 6],
    },
    innerContainer: {
      alignItems: "center",
      flexDirection: ["column", "row"],
    },
    right: {
      alignItems: "center",
      flexDirection: ["column", "row"],
    },
  }

  return (
    <div sx={styles.footer}>
      <Container>
        <Flex sx={styles.innerContainer}>
          <Flex mr={[0, "auto"]} mb={[2, 0]}>
            {`Copyright © ${new Date().getFullYear()} Flow Foundation.`}
          </Flex>
        </Flex>
      </Container>
    </div>
  )
}
