<template>
  <nav
    class="pagination"
    aria-label="Pagination"
  >
    <p
      class="pagination__summary"
      aria-live="polite"
    >
      <template v-if="totalItems === 0">
        No results
      </template>
      <template v-else>
        Showing {{ from }}–{{ to }} of {{ totalItems }}
      </template>
    </p>

    <ul class="pagination__list">
      <li>
        <button
          type="button"
          class="button"
          :disabled="page <= 1"
          @click="emit('change', page - 1)"
        >
          Prev
        </button>
      </li>

      <li
        v-for="(item, index) in items"
        :key="`${item}-${index}`"
      >
        <span
          v-if="item === PAGE_ELLIPSIS"
          class="pagination__ellipsis"
        >
          …
        </span>

        <button
          v-else
          type="button"
          class="button pagination__page"
          :class="{ 'pagination__page--active': item === page }"
          :aria-current="item === page ? 'page' : undefined"
          @click="emit('change', item)"
        >
          {{ item }}
        </button>
      </li>

      <li>
        <button
          type="button"
          class="button"
          :disabled="page >= totalPages"
          @click="emit('change', page + 1)"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { PAGE_ELLIPSIS, buildPageItems } from '~/utils/pagination'

const props = defineProps<{
  page: number
  totalPages: number
  totalItems: number
  from: number
  to: number
}>()

const emit = defineEmits<{ change: [page: number] }>()

const items = computed(() => buildPageItems(props.page, props.totalPages))
</script>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pagination__summary {
  margin: 0;
  color: var(--text-muted);
}

.pagination__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pagination__page {
  min-width: 36px;
}

.pagination__page--active {
  border-color: var(--accent);
  background: var(--accent);
  color: var(--accent-contrast);
}

.pagination__page--active:hover {
  color: var(--accent-contrast);
}

.pagination__ellipsis {
  display: inline-block;
  min-width: 24px;
  color: var(--text-muted);
  text-align: center;
}
</style>
