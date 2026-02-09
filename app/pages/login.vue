<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const message = ref('')
const loading = ref(false)

const login = async () => {
  loading.value = true
  message.value = ''

  try {
    await $fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      body: { email: email.value, password: password.value }
    })

    // ✅ verificér at du faktisk er logget ind
    await $fetch('/api/me', { credentials: 'include' })

    // ✅ Nuxt redirect
    await navigateTo('/dashboard')

  } catch (error) {
    message.value = 'Login failed'
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-box">
    <h1>Login</h1>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="login" :disabled="loading">
      {{ loading ? 'Logger ind...' : 'Login' }}
    </button>

    <p class="error">{{ message }}</p>
  </div>
</template>