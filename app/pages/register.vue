<script setup>
import {ref} from 'vue'

const form = ref({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
})

const message = ref('')
const loading = ref(false)

const register = async () => {
    loading.value = true
    message.value = ''

    try {
        const res = await $fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            body: form.value
        })
        message.value = res.message
    }   catch(err) {
        message.value = 'Registration failed'
    }   finally {
        loading.value = false
    }
} 
</script>

<template>
  <div style="max-width: 400px; margin:auto;">
    <h2>Create User</h2>

    <input v-model="form.username" placeholder="Username" />
    <input v-model="form.first_name" placeholder="First name" />
    <input v-model="form.last_name" placeholder="Last name" />
    <input v-model="form.email" placeholder="Email" />
    <input v-model="form.password" type="password" placeholder="Password" />

    <button @click="register" :disabled="loading">
      {{ loading ? 'Creating...' : 'Create user' }}
    </button>

    <p>{{ message }}</p>
  </div>
</template>