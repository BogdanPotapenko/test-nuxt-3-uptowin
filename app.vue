<template>
  <div class="layout">
    <header class="layout__header">
      <div>
        <h1 class="layout__title">Users</h1>
        <p class="layout__subtitle">Filter, sort and page through the directory.</p>
      </div>

      <ThemeToggle />
    </header>

    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
const { theme } = useTheme()

useHead({
  htmlAttrs: {
    'data-theme': theme,
  },
})
</script>

<style scoped>
.layout {
  max-width: 1040px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}

.layout__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.layout__title {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.layout__subtitle {
  margin: 4px 0 0;
  color: var(--text-muted);
}
</style>
