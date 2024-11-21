/** @jsxImportSource theme-ui */
import {Label as ThemeUILabel, LabelProps, Box} from "theme-ui"

type Props = {
  required?: boolean
  children: React.ReactNode
} & LabelProps

const styles = {
  required: {
    color: "red.200",
    fontWeight: "normal",
  },
}

const Label = ({required = false, children, ...props}: Props) => {
  return (
    <ThemeUILabel {...props}>
      {children}
      {required && <Box sx={styles.required}>*</Box>}
    </ThemeUILabel>
  )
}
export default Label
