import {CssBaseline, GeistProvider} from "@geist-ui/react"
import {AppProps} from "next/dist/next-server/lib/router/router"

function App({Component, pageProps}: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default App
