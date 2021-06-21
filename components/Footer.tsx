/** @jsxImportSource theme-ui */

import {paths} from "lib/constants"
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
      mt: 6,
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
            <Link variant="white" href={paths.privacy} mr={3}>
              Privacy Policy
            </Link>
            <Link variant="white" href={paths.terms}>
              Terms & Conditions
            </Link>
          </Box>
        </Flex>
      </Container>
    </div>
  )
}
