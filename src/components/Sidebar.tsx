import SidebarAccordion from "../components/SidebarAccordion"
import {FAUCET_GITHUB_URL} from "../lib/constants"
import {Link} from "theme-ui"
import {Themed} from "@theme-ui/mdx"

export default function Sidebar() {
  return (
    <div>
      <SidebarAccordion />
      <Themed.p>
        Notice any problems?{" "}
        <Link
          sx={{textDecoration: "none", color: "inherit"}}
          href={FAUCET_GITHUB_URL}
          target="_blank"
        >
          Submit an issue.
        </Link>
      </Themed.p>
    </div>
  )
}
