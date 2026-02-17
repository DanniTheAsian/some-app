<script setup>
import { ref } from 'vue'
import { api } from '~/utils/api.js'

console.log(useRuntimeConfig().public.API_BASE_URL)

const identifier = ref('')

const password = ref('')
const message = ref('')
const loading = ref(false)

const login = async () => {
  loading.value = true
  message.value = ''

  try {
    const res = await api('/login', {
      method: 'POST',
      body: {
        identifier: identifier.value,
        password: password.value
      }
    })

    localStorage.setItem('token', res.access_token)

    // 🧪 Test at token virker
    await api('/me')

    await navigateTo('/dashboard')

  } catch (error) {
    console.error('Login error:', error)

    if (error?.data?.detail) {
      message.value = error.data.detail
    } else {
      message.value = 'Forkert brugernavn eller adgangskode'
    }

  } finally {
    loading.value = false
  }
}

</script>

<template>
<div class="wrapper">
  <div class="intro-text">
    <h1>Velkommen til DingDong..<br>Hvor du siger noget – og nogen kan svare-ish</h1>
  
    <p style="margin-top: 20px;">Dette er bare et hyggeprojekt, sååå slå dig løs!</p>
  </div>
  
  <div class="auth-box">
    <div class="extra-wrapper">
    <h2>Her kan du logge ind.. <br>hvis du ikke vidste det :)</h2>
  <form style="display: flex; flex-direction: column; row-gap: 30px;" @submit.prevent="login">

  
    <input 
    v-model="identifier" 
    placeholder="Email eller brugernavn" 
  />

  <input 
    v-model="password" 
    type="password" 
    placeholder="Password" 
  />
  <p v-if="message" class="error-msg">
  {{ message }}
</p>
  <button type="submit" :disabled="loading">
    {{ loading ? 'Logger ind...' : 'Login' }}
  </button>
</form>
    <div style="display: flex; flex-direction: column; gap:10px; margin-top: 40px;">
        <p style="text-align: center;">psssst har du ikke en bruger? </p>
            <NuxtLink class="link-create" to="/register">Opret dig her</NuxtLink>

    </div>
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
  padding: 80px 60px;
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
  row-gap: 20px;
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
  flex-direction: column;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  padding: 50px;

}

.create-user {
  font-size: 15px;
}
.link-create {
  display: flex;
  flex-direction: row;
  border-radius: 50px;
  padding: 5px;
  justify-content: center;
  border: 2px solid rgb(60, 16, 38);
  list-style: None;
  text-decoration: None;

}

.link-create:hover {
  color: white;
  background: rgb(60, 16, 38);
  border: 2px solid rgb(60, 16, 38);
    transition: 0.2s;
}

@media only screen and (max-width:980px) {
  .wrapper {
  display: grid;
  grid-template-columns:  1fr; 
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
  .extra-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    width: 100%;
  }

  h1 {
    font-size: 30px;
  }
  .auth-box {
 
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
  padding: 30px 60px;
  background: hotpink ;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

}


</style>