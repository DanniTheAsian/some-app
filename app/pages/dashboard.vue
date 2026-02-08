<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({ middleware: 'auth' })

const router = useRouter()
const email = ref('')
const loading = ref(true)

const logout = async () => {
  try {
    await $fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    })
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

onMounted(async () => {
  try {
    const res = await $fetch('/api/me', {
      credentials: 'include'
    })
    email.value = res.email
  } catch (error) {
    console.error('Failed to fetch user:', error)
    navigateTo('/login')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading">Loading...</div>

  <div v-else>
    <h1>Din personlige side</h1>
    <p>Email: {{ email }}</p>
    <button @click="logout">Log ud</button>
  </div>
</template>
