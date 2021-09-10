/** @jsxImportSource theme-ui */
import {NETWORK_STATUS_URL} from "lib/constants"
import {Box, Link} from "theme-ui"
import {FieldError} from "./inputs"

export default function FormErrors({
  errors,
  link,
}: {
  errors: string[]
  link?: {url: string; name: string}
}) {
  return (
    <Box mt={3}>
      <FieldError>
        {errors.join(". ")}.{" "}
        <Link
          href={link?.url || NETWORK_STATUS_URL}
          target="_blank"
          variant="underline"
        >
          {link?.name || "Check Network Status"}
        </Link>
      </FieldError>
    </Box>
  )
}
