import React, {useState} from "react"
import * as fcl from "@onflow/fcl"

import CreateAccountForm from "./CreateAccountForm"
import { createAccount } from "../lib/client";

export default function CreateAccountPanel({hcaptchaSiteKey}) {
  const [address, setAddress] = useState("")

  return (
    <div>
      {!address &&
        <CreateAccountForm 
          hcaptchaSiteKey={hcaptchaSiteKey}
          createAccount={createAccount}
          onResult={address => setAddress(address)} />
      }
      {address && `Address: ${fcl.display(address)}`}
    </div>
  )
}
