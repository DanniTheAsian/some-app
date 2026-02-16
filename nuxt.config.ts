export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  devServer: {
    port: 3000
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  },

//  nitro: process.env.NODE_ENV === 'development'
//    ? {
//        devProxy: {
//          '/api/': {
 //           target: 'http://localhost:8000',
//            changeOrigin: true
//          }
//        }
//      }
//    : {}
//
}
)
