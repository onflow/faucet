import mixpanel from "mixpanel-browser"
import {createContext, useContext} from "react"

const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

if (!token) {
  // eslint-disable-next-line no-console
  console.warn("Mixpanel not started. No Mixpanel token provided.")
} else {
  mixpanel.init(token, {batch_requests: true})
}

const context = createContext({
  mixpanel,
})

export default context
export const useMixpanel = () => useContext(context)
