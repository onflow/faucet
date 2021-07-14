/** @jsxImportSource theme-ui */
import useAccordionOption from "hooks/useAccordionOption"
import {useState} from "react"
import {ThemeUICSSObject} from "theme-ui"

type AccordionOption = {
  title: string
  content: string
}

const accordionData = [
  {
    title: "What is the testnet faucet?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis gravida nunc, luctus sodales erat. Ut sit amet lectus tempor elit scelerisque ornare ut non lectus. Etiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu. Duis lacus felis, luctus ac elit quis, hendrerit interdum leo. Quisque justo arcu, sagittis eu nisi eget, pharetra vulputate eros.\n\nEtiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu.",
  },
  {
    title: "Changing Signature Algorithm",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis gravida nunc, luctus sodales erat. Ut sit amet lectus tempor elit scelerisque ornare ut non lectus. Etiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu. Duis lacus felis, luctus ac elit quis, hendrerit interdum leo. Quisque justo arcu, sagittis eu nisi eget, pharetra vulputate eros.\n Etiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu.",
  },
  {
    title: "Which Hash Algorithm should I use?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis gravida nunc, luctus sodales erat. Ut sit amet lectus tempor elit scelerisque ornare ut non lectus. Etiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu. Duis lacus felis, luctus ac elit quis, hendrerit interdum leo. Quisque justo arcu, sagittis eu nisi eget, pharetra vulputate eros.\n\nEtiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu.",
  },
  {
    title: "What is hCaptcha?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis gravida nunc, luctus sodales erat. Ut sit amet lectus tempor elit scelerisque ornare ut non lectus. Etiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu. Duis lacus felis, luctus ac elit quis, hendrerit interdum leo. Quisque justo arcu, sagittis eu nisi eget, pharetra vulputate eros.\n\nEtiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu.",
  },
  {
    title: "What is a public key?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis gravida nunc, luctus sodales erat. Ut sit amet lectus tempor elit scelerisque ornare ut non lectus. Etiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu. Duis lacus felis, luctus ac elit quis, hendrerit interdum leo. Quisque justo arcu, sagittis eu nisi eget, pharetra vulputate eros.\n\nEtiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu.",
  },
  {
    title: "Changing Signature Algorithm",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis gravida nunc, luctus sodales erat. Ut sit amet lectus tempor elit scelerisque ornare ut non lectus. Etiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu. Duis lacus felis, luctus ac elit quis, hendrerit interdum leo. Quisque justo arcu, sagittis eu nisi eget, pharetra vulputate eros.\n\nEtiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu.",
  },
  {
    title: "Which Hash Algorithm should I use?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis gravida nunc, luctus sodales erat. Ut sit amet lectus tempor elit scelerisque ornare ut non lectus. Etiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu. Duis lacus felis, luctus ac elit quis, hendrerit interdum leo. Quisque justo arcu, sagittis eu nisi eget, pharetra vulputate eros.\n\nEtiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu.",
  },
  {
    title: "What is hCaptcha?",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis gravida nunc, luctus sodales erat. Ut sit amet lectus tempor elit scelerisque ornare ut non lectus. Etiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu. Duis lacus felis, luctus ac elit quis, hendrerit interdum leo. Quisque justo arcu, sagittis eu nisi eget, pharetra vulputate eros.\n\nEtiam ultricies accumsan eros et vulputate. Curabitur sit amet accumsan arcu.",
  },
]

const AccordionOption = ({
  data,
  index,
  isOpen,
  onToggle,
  name,
}: {
  data: AccordionOption
  index: number
  isOpen: boolean
  onToggle: () => void
  name: string
}) => {
  const {buttonProps, contentProps} = useAccordionOption({
    index,
    isOpen,
    onToggle,
    name,
  })

  const styles: Record<string, ThemeUICSSObject> = {
    container: {
      borderBottom: isOpen ? 0 : "1px solid",
      borderColor: "gray.200",
      "&:last-child": {
        borderBottom: 0,
      },
    },
    button: {
      color: isOpen ? "secondary" : "black",
      fontFamily: "inherit",
      fontSize: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      background: "none",
      border: 0,
      padding: 0,
      height: 52,
      fontWeight: 600,
      cursor: "pointer",
      "&:hover": {
        opacity: 0.7,
      },
    },
    content: {
      whiteSpace: "pre-wrap",
      color: "gray.500",
      mt: 2,
      mb: 3,
    },
  }

  return (
    <div sx={styles.container}>
      <button {...buttonProps} sx={styles.button}>
        {data.title}
        <img src={`caret-${isOpen ? "up" : "down"}.svg`} />
      </button>
      {isOpen && (
        <div sx={styles.content} {...contentProps}>
          {data.content}
        </div>
      )}
    </div>
  )
}

export default function SidebarAccordion() {
  const [openIndex, setOpenIndex] = useState<number | undefined>(0)
  const style = {
    marginTop: [5, 5, 270],
  }

  return (
    <div sx={style}>
      {accordionData.map((data, index) => (
        <AccordionOption
          data={data}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(index === openIndex ? undefined : index)}
          key={index}
          index={index}
          name="sidebarAccordion"
        />
      ))}
    </div>
  )
}
