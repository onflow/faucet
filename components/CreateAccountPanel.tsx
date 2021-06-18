import * as fcl from "@onflow/fcl"
import {clientCreateAccount} from "lib/client"
import {useState} from "react"
import {Box, Grid, Input, Label} from "theme-ui"
import CreateAccountForm from "./CreateAccountForm"
export default function CreateAccountPanel({
  hcaptchaSiteKey,
}: {
  hcaptchaSiteKey: string
}) {
  const [address, setAddress] = useState("")

  return (
    <div>
      {!address && (
        <Grid gap={[0, 0, 40, 100]} columns={["auto", "auto", "1.3fr 1fr"]}>
          <Box>
            <CreateAccountForm
              hcaptchaSiteKey={hcaptchaSiteKey}
              clientCreateAccount={clientCreateAccount}
              onResult={address => setAddress(address)}
            />
          </Box>
          <Box>Sidebar</Box>
        </Grid>
      )}
      {address && (
        <div>
          <h4>Your account has been created</h4>
          <Label>Address</Label>
          <Input readOnly value={fcl.display(address) || ""} />
        </div>
      )}
    </div>
  )
}
