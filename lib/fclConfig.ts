import {config} from "@onflow/fcl"
import {BASE_HTML_TITLE} from "components/PageTitle"
import publicConfig from "./publicConfig"
import flowJSON from "../flow.json"

config()
  .put("flow.network", publicConfig.network)
  .put("app.detail.title", BASE_HTML_TITLE)
  .put("accessNode.api", publicConfig.accessAPIHost)
  // TODO: Implement FCL wallets
  // .put("challenge.handshake", publicConfig.walletDiscovery)
  .put("0xEVMADDRESS", publicConfig.contractEVM)
  .load({flowJSON})
