import {Card, Input} from "@geist-ui/react"
import React, {useState} from "react"
import {fundAccount} from "../lib/client"
import FundAccountForm from "./FundAccountForm"

export type ClientFundAccountResult = {
  address: string
  token: string
  amount: string
}

export default function FundAccountPanel({
  hcaptchaSiteKey,
}: {
  hcaptchaSiteKey: string
}) {
  const [result, setResult] = useState<ClientFundAccountResult | null>(null)

  return (
    <div>
      {!result && (
        <FundAccountForm
          hcaptchaSiteKey={hcaptchaSiteKey}
          fundAccount={fundAccount}
          onResult={result => setResult(result)}
        />
      )}
      {result && (
        <Card>
          <h4>Your account has been funded</h4>
          <Input
            label="Amount"
            readOnly
            initialValue={`${result.amount} ${result.token}`}
          />
        </Card>
      )}
    </div>
  )
}
