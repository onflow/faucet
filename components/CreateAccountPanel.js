import React, {useState} from "react"
import * as fcl from "@onflow/fcl"
import {Card, Input} from "@geist-ui/react"

import CreateAccountForm from "./CreateAccountForm"
import {createAccount} from "../lib/client"

export default function CreateAccountPanel({hcaptchaSiteKey}) {
  const [address, setAddress] = useState("")

  return (
    <div>
      {!address && (
        <CreateAccountForm
          hcaptchaSiteKey={hcaptchaSiteKey}
          createAccount={createAccount}
          onResult={address => setAddress(address)}
        />
      )}
      {address && 
        <Card>
          <h4>Your account has been created</h4>
          <Input label="Address" readOnly initialValue={fcl.display(address)} />
        </Card>
      }
    </div>
  )
}
