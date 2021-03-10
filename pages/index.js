import React from "react"
import Head from "next/head"

import config from "../lib/config"
import CreateAccountPanel from "../components/CreateAccountPanel";
import FundAccountPanel from "../components/FundAccountPanel";

export default function Home({hcaptchaSiteKey}) {
  return (
    <div style={{ textAlign: "center"}}>
      <Head>
        <title>Faucet</title>
      </Head>
      <h1>Flow Testnet Faucet</h1>
      <h2>Create Account</h2>
      <CreateAccountPanel hcaptchaSiteKey={hcaptchaSiteKey} />
      <h2>Fund Account</h2>
      <FundAccountPanel hcaptchaSiteKey={hcaptchaSiteKey} />
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
