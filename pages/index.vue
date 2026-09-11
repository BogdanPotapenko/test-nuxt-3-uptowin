<template>
  <section class="users">
    <UserFilters
      v-model:search="search"
      v-model:role="role"
      :can-reset="hasActiveFilters"
      @reset="resetFilters"
    />

    <UserTable
      :users="users"
      :sort-by="sortBy"
      :sort-direction="sortDirection"
      @sort="toggleSort"
      @capacity="onCapacity"
    >
      <template #empty>
        No users match the current filters.
      </template>
    </UserTable>

    <UserPagination
      v-model:per-page="perPage"
      :page="page"
      :total-pages="totalPages"
      :total-items="totalItems"
      :from="from"
      :to="to"
      @change="goToPage"
    />
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_PER_PAGE } from '~/types/user'
import { users as allUsers } from '~/data/users'

const AUTO_PAGE_SIZE_COOKIE = 'autoPageSize'
const ONE_YEAR = 60 * 60 * 24 * 365
const MAX_AUTO_PAGE_SIZE = 100

function normalizeCapacity(value: unknown): number {
  const parsed = Number(value)

  return Number.isSafeInteger(parsed) && parsed >= 1
    ? Math.min(parsed, MAX_AUTO_PAGE_SIZE)
    : DEFAULT_PER_PAGE
}

const autoPageSizeCookie = useCookie<number>(AUTO_PAGE_SIZE_COOKIE, {
  default: () => DEFAULT_PER_PAGE,
  sameSite: 'lax',
  path: '/',
  maxAge: ONE_YEAR,
})

const autoPageSize = ref(normalizeCapacity(autoPageSizeCookie.value))

function onCapacity(rows: number): void {
  autoPageSize.value = rows
  autoPageSizeCookie.value = rows
}

const {
  search,
  role,
  perPage,
  sortBy,
  sortDirection,
  toggleSort,
  users,
  page,
  totalPages,
  totalItems,
  from,
  to,
  hasActiveFilters,
  goToPage,
  resetFilters,
} = useUsersTable(allUsers, autoPageSize)
</script>

<style scoped>
.users {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}
</style>
