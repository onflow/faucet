/** @jsxImportSource theme-ui */

export default function FormContainer({children}: {children: React.ReactNode}) {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
    },
    children: {
      maxWidth: 450,
      px: [0, 4],
    },
  }

  return (
    <div sx={styles.container}>
      <div sx={styles.children}>{children}</div>
    </div>
  )
}
