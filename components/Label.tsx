/** @jsxImportSource theme-ui */
import {Label as ThemeUILabel, LabelProps} from "theme-ui"

type Props = {
  required?: boolean
  children: React.ReactNode
} & LabelProps

const styles = {
  required: {
    color: "red",
    fontWeight: "normal",
  },
}

const Label = ({required = false, children, ...props}: Props) => {
  return (
    <ThemeUILabel {...props}>
      {children}
      {required && <div sx={styles.required}>*</div>}
    </ThemeUILabel>
  )
}
export default Label
