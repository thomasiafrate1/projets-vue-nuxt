import { defineNuxtPlugin, useRuntimeConfig, useHead, useRouter } from 'nuxt/app'

declare global {
  interface Window {
    dataLayer: any[]
    gtag?: (...args: any[]) => void
  }
}

export default defineNuxtPlugin(() => {
  const { public: { gaId } } = useRuntimeConfig()
  console.log('[ga] id from runtimeConfig =', gaId)
  if (!gaId) return

  // inject gtag script
  useHead({ script: [{ src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true }] })

  // init gtag
  window.dataLayer = window.dataLayer || []
  const gtag = (...args: any[]) => window.dataLayer.push(args)
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', gaId, { send_page_view: false, debug_mode: true })

  const router = useRouter()
  const sendPageView = () => {
    gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: router.currentRoute.value.fullPath,
      page_title: document.title
    })
  }

  // premier hit + à chaque nav
  sendPageView()
  router.afterEach(sendPageView)
})
