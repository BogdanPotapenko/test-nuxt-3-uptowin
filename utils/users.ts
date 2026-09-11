import type { Role, SortDirection, SortField, User } from '~/types/user'
import { clamp } from '~/utils/number'

export interface UserFilters {
  search: string
  role: Role | null
}

export interface PaginatedResult<T> {
  items: readonly T[]
  page: number
  totalPages: number
  totalItems: number
  from: number
  to: number
}

type UserComparator = (a: User, b: User) => number

const COMPARATORS: Record<SortField, UserComparator> = {
  age: (a, b) => a.age - b.age,
  createdAt: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
}

export function filterUsers(users: readonly User[], filters: UserFilters): readonly User[] {
  const needle = filters.search.trim().toLowerCase()
  const { role } = filters

  if (needle === '' && role === null) return users

  return users.filter((user) => {
    if (role !== null && user.role !== role) return false
    if (needle === '') return true

    return user.name.toLowerCase().includes(needle) || user.email.toLowerCase().includes(needle)
  })
}

export function sortUsers(
  users: readonly User[],
  sortBy: SortField | null,
  direction: SortDirection,
): readonly User[] {
  if (sortBy === null) return users

  const compare = COMPARATORS[sortBy]
  const sign = direction === 'desc' ? -1 : 1

  return [...users].sort((a, b) => sign * compare(a, b) || a.id - b.id)
}

export function paginate<T>(items: readonly T[], page: number, perPage: number): PaginatedResult<T> {
  const totalItems = items.length
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))
  const currentPage = clamp(page, 1, totalPages)
  const start = (currentPage - 1) * perPage

  return {
    items: items.slice(start, start + perPage),
    page: currentPage,
    totalPages,
    totalItems,
    from: totalItems === 0 ? 0 : start + 1,
    to: Math.min(start + perPage, totalItems),
  }
}
