export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  typescript: { strict: true },
  app: {
    head: {
      title: 'Users',
      htmlAttrs: { lang: 'en' },
    },
  },
})
