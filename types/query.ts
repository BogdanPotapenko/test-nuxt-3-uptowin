import type { LocationQueryValue } from 'vue-router'

export type QueryRawValue = LocationQueryValue | LocationQueryValue[] | undefined

export type QueryPatch = Record<string, string | undefined>

export type QueryNavigationMode = 'push' | 'replace'

export interface QueryCodec<T> {
  parse: (raw: QueryRawValue) => T
  serialize: (value: T) => string | undefined
}
