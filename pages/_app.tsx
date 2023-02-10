import {SSRProvider} from "@react-aria/ssr"
import "lib/fclConfig"
import theme from "lib/theme"
import {AppProps} from "next/app"
import {ThemeProvider} from "theme-ui"
import {GoogleAnalytics, event} from "nextjs-google-analytics"
import "./fonts.css"

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: {
  id: string
  name: string
  label: string
  value: number
}) {
  event(name, {
    category: label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  })
}

function App({Component, pageProps}: AppProps): JSX.Element {
  return (
    <SSRProvider>
      <ThemeProvider theme={theme}>
        <GoogleAnalytics />
        <Component {...pageProps} />
      </ThemeProvider>
    </SSRProvider>
  )
}

export default App
