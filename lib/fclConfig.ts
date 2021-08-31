import {config} from "@onflow/fcl"
import {BASE_HTML_TITLE} from "components/PageTitle"
import publicConfig from "./publicConfig"

config()
  .put("app.detail.title", BASE_HTML_TITLE)
  .put("env", publicConfig.isLocal ? "local" : publicConfig.network)
  .put("accessNode.api", publicConfig.accessAPIHost)
  // .put("challenge.handshake", publicConfig.walletDiscovery)
  .put("0xFUNGIBLETOKENADDRESS", publicConfig.contractFungibleToken)
  .put("0xFLOWTOKENADDRESS", publicConfig.contractFlowToken)
  .put("0xFUSDADDRESS", publicConfig.contractFUSD)
