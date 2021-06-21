import {clientCreateAccount} from "lib/client"
import {Box, Grid} from "theme-ui"
import CreateAccountForm from "./CreateAccountForm"

export default function CreateAccountPanel() {
  return (
    <div>
      <Grid gap={[0, 0, 40, 100]} columns={["auto", "auto", "1.6fr 1fr"]}>
        <Box>
          <CreateAccountForm clientCreateAccount={clientCreateAccount} />
        </Box>
        <Box>Sidebar</Box>
      </Grid>
    </div>
  )
}
