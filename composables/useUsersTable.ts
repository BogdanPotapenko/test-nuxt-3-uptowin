import type { SortField, User } from '~/types/user'
import {
  DEFAULT_SORT_DIRECTION,
  PER_PAGE_AUTO,
  PER_PAGE_CHOICES,
  ROLES,
  SORT_DIRECTIONS,
  SORT_FIELDS,
} from '~/types/user'
import { nullableEnumCodec, optionCodec, pageCodec, searchCodec } from '~/utils/query'
import { filterUsers, paginate, sortUsers } from '~/utils/users'
import { clamp } from '~/utils/number'

const SEARCH_MAX_LENGTH = 100

export function useUsersTable(
  source: MaybeRefOrGetter<readonly User[]>,
  autoPageSize: MaybeRefOrGetter<number>,
) {
  const applyQueryPatch = useQueryPatch()

  const search = useRouteQuery('search', searchCodec(SEARCH_MAX_LENGTH), {
    mode: 'replace',
    reset: ['page'],
  })
  const role = useRouteQuery('role', nullableEnumCodec(ROLES), { reset: ['page'] })
  const perPage = useRouteQuery('perPage', optionCodec(PER_PAGE_CHOICES, PER_PAGE_AUTO), {
    reset: ['page'],
  })

  const requestedPage = useRouteQuery('page', pageCodec())
  const sortField = useRouteQuery('sortBy', nullableEnumCodec(SORT_FIELDS))
  const sortOrder = useRouteQuery('sortDir', optionCodec(SORT_DIRECTIONS, DEFAULT_SORT_DIRECTION))

  const resolvedPerPage = computed(() =>
    perPage.value === PER_PAGE_AUTO ? Math.max(1, toValue(autoPageSize)) : perPage.value,
  )

  const filtered = computed(() =>
    filterUsers(toValue(source), { search: search.value, role: role.value }),
  )
  const sorted = computed(() => sortUsers(filtered.value, sortField.value, sortOrder.value))
  const result = computed(() => paginate(sorted.value, requestedPage.value, resolvedPerPage.value))

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
