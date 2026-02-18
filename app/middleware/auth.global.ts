export default defineNuxtRouteMiddleware(async (to) => {

  const publicPages = ['/login', '/register']

  if (publicPages.includes(to.path)) {
    return
  }

  // 🔥 STOP SSR FRA AT KALDE /me
  if (process.server) {
    return
  }

  try {
    await api('/me')
  } catch {
    return navigateTo('/login')
  }
})
