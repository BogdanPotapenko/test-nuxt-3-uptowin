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
      @capacity="autoPageSize = $event"
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

const autoPageSize = ref<number>(DEFAULT_PER_PAGE)

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
