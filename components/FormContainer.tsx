import NetworkLinks from "components/NetworkLinks"
import React from "react"
import {Box, ThemeUICSSObject} from "theme-ui"

export default function FormContainer({children}: {children: React.ReactNode}) {
  const styles: Record<string, ThemeUICSSObject> = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0px 4px 74px 0px #00000026",
      backgroundColor: "white",
      borderRadius: 4,
    },
    children: {
      width: "100%",
      maxWidth: 515,
      px: 4,
    },
  }
  return (
    <Box sx={styles.container}>
      <NetworkLinks />
      <Box sx={styles.children}>{children}</Box>
    </Box>
  )
}
