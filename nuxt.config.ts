const applyStoredTheme = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)theme=([^;]*)/);var t=m?decodeURIComponent(m[1]):'system';if(t!=='light'&&t!=='dark')t='system';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  typescript: { strict: true },
  app: {
    head: {
      title: 'Users',
      htmlAttrs: { lang: 'en' },
      script: [{ innerHTML: applyStoredTheme, tagPosition: 'head' }],
    },
  },
})
