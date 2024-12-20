"use client"

import AppContainer from "../../components/AppContainer"
import CreateAccountPanel from "../../components/CreateAccountPanel"
import Header from "../../components/Header"
import PageTitle from "../../components/PageTitle"
import {CreateAccountURLParams} from "../../lib/client"

// This component runs on the server by default in the App Router.
// If you need client-side behavior, you can use 'use client' at the top.
export default function CreateAccountPage({
  searchParams,
}: {
  searchParams: {
    key?: string
    source?: string
    "sig-algo"?: string
  }
}) {
  const key = searchParams.key || ""
  const source = searchParams.source || ""
  const sigAlgo = searchParams["sig-algo"] || "ECDSA_P256"

  const props: CreateAccountURLParams = {
    publicKey: key,
    sigAlgo,
    trafficSource: source,
  }

  return (
    <AppContainer>
      <PageTitle>Create Account</PageTitle>
      <Header fund={true} />
      <CreateAccountPanel {...props} />
    </AppContainer>
  )
}