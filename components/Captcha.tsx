import HCaptcha from "@hcaptcha/react-hcaptcha"
import publicConfig from "lib/publicConfig"

export default function Captcha({onVerify}: {onVerify: (key: string) => void}) {
  return (
    <div data-test="hcaptcha">
      <HCaptcha sitekey={publicConfig.hcaptchaSiteKey} onVerify={onVerify} />
    </div>
  )
}
