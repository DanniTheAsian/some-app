export const api = (url, options = {}) => {
  const config = useRuntimeConfig()
  
  // Only include credentials on client-side
  const fetchOptions = {
    ...options
  }
  
  if (process.client) {
    fetchOptions.credentials = 'include'
  }

  return $fetch(`${config.public.API_BASE_URL}${url}`, fetchOptions)
}
