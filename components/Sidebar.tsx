import SidebarAccordion from "components/SidebarAccordion"
import {FAUCET_GITHUB_URL} from "lib/constants"

export default function Sidebar() {
  return (
    <div>
      <SidebarAccordion />
      <p>
        Notice any problems?{" "}
        <a
          style={{"text-decoration": "none", color: "inherit"}}
          href={FAUCET_GITHUB_URL}
        >
          Submit an issue.
        </a>
      </p>
    </div>
  )
}
