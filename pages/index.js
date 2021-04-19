import React from "react"
import Head from "next/head"
import Image from "next/image"
import {Page, Text, Card, Link} from "@geist-ui/react"
import config from "../lib/config"
import CreateAccountPanel from "../components/CreateAccountPanel"
import FundAccountPanel from "../components/FundAccountPanel"

export default function Home({hcaptchaSiteKey}) {
  return (
    <Page>
      <Head>
        <title>Flow Testnet Faucet</title>
        <link
          rel="icon"
          href="https://assets.website-files.com/5f6294c0c7a8cdd643b1c820/5f6294c0c7a8cd5e06b1c938_Asset%201%405x.png"
        />
      </Head>
      <Page.Header>
        <div style={{display: "flex", marginBottom: "1rem"}}>
          <Image src="/flow.svg" alt="Flow" width="64" height="64" />
          <Text h2 style={{marginBottom: 0, paddingLeft: "1rem"}}>
            Flow Testnet Faucet
          </Text>
        </div>
      </Page.Header>
      <Card type="error">
        <p>This faucet is currrently unavailable due to an ongoing issue on Flow Testnet.</p>
        <p><Link href="https://flow-view-source.com/testnet/status" color icon>View the current status.</Link></p>
      </Card>
      <Text h3>Create Account</Text>
      <CreateAccountPanel hcaptchaSiteKey={hcaptchaSiteKey} />
      <br />
      <Text h3>Fund Account</Text>
      <FundAccountPanel hcaptchaSiteKey={hcaptchaSiteKey} />
    </Page>
  )
}

export async function getStaticProps() {
  return {
    props: {
      hcaptchaSiteKey: config.hcaptchaSiteKey,
    },
  }
}
