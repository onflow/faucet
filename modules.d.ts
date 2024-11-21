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

  export type Event = {
    type: string
    transactionId: string
    data: {[key: string]: unknown}
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

  export type Authorization = (account: Partial<Account>) => Promise<{
    tempId: string
    addr: string
    keyId: number
    signingFunction: (data: {message: string}) => {
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
  export function script(script: string): unknown
  export function decode(): unknown
  export function authz(): Authorization
  export function arg(value: any, type: string): TransactionArg
  export function args(args: TransactionArg[]): unknown
  export function authorizations(authorizations: Authorization[]): unknown
  export function proposer(proposer: Authorization): unknown
  export function payer(payer: Authorization): unknown
  export function limit(limit: number): unknown
  export function send(args: Interaction[]): Promise
  export function mutate(args: {
    cadence: string
    limit: number
    proposer: Authorization
    payer: Authorization
    authorizations: Authorization[]
    args?: (
      arg: (arg: string, t: Record<string, uknown>) => TransactionArg,
      type: Record<string, uknown>
    ) => TransactionArg[]
  }): Promise
  export function tx(arg: unknown): {
    onceSealed: () => uknown
  }
  export function currentUser(): {
    snapshot: () => Promise<{addr: string}>
    unauthenticate: () => void
  }
}

declare module "*.cdc" {
  const content: string
  export default content
}

declare module "@onflow/types"

import {} from "react"
import {ThemeUIStyleObject} from "theme-ui"

declare module "react" {
  interface Attributes {
    sx?: ThemeUIStyleObject
  }
}
