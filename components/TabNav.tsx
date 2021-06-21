/** @jsxImportSource theme-ui */

import React from "react"
import {Link, ThemeUICSSObject} from "theme-ui"

export function TabNavLink({
  active,
  activeColor = "textMedium",
  href,
  children,
}: {
  active?: boolean
  href: string
  activeColor?: string
  children: React.ReactNode
}) {
  const style: ThemeUICSSObject = {
    fontSize: 3,
    color: active ? activeColor : "textMedium",
    borderTop: "2px solid transparent",
    borderBottom: "2px solid",
    borderBottomColor: active ? activeColor : "transparent",
    textDecoration: "none",
    fontWeight: 700,
    py: 3,
    mx: 3,
    "&:hover": {
      opacity: 0.8,
    },
  }

  return (
    <Link href={href} sx={style}>
      {children}
    </Link>
  )
}

export default function TabNav({children}: {children: React.ReactNode}) {
  const style = {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid",
    borderColor: "gray.200",
  }

  return <div sx={style}>{children}</div>
}
