<template>
  <label
    class="field"
    :class="{ 'field--inline': inline }"
  >
    <span class="field__label">{{ label }}</span>

    <select
      v-model="model"
      class="field__control select"
    >
      <option
        v-if="allowEmpty"
        :value="null"
      >
        {{ emptyLabel }}
      </option>

      <option
        v-for="option in normalizedOptions"
        :key="String(option.value)"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts" generic="T extends string | number">
import type { SelectOption } from '~/types/ui'

const props = withDefaults(
  defineProps<{
    label: string
    options: readonly (T | SelectOption<T>)[]
    allowEmpty?: boolean
    emptyLabel?: string
    inline?: boolean
  }>(),
  {
    allowEmpty: false,
    emptyLabel: 'All',
    inline: false,
  },
)

const model = defineModel<T | null>({ required: true })

const normalizedOptions = computed<SelectOption<T>[]>(() =>
  props.options.map(option =>
    typeof option === 'object' ? option : { label: String(option), value: option },
  ),
)
</script>

<style scoped>
.select {
  padding-right: 32px;
  cursor: pointer;
}
</style>
