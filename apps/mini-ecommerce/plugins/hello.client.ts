import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";

export default defineNuxtPlugin(() => {
    const id = useRuntimeConfig().public.gaId
    console.log('[ga] id from runtimeConfig =', id)
    if (!id) return
    console.log('[nuxt] hello plugin loaded')
    ;(window as any).__hello = true
})
