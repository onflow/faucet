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
} from "theme-ui"
import Label from "./Label"

type CustomFieldProps = FieldProps & {
  inputLabel: string
  disabled?: boolean
  required?: boolean
}

type SelectOption = {
  label: string
  value: string
}

type CustomSelectFieldProps = CustomFieldProps & {
  options: SelectOption[]
  required?: boolean
}

export const CustomInputComponent = ({
  field,
  form: {touched, errors},
  inputLabel,
  required = false,
  ...props
}: CustomFieldProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const {labelProps, inputProps} = useTextField(
    {...field, label: inputLabel},
    ref
  )
  // TODO: asserted as InputProps until react-aria issue is fixed: https://github.com/adobe/react-spectrum/issues/1760
  const assertedFieldProps = inputProps as InputProps

  return (
    <>
      <Label {...labelProps} required={required}>
        {inputLabel}
      </Label>
      <Input {...assertedFieldProps} width="100%" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <Text>{errors[field.name]}</Text>
      )}
    </>
  )
}

export const CustomTextareaComponent = ({
  field,
  form: {touched, errors},
  inputLabel,
  required = false,
  ...props
}: CustomFieldProps) => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const {labelProps, inputProps} = useTextField(
    {...field, label: inputLabel},
    ref
  )
  // TODO: asserted as TextareaProps until react-aria issue is fixed: https://github.com/adobe/react-spectrum/issues/1760
  const assertedTypedInputProps = inputProps as TextareaProps

  return (
    <>
      <Label {...labelProps} required={required}>
        {inputLabel}
      </Label>
      <Textarea {...assertedTypedInputProps} {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <Text>{errors[field.name]}</Text>
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
    <>
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
        <Text>{errors[field.name]}</Text>
      )}
    </>
  )
}
