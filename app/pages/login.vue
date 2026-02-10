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
<div class="wrapper">
  <div class="intro-text">
    <h1>Velkommen til siden uden navn... <br>Jeg kan ikke finde på noget lige nu endnu</h1>
  </div>
  
  <div class="auth-box">
    <div class="extra-wrapper">
    <h2>Her kan du logge ind.. <br>hvis du ikke vidste det :)</h2>
    <input type="email" v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="login" :disabled="loading">
      {{ loading ? 'Logger ind...' : 'Login' }}
    </button>

    <p class="error">{{ message }}</p>
  </div>
  </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 3fr 2fr; 
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.auth-box {
 
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
  background: hotpink ;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
   font-size: 28px;
     margin-bottom: 50px;
}

button {
  margin-top: 60px;
  padding: 8px;
   background: rgb(60, 16, 38);
   border-radius: 20px;
   color: white;
   border: None;
   font-size: 18px;
}
.extra-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 70%;
}

input {
  font-size: 20px;
  background: none;
  border: None;
  border-bottom:  solid 2px rgb(60, 16, 38);
}
.intro-text {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  padding: 50px;

}
</style>