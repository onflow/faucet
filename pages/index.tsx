/** @jsxImportSource theme-ui */
import AppContainer from "components/AppContainer"
import CreateAccountPanel from "components/CreateAccountPanel"
import Header from "components/Header"

export default function Home() {
  return (
    <AppContainer>
      <Header fund={true} />
      <CreateAccountPanel />
    </AppContainer>
  )
}
