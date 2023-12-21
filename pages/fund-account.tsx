import AppContainer from "components/AppContainer"
import FundAccountPanel from "components/FundAccountPanel"
import Header from "components/Header"
import PageTitle from "components/PageTitle"
import {useRouter} from "next/router"

export default function Fund() {
  const router = useRouter()
  const {isReady, query} = router
  const {address} = query
  const formattedAddress = Array.isArray(address) ? address[0] : address || ""

  return (
    <AppContainer>
      <PageTitle>Fund Account</PageTitle>
      <Header />
      {isReady && <FundAccountPanel address={formattedAddress} />}
    </AppContainer>
  )
}
