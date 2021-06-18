import CreateAccountPanel from "components/CreateAccountPanel"
import FundAccountPanel from "components/FundAccountPanel"
import config from "lib/config"
import Head from "next/head"
import Image from "next/image"
import {Container, Themed} from "theme-ui"

export default function Home({hcaptchaSiteKey}: {hcaptchaSiteKey: string}) {
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
      <Container p={4}>
        <header>
          <div style={{display: "flex", marginBottom: "1rem"}}>
            <Image src="/flow.svg" alt="Flow" width="64" height="64" />
            <Themed.h2 style={{marginBottom: 0, paddingLeft: "1rem"}}>
              Flow Testnet Faucet
            </Themed.h2>
          </div>
        </header>
        <CreateAccountPanel hcaptchaSiteKey={hcaptchaSiteKey} />
        <br />
        <Themed.h3>Fund Account</Themed.h3>
        <FundAccountPanel hcaptchaSiteKey={hcaptchaSiteKey} />
      </Container>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      hcaptchaSiteKey: config.hcaptchaSiteKey,
    },
  }
}
