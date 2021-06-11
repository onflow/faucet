// Untyped dependencies

declare module "@onflow/fcl" {
  // Partial typing of @onflow/fcl

  export type TransactionArg = {
    value: string
    xform: {
      label: "Address"
      asArgument: uknown[]
      asInjection: uknown[]
    }
  }

  type AccountRole = {
    proposer: boolean
    authorizer: boolean
    payer: boolean
    param: boolean
  }

  type AccountSigningFunction = {
    addr: string
    keyId: number
    signature: string
  }

  export type Account = {
    kind: "ACCOUNT"
    tempId: string
    addr: string | null
    keyId: number | null
    sequenceNum: number | null
    signature: string | null
    signingFunction: AccountSigningFunction | null
    resolve: (() => void)[]
    role: AccountRole
  }

  export type Authorization = (
    account: Partial<Account>
  ) => Promise<{
    tempId: string
    addr: string
    keyId: number
    signingFunction: (data: {
      message: string
    }) => {
      addr: string
      keyId: number
      signature: string
    }
  }>

  export type Interaction = unknown

  export type Config = {
    put: (key: string, value: string) => Config
  }

  export function config(): Config

  export function sansPrefix(address: string): null | string
  export function withPrefix(address: string): null | string
  export function display(address: string): null | string

  export function transaction(transaction: string): unknown
  export function arg(encodedPublicKey: string, type: string): TransactionArg
  export function args(args: TransactionArg[]): unknown
  export function authorizations(authorizations: Authorization[]): unknown
  export function proposer(proposer: Authorization): unknown
  export function payer(payer: Authorization): unknown
  export function limit(limit: number): unknown
  export function send(args: Interaction[]): unknown
  export function tx(
    arg: unknown
  ): {
    onceSealed: () => uknown
  }
}

declare module "@onflow/util-encode-key"
declare module "@onflow/types"
