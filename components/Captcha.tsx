import HCaptcha from "@hcaptcha/react-hcaptcha"
import publicConfig from "lib/publicConfig"

export default function Captcha({onVerify}: {onVerify: (key: string) => void}) {
  return (
    <div data-test="hcaptcha" style={{maxWidth: 296}}>
      <HCaptcha sitekey={publicConfig.hcaptchaSiteKey} onVerify={onVerify} />
    </div>
  )
}
