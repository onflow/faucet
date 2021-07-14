/** @jsxImportSource theme-ui */
import Footer from "components/Footer"
import Head from "next/head"
import {Container} from "theme-ui"

export default function AppContainer({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Head>
        <title>Flow Testnet Faucet</title>
        <link
          rel="icon"
          href="https://assets.website-files.com/5f6294c0c7a8cdd643b1c820/5f6294c0c7a8cd5e06b1c938_Asset%201%405x.png"
        />
      </Head>
      <Container>{children}</Container>
      <Footer />
    </div>
  )
}
