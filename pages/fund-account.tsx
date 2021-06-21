/** @jsxImportSource theme-ui */
import AppContainer from "components/AppContainer"
import FundAccountPanel from "components/FundAccountPanel"
import Header from "components/Header"
import {Themed} from "theme-ui"

export default function Fund() {
  return (
    <AppContainer>
      <Header />
      <Themed.h3>Fund Account</Themed.h3>
      <FundAccountPanel />
    </AppContainer>
  )
}
