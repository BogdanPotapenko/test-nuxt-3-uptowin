<template>
  <section class="users">
    <UserFilters
      v-model:search="search"
      v-model:role="role"
      v-model:per-page="perPage"
      :per-page-options="perPageOptions"
      :can-reset="hasActiveFilters"
      @reset="resetFilters"
    />

    <UserTable
      :users="users"
      :sort-by="sortBy"
      :sort-direction="sortDirection"
      @sort="toggleSort"
    >
      <template #empty>
        No users match the current filters.
      </template>
    </UserTable>

    <UserPagination
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
import { users as allUsers } from '~/data/users'

const {
  search,
  role,
  perPage,
  perPageOptions,
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
} = useUsersTable(allUsers)
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
