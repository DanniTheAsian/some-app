export default defineNuxtRouteMiddleware(() => {
  if (process.server) return 
  const token = useCookie('access_token')

  if (!token.value) {
    return navigateTo('/login')
  }
})
