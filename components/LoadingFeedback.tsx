import {Box, ThemeUICSSObject} from "theme-ui"
import Image from "next/image"

const styles: Record<string, ThemeUICSSObject> = {
  loading: {
    my: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 0,
    color: "gray.300",
    textTransform: "uppercase",
  },
}

export default function LoadingFeedback({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <Box sx={styles.loading}>
      <Image src="loading.svg" alt="loading" />
      <br />
      {children}
    </Box>
  )
}
