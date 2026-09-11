import type { SortField, User } from '~/types/user'
import {
  DEFAULT_PER_PAGE,
  DEFAULT_SORT_DIRECTION,
  PER_PAGE_OPTIONS,
  ROLES,
  SORT_DIRECTIONS,
  SORT_FIELDS,
} from '~/types/user'
import { enumCodec, nullableEnumCodec, numericEnumCodec, pageCodec, searchCodec } from '~/utils/query'
import { filterUsers, paginate, sortUsers } from '~/utils/users'
import { clamp } from '~/utils/number'

const SEARCH_MAX_LENGTH = 100

export function useUsersTable(source: MaybeRefOrGetter<readonly User[]>) {
  const applyQueryPatch = useQueryPatch()

  const search = useRouteQuery('search', searchCodec(SEARCH_MAX_LENGTH), {
    mode: 'replace',
    reset: ['page'],
  })
  const role = useRouteQuery('role', nullableEnumCodec(ROLES), { reset: ['page'] })
  const perPage = useRouteQuery('perPage', numericEnumCodec(PER_PAGE_OPTIONS, DEFAULT_PER_PAGE), {
    reset: ['page'],
  })
  const requestedPage = useRouteQuery('page', pageCodec())
  const sortField = useRouteQuery('sortBy', nullableEnumCodec(SORT_FIELDS))
  const sortOrder = useRouteQuery('sortDir', enumCodec(SORT_DIRECTIONS, DEFAULT_SORT_DIRECTION))

  const filtered = computed(() =>
    filterUsers(toValue(source), { search: search.value, role: role.value }),
  )
  const sorted = computed(() => sortUsers(filtered.value, sortField.value, sortOrder.value))
  const result = computed(() => paginate(sorted.value, requestedPage.value, perPage.value))

  function toggleSort(field: SortField): void {
    if (sortField.value !== field) {
      applyQueryPatch({ sortBy: field, sortDir: undefined, page: undefined })
      return
    }

    if (sortOrder.value === DEFAULT_SORT_DIRECTION) {
      applyQueryPatch({ sortDir: 'desc', page: undefined })
      return
    }

    applyQueryPatch({ sortBy: undefined, sortDir: undefined, page: undefined })
  }

  function goToPage(page: number): void {
    requestedPage.value = clamp(page, 1, result.value.totalPages)
  }

  function resetFilters(): void {
    applyQueryPatch({
      search: undefined,
      role: undefined,
      sortBy: undefined,
      sortDir: undefined,
      page: undefined,
      perPage: undefined,
    })
  }

  return {
    search,
    role,
    perPage,
    perPageOptions: PER_PAGE_OPTIONS,
    sortBy: computed(() => sortField.value),
    sortDirection: computed(() => sortOrder.value),
    toggleSort,
    users: computed(() => result.value.items),
    page: computed(() => result.value.page),
    totalPages: computed(() => result.value.totalPages),
    totalItems: computed(() => result.value.totalItems),
    from: computed(() => result.value.from),
    to: computed(() => result.value.to),
    isEmpty: computed(() => result.value.totalItems === 0),
    hasActiveFilters: computed(() => search.value !== '' || role.value !== null),
    goToPage,
    resetFilters,
  }
}
