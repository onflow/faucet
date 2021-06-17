import {Card, Input} from "@geist-ui/react"
import * as fcl from "@onflow/fcl"
import React, {useState} from "react"
import {clientCreateAccount} from "../lib/client"
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
        <CreateAccountForm
          hcaptchaSiteKey={hcaptchaSiteKey}
          clientCreateAccount={clientCreateAccount}
          onResult={address => setAddress(address)}
        />
      )}
      {address && (
        <Card>
          <h4>Your account has been created</h4>
          <Input
            label="Address"
            readOnly
            initialValue={fcl.display(address) || ""}
          />
        </Card>
      )}
    </div>
  )
}
