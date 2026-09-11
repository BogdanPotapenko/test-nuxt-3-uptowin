import type { LocationQuery } from 'vue-router'
import type { QueryCodec, QueryNavigationMode, QueryPatch } from '~/types/query'

export interface RouteQueryOptions {
  mode?: QueryNavigationMode
  reset?: readonly string[]
}

export function useQueryPatch() {
  const route = useRoute()
  const router = useRouter()

  return function applyQueryPatch(patch: QueryPatch, mode: QueryNavigationMode = 'push') {
    const query: LocationQuery = { ...route.query }

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined) delete query[key]
      else query[key] = value
    }

    return router[mode]({ query })
  }
}

export function useRouteQuery<T>(
  key: string,
  codec: QueryCodec<T>,
  options: RouteQueryOptions = {},
): WritableComputedRef<T> {
  const route = useRoute()
  const applyQueryPatch = useQueryPatch()
  const { mode = 'push', reset = [] } = options

  return computed<T>({
    get: () => codec.parse(route.query[key]),
    set: (value) => {
      const patch: QueryPatch = {}

      for (const resetKey of reset) patch[resetKey] = undefined
      patch[key] = codec.serialize(value)

      void applyQueryPatch(patch, mode)
    },
  })
}
