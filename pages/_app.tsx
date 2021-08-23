import {SSRProvider} from "@react-aria/ssr"
import "lib/fclConfig"
import theme from "lib/theme"
import {AppProps} from "next/dist/next-server/lib/router/router"
import {ThemeProvider} from "theme-ui"
import "./fonts.css"

function App({Component, pageProps}: AppProps) {
  return (
    <SSRProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SSRProvider>
  )
}

export default App
