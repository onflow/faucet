import Sidebar from "components/Sidebar"
import {Box, Grid} from "theme-ui"
import FundAccountForm from "./FundAccountForm"

export type ClientFundAccountResult = {
  address: string
  token: string
  amount: string
}

export default function FundAccountPanel({address}: {address: string}) {
  return (
    <div>
      <Grid gap={[0, 0, 40, 100]} columns={["auto", "auto", "1.6fr 1fr"]}>
        <Box>
          <FundAccountForm address={address} />
        </Box>
        <Box>
          <Sidebar />
        </Box>
      </Grid>
    </div>
  )
}

{
  /* <Input readOnly value={`${result.amount} ${result.token}`} /> */
}
