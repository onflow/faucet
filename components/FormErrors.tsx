/** @jsxImportSource theme-ui */
import {NETWORK_STATUS_URL} from "lib/constants"
import {Box, Link} from "theme-ui"
import {FieldError} from "./inputs"

export default function FormErrors({errors}: {errors: string[]}) {
  return (
    <Box mt={3}>
      <FieldError>
        {errors.join(". ")}.{" "}
        <Link href={NETWORK_STATUS_URL} target="_blank" variant="underline">
          Check Network Status
        </Link>
        .
      </FieldError>
    </Box>
  )
}
