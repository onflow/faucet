import {TANOOKI_LABS_URL} from "lib/constants"
import {Box, Container, Flex, Link, ThemeUICSSObject} from "theme-ui"

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
    tanookiLabsLink: {
      borderBottom: "1px solid",
      borderColor: "gray.200",
    },
  }

  return (
    <Box sx={styles.footer}>
      <Container>
        <Flex sx={styles.innerContainer}>
          <Flex mr={[0, "auto"]} mb={[2, 0]}>
            {`Copyright © ${new Date().getFullYear()} Dapper Labs LLC.`}
          </Flex>
          <Flex sx={styles.right}>
            <Box>
              Design & Development by{" "}
              <Link
                variant="white"
                href={TANOOKI_LABS_URL}
                target="_blank"
                sx={styles.tanookiLabsLink}
              >
                Tanooki Labs
              </Link>
            </Box>
            <Box ml={2}>
              <Link href={TANOOKI_LABS_URL} target="blank">
                <img
                  srcSet="tanooki-labs.png, tanooki-labs@2x.png 2x, tanooki-labs@3x.png 3x"
                  src="tanooki-labs.png"
                  alt="Tanooki Labs"
                />
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
