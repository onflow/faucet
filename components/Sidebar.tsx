import SidebarAccordion from "components/SidebarAccordion"
import {FAUCET_GITHUB_URL} from "lib/constants"
import {Link, Themed} from "theme-ui"

export default function Sidebar() {
  return (
    <div>
      <SidebarAccordion />
      <Themed.p>
        Notice any problems?{" "}
        <Link
          sx={{textDecoration: "none", color: "inherit"}}
          href={FAUCET_GITHUB_URL}
        >
          Submit an issue.
        </Link>
      </Themed.p>
    </div>
  )
}
