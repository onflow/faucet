import AppContainer from "components/AppContainer"
import CreateAccountPanel from "components/CreateAccountPanel"
import Header from "components/Header"
import PageTitle from "components/PageTitle"
import { CreateAccountURLParams } from "lib/client"

export default function Home(props: CreateAccountURLParams) {
  return (
    <AppContainer>
      <PageTitle>Create Account</PageTitle>
      <Header fund={true} />
      <CreateAccountPanel {...props} />
    </AppContainer>
  )
}

Home.getInitialProps = async (context: any) => {
  const key: string = context.query.key || ""
  const source: string = context.query.source || ""
  const sigAlgo: string = context.query["sig-algo"] || "ECDSA_P256"
  return { publicKey: key, sigAlgo, trafficSource: source }
}