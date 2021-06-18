import {fundAccount} from "lib/client"
import {useState} from "react"
import {Input, Label} from "theme-ui"
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
        <div>
          <h4>Your account has been funded</h4>
          <Label>Amount</Label>
          <Input readOnly value={`${result.amount} ${result.token}`} />
        </div>
      )}
    </div>
  )
}
