import React from "react"
import Head from "next/head"
import { Page, Text } from "@geist-ui/react"

import config from "../lib/config"
import CreateAccountPanel from "../components/CreateAccountPanel";
import FundAccountPanel from "../components/FundAccountPanel";

export default function Home({hcaptchaSiteKey}) {
  return (
    <Page>
      <Head>
        <title>Faucet</title>
      </Head>
      <Page.Header>
        <Text h2>Flow Testnet Faucet</Text>
      </Page.Header>
      <Text h3>Create Account</Text>
      <CreateAccountPanel hcaptchaSiteKey={hcaptchaSiteKey} />
      <br/>
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
