import {createContext, useContext} from "react"
import mixpanel from "mixpanel-browser"

const token = process.env.REACT_APP_MIXPANEL_TOKEN

if (!token) {
  console.warn("Mixpanel not started. No Mixpanel token provided.")
}

mixpanel.init(token, {batch_requests: true})

const context = createContext({
  mixpanel,
})

export default context
export const useMixpanel = () => useContext(context)
