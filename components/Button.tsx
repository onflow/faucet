/** @jsxImportSource theme-ui */
import {useButton} from "@react-aria/button"
import useVariants from "hooks/useVariants"
import {useRef} from "react"
import {Button as ThemeUIButton} from "theme-ui"

type Props = {
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  block?: boolean
  disabled?: boolean
  type: "submit" | "button" | "reset"
  children: React.ReactNode
}

const Button = ({
  variant = "primary",
  size = "md",
  block = false,
  ...props
}: Props) => {
  const ref = useRef<HTMLButtonElement>(null)
  const variants = useVariants([
    `buttons.${props.disabled ? "disabled" : variant}`,
    `buttons.sizes.${size}`,
  ])

  const {buttonProps} = useButton(props, ref)

  return (
    <ThemeUIButton
      {...props}
      {...buttonProps}
      sx={{
        display: "flex",
        cursor: "pointer",
        textTransform: "uppercase",
        alignItems: "center",
        justifyContent: "center",
        width: block ? "100%" : "auto",
        m: 0,
        border: 0,
        borderRadius: 4,
        "&:hover": {
          opacity: 0.9,
        },
        ...variants,
      }}
      ref={ref}
    >
      {props.children}
    </ThemeUIButton>
  )
}

export default Button
