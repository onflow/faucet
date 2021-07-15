/** @jsxImportSource theme-ui */

import React from "react"
import {Link, ThemeUICSSObject} from "theme-ui"

export function TabNavLink({
  active,
  activeColor = "black",
  href,
  children,
}: {
  active?: boolean
  href: string
  activeColor?: string
  children: React.ReactNode
}) {
  const style: ThemeUICSSObject = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 3,
    color: active ? activeColor : "gray.300",
    borderTop: "2px solid transparent",
    borderBottom: "2px solid",
    borderBottomColor: active ? activeColor : "transparent",
    textDecoration: "none",
    fontWeight: 500,
    py: 12,
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
    justifyContent: "flex-start",
    maxWidth: 515,
    paddingLeft: 18,
    paddingRight: 18,
  }

  return <div sx={style}>{children}</div>
}
