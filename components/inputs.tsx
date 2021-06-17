import {Input, Select, Text} from "@geist-ui/react"
import {FieldProps} from "formik"

type CustomFieldProps = FieldProps & {
  inputLabel: string
  disabled?: boolean
}

type SelectOption = {
  label: string
  value: string
}

type CustomSelectFieldProps = CustomFieldProps & {
  options: SelectOption[]
}

export const CustomInputComponent = ({
  field,
  form: {touched, errors},
  inputLabel,
  ...props
}: CustomFieldProps) => (
  <>
    <Text size="1em" style={{marginBottom: "0.5rem"}} type="secondary">
      {inputLabel}
    </Text>
    <Input width="100%" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <Text small type="error">
        {errors[field.name]}
      </Text>
    )}
  </>
)

export const CustomSelectComponent = ({
  field,
  form: {touched, errors, setFieldValue},
  disabled,
  inputLabel,
  options,
}: CustomSelectFieldProps) => (
  <>
    <Text size="1em" style={{marginBottom: "0.5rem"}} type="secondary">
      {inputLabel}
    </Text>
    <Select
      disabled={disabled}
      onChange={option => setFieldValue(field.name, option)}
      value={field.value}
    >
      {options.map(({value, label}) => (
        <Select.Option key={value} value={value}>
          {label}
        </Select.Option>
      ))}
    </Select>

    {touched[field.name] && errors[field.name] && (
      <Text small type="error">
        {errors[field.name]}
      </Text>
    )}
  </>
)
