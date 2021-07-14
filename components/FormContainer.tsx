/** @jsxImportSource theme-ui */

import NetworkLinks from "components/NetworkLinks"
import React from "react"
import {ThemeUICSSObject} from "theme-ui"

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
      maxWidth: 515,
      px: 4,
    },
  }
  return (
    <div sx={styles.container}>
      <NetworkLinks />
      <div sx={styles.children}>{children}</div>
    </div>
  )
}
