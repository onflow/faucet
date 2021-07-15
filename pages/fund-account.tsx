import AppContainer from "components/AppContainer"
import FundAccountPanel from "components/FundAccountPanel"
import Header from "components/Header"
import PageTitle from "components/PageTitle"

export default function Fund() {
  return (
    <AppContainer>
      <PageTitle>Fund Account</PageTitle>
      <Header />
      <FundAccountPanel />
    </AppContainer>
  )
}
