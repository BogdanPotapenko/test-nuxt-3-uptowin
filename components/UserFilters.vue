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
import type { Role } from '~/types/user'
import { ROLES } from '~/types/user'
import { capitalize } from '~/utils/format'

const SEARCH_DEBOUNCE_MS = 300

defineProps<{
  canReset: boolean
}>()

const emit = defineEmits<{ reset: [] }>()

const search = defineModel<string>('search', { required: true })
const role = defineModel<Role | null>('role', { required: true })

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

@media (max-width: 640px) {
  .filters {
    gap: 10px;
    padding: 12px;
  }

  .filters .field {
    flex: 1 1 0;
    min-width: 0;
  }

  .filters .filters__search {
    flex: 2 1 0;
  }

  .filters__reset {
    flex: 0 0 auto;
    margin-left: 0;
  }
}

@media (max-width: 390px) {
  .filters .filters__search {
    flex: 1 1 100%;
  }
}
</style>
