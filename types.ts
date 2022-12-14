export type Currency = {
  id: string,
  type: string,
  name: string,
  code: string,
  isSupportedInUS: boolean,
  supportsTestMode: boolean,
}

export type Filters = Record<string,boolean>

export type InputValue = {
  checked: boolean,
  id: string,
}