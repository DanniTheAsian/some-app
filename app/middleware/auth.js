/*export default defineNuxtRouteMiddleware(() => {
  if (process.server) return 
  const token = useCookie('access_token')

  if (!token.value) {
    return navigateTo('/login')
  }
})*/

export default defineNuxtRouteMiddleware(async () => {
  try {
    await $fetch('http://localhost:8000/me', { credentials: 'include' })
  } catch {
    return navigateTo('/login')
  }
})

