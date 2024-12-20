import Head from "next/head"

export const BASE_HTML_TITLE = "Flow Testnet Faucet"

export default function PageTitle({children}: {children?: string}) {
  const title = [children, BASE_HTML_TITLE].filter(Boolean).join(" - ")

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} key="title" />
    </Head>
  )
}
