import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: { baseURL: '/shop/' },
  ssr: false,
  plugins: [
    'plugins/hello.client',
    'plugins/ga.client'
  ],
  runtimeConfig: {
    public: {
      gaId: process.env.NUXT_PUBLIC_GA_ID || ''
    }
  }
})
