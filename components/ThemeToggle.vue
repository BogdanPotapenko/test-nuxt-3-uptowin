<template>
  <div
    class="theme-toggle"
    role="group"
    aria-label="Color theme"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="theme-toggle__option"
      :class="{ 'theme-toggle__option--active': theme === option.value }"
      :aria-pressed="theme === option.value"
      @click="setTheme(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { THEMES } from '~/types/theme'
import { capitalize } from '~/utils/format'

const { theme, setTheme } = useTheme()

const options = THEMES.map(value => ({ value, label: capitalize(value) }))
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  padding: 3px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface-muted);
}

.theme-toggle__option {
  padding: 5px 12px;
  border: 0;
  border-radius: 999px;
  background: none;
  color: var(--text-muted);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.theme-toggle__option:hover {
  color: var(--text);
}

.theme-toggle__option--active {
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow);
}
</style>
