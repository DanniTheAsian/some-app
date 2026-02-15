export const api = (url, options = {}) => {
  const config = useRuntimeConfig()

  return $fetch(`${config.public.API_BASE_URL}${url}`, {
    credentials: 'include',
    ...options
  })
}
