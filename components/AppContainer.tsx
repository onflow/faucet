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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,400;0,600;0,700;1,400&family=Overpass+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container>{children}</Container>
      <Footer />
    </div>
  )
}
