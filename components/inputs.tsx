/** @jsxImportSource theme-ui */
import {useLabel} from "@react-aria/label"
import {useTextField} from "@react-aria/textfield"
import {FieldProps} from "formik"
import {useRef} from "react"
import {
  Input,
  InputProps,
  Select,
  Text,
  Textarea,
  TextareaProps,
  ThemeUICSSObject,
} from "theme-ui"
import Label from "./Label"

type CustomFieldProps = FieldProps & {
  inputLabel: string
  disabled?: boolean
  required?: boolean
  sx?: ThemeUICSSObject
}

type SelectOption = {
  label: string
  value: string
}

type CustomSelectFieldProps = CustomFieldProps & {
  options: SelectOption[]
  required?: boolean
}

const errorInputStyles = {
  border: "1px solid",
  borderColor: "red.200",
  color: "red.200",
  outlineColor: "red.200",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}

export const FieldError = ({children}: {children: React.ReactNode}) => {
  const style = {
    border: "1px solid",
    borderColor: "red.200",
    backgroundColor: "red.100",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    color: "red.200",
    marginTop: "-1px",
    px: 4,
    py: 3,
    "> a": {
      color: "red.200",
    },
  }

  return <div sx={style}>{children}</div>
}

export const CustomInputComponent = ({
  field,
  form: {touched, errors},
  inputLabel,
  required = false,
  sx = {},
  ...props
}: CustomFieldProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const {labelProps, inputProps} = useTextField(
    {...field, label: inputLabel},
    ref
  )
  // TODO: asserted as InputProps until react-aria issue is fixed: https://github.com/adobe/react-spectrum/issues/1760
  const assertedFieldProps = inputProps as InputProps
  const showError = touched[field.name] && errors[field.name]

  return (
    <>
      <Label {...labelProps} required={required}>
        {inputLabel}
      </Label>
      <Input
        {...assertedFieldProps}
        width="100%"
        {...field}
        {...props}
        sx={showError ? {...sx, ...errorInputStyles} : sx}
      />
      {showError && (
        <FieldError>
          <>{errors[field.name]}</>
        </FieldError>
      )}
    </>
  )
}

export const CustomTextareaComponent = ({
  field,
  form: {touched, errors},
  inputLabel,
  required = false,
  sx = {},
  ...props
}: CustomFieldProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const {labelProps, inputProps} = useTextField(
    {...field, label: inputLabel},
    ref
  )
  // TODO: asserted as TextareaProps until react-aria issue is fixed: https://github.com/adobe/react-spectrum/issues/1760
  const assertedTypedInputProps = inputProps as TextareaProps
  const showError = touched[field.name] && errors[field.name]

  return (
    <>
      <Label {...labelProps} required={required}>
        {inputLabel}
      </Label>
      <Textarea
        {...assertedTypedInputProps}
        {...field}
        {...props}
        sx={showError ? {...sx, ...errorInputStyles} : sx}
      />
      {showError && (
        <FieldError>
          <>{errors[field.name]}</>
        </FieldError>
      )}
    </>
  )
}

export const CustomSelectComponent = ({
  field,
  form: {touched, errors, setFieldValue},
  disabled,
  inputLabel,
  options,
  required = false,
}: CustomSelectFieldProps) => {
  const {labelProps, fieldProps} = useLabel({label: inputLabel})
  return (
    <div data-test="token-select">
      <Label required={required} {...labelProps}>
        {inputLabel}
      </Label>

      <Select
        disabled={disabled}
        onChange={e => setFieldValue(field.name, e.target.value)}
        value={field.value}
        {...fieldProps}
      >
        {options.map(({value, label}) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>

      {touched[field.name] && errors[field.name] && (
        <Text>
          <>{errors[field.name]}</>
        </Text>
      )}
    </div>
  )
}
