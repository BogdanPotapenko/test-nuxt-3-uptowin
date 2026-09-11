export const ROLES = ['admin', 'manager', 'user'] as const
export type Role = (typeof ROLES)[number]

export const SORT_FIELDS = ['age', 'createdAt'] as const
export type SortField = (typeof SORT_FIELDS)[number]

export const SORT_DIRECTIONS = ['asc', 'desc'] as const
export type SortDirection = (typeof SORT_DIRECTIONS)[number]

export const PER_PAGE_OPTIONS = [10, 15, 20] as const
export type PerPage = (typeof PER_PAGE_OPTIONS)[number]

export const DEFAULT_PER_PAGE: PerPage = 10
export const DEFAULT_SORT_DIRECTION: SortDirection = 'asc'

export interface User {
  id: number
  name: string
  email: string
  age: number
  role: Role
  createdAt: string
}
