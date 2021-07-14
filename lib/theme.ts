import {Theme} from "theme-ui"
import {TEST_NET} from "./constants"
import publicConfig from "./publicConfig"

const makeTheme = <T extends Theme>(t: T) => t

const heading = {
  color: "text",
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
}

const theme = makeTheme({
  space: [
    0,
    "0.25rem",
    "0.5rem",
    "1rem",
    "2rem",
    "4rem",
    "8rem",
    "16rem",
    "32rem",
  ],
  fonts: {
    body:
      'Overpass, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Overpass Mono, monospace",
  },
  fontSizes: [
    "0.75rem",
    "0.875rem",
    "1rem",
    "1.25rem",
    "1.5rem",
    "2rem",
    "3rem",
    "4rem",
    "6rem",
  ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: "#30353E",
    textMedium: "#5C626F",
    background: "#fff",
    primary: "#72EA94",
    secondary: "#3545F5",
    muted: "#f6f6f6",
    black: "#000000",
    white: "#ffffff",
    canary: "#e2d849",
    pink: "#FDC4FE",
    red: {
      "100": "#FFEEEB",
      "200": "#E55A3D",
    },
    gray: {
      "100": "#FBFBFB",
      "200": "#E5E5E5",
      "300": "#C8C8C8",
      "400": "#888888",
      "500": "#707070",
      "600": "#505050",
      "700": "#383838",
      "800": "#282828",
      "900": "#101010",
    },
  },
  buttons: {
    primary: {
      color: "black",
      bg: "primary",
      outlineColor: "gray.500",
    },
    secondary: {
      color: "background",
      bg: "secondary",
      outlineColor: "gray.300",
    },
    ghost: {
      bg: "transparent",
      border: "1px solid",
      borderColor: "gray.900",
      outlineColor: "gray.800",
    },
    disabled: {
      cursor: "default",
      opacity: 0.5,
      "&:hover": {
        opacity: 0.5,
      },
    },
    sizes: {
      sm: {
        px: 4,
        py: 2,
        fontSize: 1,
        color: "text",
        fontWeight: 700,
      },
      md: {
        fontSize: 3,
        px: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: "bold",
        letterSpacing: 1,
      },
      lg: {
        px: 4,
        fontSize: 3,
        paddingTop: 16,
        paddingBottom: 14,
        fontWeight: "bold",
        letterSpacing: 1,
      },
    },
  },
  links: {
    underline: {
      color: "textMedium",
      textDecoration: "none",
      borderBottom: "1px solid",
      borderColor: "inherit",
      "&:hover": {
        opacity: 0.8,
      },
    },
    white: {
      color: "white",
      cursor: "pointer",
      textDecoration: "none",
      "&:hover": {
        opacity: 0.8,
      },
    },
    secondary: {
      color: "secondary",
      textDecoration: "none",
      "&:hover": {
        opacity: 0.8,
      },
    },
  },
  text: {
    small: {
      color: "gray.400",
      fontSize: 0,
    },
  },
  forms: {
    label: {
      fontSize: 2,
      fontWeight: 600,
      my: 2,
    },
    select: {
      borderColor: "gray.200",
      outlineColor: "gray.300",
    },
    input: {
      borderColor: "gray.200",
      outlineColor: "gray.300",
      px: [10, 20],
    },
    textarea: {
      borderColor: "gray.200",
      resize: "none",
      outlineColor: "gray.300",
      px: [10, 20],
      py: [2, 15],
    },
  },
  breakpoints: ["576px", "768px", "1024px", "1200px"],
  container: {
    maxWidth: 1200,
    px: 3,
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      fontSize: 16,
      "&::before": {
        position: "absolute",
        content: '""',
        height: 395,
        width: "100%",
        zIndex: -1,
        background:
          publicConfig.network === TEST_NET
            ? "linear-gradient(225deg, #3545F5 -32.81%, #75E0E4 104.94%)"
            : "linear-gradient(216.57deg, #E3D948 36.82%, #FFF66F 102.51%)",
      },
    },
    h1: {
      ...heading,
      fontSize: 5,
      fontWeight: 600,
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    p: {
      color: "textMedium",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 2,
    },
    a: {
      color: "textMedium",
      "&:hover": {
        opacity: 0.8,
      },
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
    small: {
      color: "red",
    },
    hr: {
      border: 0,
      height: "1px",
      backgroundColor: "gray.200",
      my: 4,
    },
  },
})

export type FlowTheme = typeof theme

export default theme
