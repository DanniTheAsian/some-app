export const api = (url, options = {}) => {
  const config = useRuntimeConfig()

  const token = process.client
    ? localStorage.getItem('token')
    : null

  return $fetch(`${config.public.API_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  })
}
