import {GeistProvider, CssBaseline} from "@geist-ui/react"

function App({Component, pageProps}) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  )
}

export default App
