/** @jsxImportSource theme-ui */

import {DISCORD_URL, DEVELOPER_DOCS_URL} from "lib/constants"
import {Box, Container, Flex, Link, ThemeUICSSObject} from "theme-ui"

export default function Footer() {
  const styles: Record<string, ThemeUICSSObject> = {
    footer: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "black",
      color: "white",
      fontSize: 0,
      height: 100,
      mt: [4, 5, 6],
    },
  }

  return (
    <div sx={styles.footer}>
      <Container>
        <Flex
          sx={{
            flexDirection: ["column", "column", "row"],
            justifyContent: ["center", "center", "space-between"],
          }}
        >
          <Box my={1}>
            {`Copyright © ${new Date().getFullYear()} Dapper Labs LLC. All Rights Reserved`}
          </Box>
          <Box my={1}>
            <Link variant="white" href={DEVELOPER_DOCS_URL} mr={3}>
              Flow Developer Documentation
            </Link>
            <Link variant="white" href={DISCORD_URL}>
              Flow Discord Community
            </Link>
          </Box>
        </Flex>
      </Container>
    </div>
  )
}
