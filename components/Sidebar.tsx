import SidebarAccordion from "components/SidebarAccordion"
import {FAUCET_GITHUB_URL} from "lib/constants"
import {Link} from "theme-ui"

export default function Sidebar() {
  return (
    <div>
      <SidebarAccordion />
      <p>
        Notice any problems?{" "}
        <Link
          sx={{"text-decoration": "none", color: "inherit"}}
          href={FAUCET_GITHUB_URL}
        >
          Submit an issue.
        </Link>
      </p>
    </div>
  )
}
