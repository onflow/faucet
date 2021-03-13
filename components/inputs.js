import {Text, Input, Select} from "@geist-ui/react"

export const CustomInputComponent = ({
  field,
  form: {touched, errors},
  inputLabel,
  ...props
}) => (
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
  ...props
}) => (
  <>
    <Text size="1em" style={{marginBottom: "0.5rem"}} type="secondary">
      {props.inputLabel}
    </Text>
    <Select 
      onChange={option => setFieldValue(field.name, option)}
      value={field.value}>
      {props.options.map(({value, label}) => (
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
