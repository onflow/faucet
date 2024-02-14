import {Box, ThemeUICSSObject} from "theme-ui"

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
      <img src="loading.svg" />
      <br />
      {children}
    </Box>
  )
}
