<template>
  <div class="filters">
    <label class="field filters__search">
      <span class="field__label">Search</span>

      <input
        v-model="inputValue"
        class="field__control"
        type="search"
        placeholder="Search by name or email"
        @keydown.enter.prevent="commitSearch.flush()"
      >
    </label>

    <BaseSelect
      v-model="role"
      label="Role"
      :options="roleOptions"
      allow-empty
      empty-label="All roles"
    />

    <BaseSelect
      label="Per page"
      :model-value="perPage"
      :options="perPageOptions"
      @update:model-value="onPerPageChange"
    />

    <button
      type="button"
      class="button filters__reset"
      :disabled="!canReset"
      @click="emit('reset')"
    >
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PerPage, Role } from '~/types/user'
import { PER_PAGE_OPTIONS, ROLES } from '~/types/user'
import { capitalize } from '~/utils/format'

const SEARCH_DEBOUNCE_MS = 300

defineProps<{
  perPageOptions: readonly PerPage[]
  canReset: boolean
}>()

const emit = defineEmits<{ reset: [] }>()

const search = defineModel<string>('search', { required: true })
const role = defineModel<Role | null>('role', { required: true })
const perPage = defineModel<PerPage>('perPage', { required: true })

const roleOptions = ROLES.map(value => ({ value, label: capitalize(value) }))

const inputValue = ref(search.value)

const commitSearch = useDebounceFn((value: string) => {
  search.value = value
}, SEARCH_DEBOUNCE_MS)

watch(inputValue, value => commitSearch(value))

watch(search, (value) => {
  if (value === inputValue.value.trim()) return

  commitSearch.cancel()
  inputValue.value = value
})

function onPerPageChange(value: PerPage | null): void {
  if (value !== null) perPage.value = value
}
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
}

.filters__search {
  flex: 1 1 240px;
}

.filters__reset {
  margin-left: auto;
}
</style>
