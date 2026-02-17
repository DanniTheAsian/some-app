export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return

  const token = localStorage.getItem('token')

  const publicRoutes = ['/login', '/']
  if (publicRoutes.includes(to.path)) return

  if (!token) {
    return navigateTo('/login')
  }
})
