/** @jsxImportSource theme-ui */
import useAccordionOption from "hooks/useAccordionOption"
import {useState} from "react"
import {ThemeUICSSObject} from "theme-ui"
import {useMixpanel} from "lib/mixpanel"
import {Mixpanel} from "mixpanel-browser"
import {ACCOUNTS_KEYS_DOCS_URL, H_CAPTCHA_URL} from "lib/constants"

type AccordionOption = {
  title: string
  content: string
}

const accordionData = [
  {
    title: "What is a faucet?",
    content:
      "A faucet is a way to distribute small amounts of a token to its users for testing and development purposes. This faucet allows you to create an account on the specified network as well as fund small amounts of crypto to any account on these networks.",
  },
  {
    title: "What is hCaptcha?",
    content: `hCaptcha is a service that helps us prevent bots and spam from abusing the faucet. Read more at: ${H_CAPTCHA_URL}`,
  },
  {
    title: "What is a public key?",
    content:
      "Your public key(s) on Flow are used to verify transaction data. On Flow, your public key is not part of a Flow account's address. This decoupling allows for multiple public keys to be associated with one account, or for a single public key to be used across several accounts.",
  },
  {
    title: "Which signature and hash algorithm do I use?",
    content:
      "We recommend going with the defaults unless you have a specific reason to do otherwise (eg. compatibility with an existing application).",
  },
  {
    title: "Do I need to use the faucet to build dapps?",
    content: `If you would like to run your dapp on testnet then you must generate your initial testnet account using the faucet. Subsequent accounts can be created by submitting a transaction, authorized by the initial account, via any SDK or the Flow CLI. 
      \n\nRead more about accounts on Flow here: ${ACCOUNTS_KEYS_DOCS_URL}`,
  },
  {
    title: "Do I need to fund my account to use it?",
    content:
      "No. When your account is created, it is allocated a small amount of tokens (account minimum balance) so you can use it right away.",
  },
]

const AccordionOption = ({
  data,
  index,
  isOpen,
  onToggle,
  name,
  mixpanel,
}: {
  data: AccordionOption
  index: number
  isOpen: boolean
  onToggle: () => void
  name: string
  mixpanel: Mixpanel
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
      <button
        {...buttonProps}
        sx={styles.button}
        onClick={() => {
          mixpanel.track("Faucet: FAQ Clicked", {title: data.title})
        }}
      >
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

  const {mixpanel} = useMixpanel()

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
          mixpanel={mixpanel}
        />
      ))}
    </div>
  )
}
