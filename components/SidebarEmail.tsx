/** @jsxImportSource theme-ui */
import Button from "components/Button"
import {Field, Form, Formik} from "formik"
import {Box, Text, Themed, ThemeUICSSObject} from "theme-ui"
import {CustomInputComponent} from "./inputs"

const styles: Record<string, ThemeUICSSObject> = {
  heading: {
    textTransform: "uppercase",
    color: "gray.300",
    fontWeight: 600,
  },
  container: {
    backgroundColor: "gray.100",
    borderRadius: 4,
    border: "1px solid",
    borderColor: "gray.200",
    padding: 25,
    paddingTop: 12,
  },
  submitDetails: {color: "gray.300"},
}

export default function SidebarEmail() {
  return (
    <div>
      <Themed.h6 sx={styles.heading}>Receive the latest Flow news</Themed.h6>
      <div sx={styles.container}>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={() => {
            // TODO
          }}
        >
          <Form>
            <Box mb={3}>
              <Field
                component={CustomInputComponent}
                inputLabel="Email address"
                name="email"
                placeholder="Email address"
                autoComplete="off"
                type="email"
              />
            </Box>
            <Box mb={3}>
              <Button type="submit" size="md" block>
                Stay up to Date
              </Button>
            </Box>
            <Text as="div" variant="small" sx={styles.submitDetails}>
              By clicking ”Subscribe” you agree to receive email notifications
              from FLOW. You can unsubscribe at any time we do NOT share your
              information.
            </Text>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
