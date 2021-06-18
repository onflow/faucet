import theme from "lib/theme"
import {AppProps} from "next/dist/next-server/lib/router/router"
import {ThemeProvider} from "theme-ui"

function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
