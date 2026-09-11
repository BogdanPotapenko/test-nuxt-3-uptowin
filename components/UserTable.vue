<template>
  <div class="table-wrapper">
    <table class="table">
      <caption class="visually-hidden">
        Users list
      </caption>

      <thead>
        <tr>
          <th
            v-for="column in COLUMNS"
            :key="column.key"
            scope="col"
            :aria-sort="ariaSortFor(column.sortField)"
          >
            <button
              v-if="column.sortField"
              type="button"
              class="table__sort"
              @click="emit('sort', column.sortField)"
            >
              {{ column.label }}

              <span
                class="table__sort-icon"
                :class="{ 'table__sort-icon--active': sortBy === column.sortField }"
                aria-hidden="true"
              >
                {{ sortIconFor(column.sortField) }}
              </span>
            </button>

            <template v-else>
              {{ column.label }}
            </template>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td>{{ user.name }}</td>
          <td class="table__muted">{{ user.email }}</td>
          <td>{{ user.age }}</td>
          <td>
            <span class="badge">{{ user.role }}</span>
          </td>
          <td class="table__muted">{{ formatDate(user.createdAt) }}</td>
        </tr>

        <tr v-if="users.length === 0">
          <td
            :colspan="COLUMNS.length"
            class="table__empty"
          >
            <slot name="empty">No users found</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { SortDirection, SortField, User } from '~/types/user'
import { formatDate } from '~/utils/format'

interface Column {
  key: string
  label: string
  sortField?: SortField
}

const COLUMNS: readonly Column[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Age', sortField: 'age' },
  { key: 'role', label: 'Role' },
  { key: 'createdAt', label: 'Created', sortField: 'createdAt' },
]

const props = defineProps<{
  users: readonly User[]
  sortBy: SortField | null
  sortDirection: SortDirection
}>()

const emit = defineEmits<{ sort: [field: SortField] }>()

function ariaSortFor(field: SortField | undefined): 'ascending' | 'descending' | 'none' | undefined {
  if (field === undefined) return undefined
  if (props.sortBy !== field) return 'none'

  return props.sortDirection === 'asc' ? 'ascending' : 'descending'
}

function sortIconFor(field: SortField): string {
  if (props.sortBy !== field) return '↕'

  return props.sortDirection === 'asc' ? '↑' : '↓'
}
</script>

<style scoped>
.table-wrapper {
  flex: 1;
  min-height: 240px;
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.table th,
.table td {
  padding: 10px 14px;
  text-align: left;
  white-space: nowrap;
}

.table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--surface-muted);
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: inset 0 -1px 0 var(--border);
}

.table tbody tr + tr td {
  border-top: 1px solid var(--border);
}

.table tbody tr:hover td {
  background: var(--surface-muted);
}

.table__muted {
  color: var(--text-muted);
}

.table__sort {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  cursor: pointer;
}

.table__sort:hover {
  color: var(--accent);
}

.table__sort-icon {
  opacity: 0.4;
}

.table__sort-icon--active {
  opacity: 1;
  color: var(--accent);
}

.table__empty {
  padding: 40px 14px;
  color: var(--text-muted);
  text-align: center;
  white-space: normal;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
