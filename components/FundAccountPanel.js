import React, {useState} from "react"
import * as fcl from "@onflow/fcl"

import FundAccountForm from "./FundAccountForm"
import {fundAccount} from "../lib/client"

const displayResult = ({address, amount, token}) =>
  `Funded ${fcl.display(address)} with ${amount} ${token}`

export default function FundAccountPanel({hcaptchaSiteKey}) {
  const [result, setResult] = useState(null)

  return (
    <div>
      {!result && (
        <FundAccountForm
          hcaptchaSiteKey={hcaptchaSiteKey}
          fundAccount={fundAccount}
          onResult={result => setResult(result)}
        />
      )}
      {result && displayResult(result)}
    </div>
  )
}
