import type { User } from '~/types/user'
import { ROLES } from '~/types/user'

const USERS_COUNT = 50
const SEED_EPOCH = Date.UTC(2026, 0, 19)
const DAY_MS = 24 * 60 * 60 * 1000

export const users: readonly User[] = Array.from({ length: USERS_COUNT }, (_, index): User => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  age: 18 + (index % 40),
  role: ROLES[index % ROLES.length] ?? ROLES[0],
  createdAt: new Date(SEED_EPOCH - index * DAY_MS).toISOString(),
}))
