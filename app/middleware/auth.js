/*export default defineNuxtRouteMiddleware(() => {
  if (process.server) return 
  const token = useCookie('access_token')

  if (!token.value) {
    return navigateTo('/login')
  }
})*/

import { api } from '~/utils/api'

export default defineNuxtRouteMiddleware(async () => {
  try {
    await api('/me')
  } catch {
    return navigateTo('/login')
  }
})

