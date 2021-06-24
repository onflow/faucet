import SidebarAccordion from "components/SidebarAccordion"
import SidebarEmail from "components/SidebarEmail"
import {Box} from "theme-ui"

export default function Sidebar() {
  return (
    <div>
      <Box mb={4} pb={2}>
        <SidebarAccordion />
      </Box>
      <SidebarEmail />
    </div>
  )
}
