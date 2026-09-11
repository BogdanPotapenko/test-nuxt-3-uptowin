import type { QueryCodec, QueryRawValue } from '~/types/query'

export function firstQueryValue(raw: QueryRawValue): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw

  return typeof value === 'string' ? value : null
}

function matchEnum<T extends string>(raw: QueryRawValue, allowed: readonly T[]): T | null {
  const value = firstQueryValue(raw)

  return value !== null && (allowed as readonly string[]).includes(value) ? (value as T) : null
}

export function searchCodec(maxLength = 100): QueryCodec<string> {
  const normalize = (value: string): string => value.trim().slice(0, maxLength)

  return {
    parse: raw => normalize(firstQueryValue(raw) ?? ''),
    serialize: (value) => {
      const normalized = normalize(value)

      return normalized === '' ? undefined : normalized
    },
  }
}

export function enumCodec<T extends string>(allowed: readonly T[], fallback: T): QueryCodec<T> {
  return {
    parse: raw => matchEnum(raw, allowed) ?? fallback,
    serialize: value => (value === fallback ? undefined : value),
  }
}

export function nullableEnumCodec<T extends string>(allowed: readonly T[]): QueryCodec<T | null> {
  return {
    parse: raw => matchEnum(raw, allowed),
    serialize: value => value ?? undefined,
  }
}

export function numericEnumCodec<T extends number, F extends string | number = T>(
  allowed: readonly T[],
  fallback: F,
): QueryCodec<T | F> {
  return {
    parse: (raw) => {
      const value = firstQueryValue(raw)
      if (value === null) return fallback

      const parsed = Number(value)

      return (allowed as readonly number[]).includes(parsed) ? (parsed as T) : fallback
    },
    serialize: value => (value === fallback ? undefined : String(value)),
  }
}

export function pageCodec(): QueryCodec<number> {
  return {
    parse: (raw) => {
      const value = firstQueryValue(raw)
      if (value === null) return 1

      const parsed = Number(value)

      return Number.isSafeInteger(parsed) && parsed >= 1 ? parsed : 1
    },
    serialize: value => (value <= 1 ? undefined : String(value)),
  }
}
