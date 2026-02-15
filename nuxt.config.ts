// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  devServer: {
    port: 3000
  },

  
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:8000',
      API_BASE_URL: ''
    }
  }, 


  nitro: {
    routeRules: {
      '/api/**': { proxy: 'http://localhost:8000/**' }
    },
    devProxy: {
      '/api/': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})

