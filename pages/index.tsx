import AppContainer from "components/AppContainer"
import CreateAccountPanel from "components/CreateAccountPanel"
import Header from "components/Header"
import PageTitle from "components/PageTitle"

export default function Home() {
  return (
    <AppContainer>
      <PageTitle>Create Account</PageTitle>
      <Header fund={true} />
      <CreateAccountPanel />
    </AppContainer>
  )
}
