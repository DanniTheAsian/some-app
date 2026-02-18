<script setup>
import { ref, computed } from 'vue'
import { api } from '~/utils/api.js'
import { useSound } from '@vueuse/sound'
const form = ref({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
})

const message = ref('')
const loading = ref(false)

const { play } = useSound('sounds/361564__matthewwong__ding-dong.wav')
const touched = ref({
    username: false,
    email: false,
    first_name: false,
    last_name: false,
    password: false,
})

const getErrors = computed(() => {
    const f = form.value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const errors = {}
    
    if (String(f.username).trim().length === 0) {
        errors.username = 'Brugernavn er påkrævet'
    }
    if (String(f.first_name).trim().length === 0) {
        errors.first_name = 'Fornavn er påkrævet'
    }
    if (String(f.last_name).trim().length === 0) {
        errors.last_name = 'Efternavn er påkrævet'
    }
    if (String(f.email).trim().length === 0) {
        errors.email = 'Email er påkrævet'
    } else if (!emailRegex.test(String(f.email))) {
        errors.email = 'Email skal indeholde @ og et domæne'
    }
    if (String(f.password).trim().length === 0) {
        errors.password = 'Adgangskode er påkrævet'
    }
    
    return errors
})

const isValid = computed(() => {
    return Object.keys(getErrors.value).length === 0
})

const register = async () => {
  if (!isValid.value) {
    message.value = 'Udfyld alle felter'
    return
  }

  loading.value = true
  message.value = ''

  try {
    await api('/register', {
      method: 'POST',
      body: form.value
    })

    play()

    await api('/login', {
      method: 'POST',
      body: {
        identifier: form.value.email,
        password: form.value.password
      }
    })

    await api('/me')

    await navigateTo('/dashboard')

  } catch (err) {
    console.error('Register error:', err)
    message.value = err?.data?.detail || 'Registration failed'
  } finally {
    loading.value = false
  }
}

</script>

<template>
<div class="wrapper">
  <div class="user-create-wrapper">
    <div>
    <h2 style="text-align: center;">Ey! Få oprettet en sej bruger...eller noget</h2>
    <br>
    <p style="text-align: center;">Det er helt gratis... næsten</p>
    </div>

    <div class="form-group">
        <input v-model="form.username" placeholder="Username" required @blur="touched.username = true"/>
        <p v-if="touched.username && getErrors.username" class="error">{{ getErrors.username }}</p>
    </div>
    <div class="form-group">
        <input v-model="form.first_name" placeholder="First name" required @blur="touched.first_name = true"/>
        <p v-if="touched.first_name && getErrors.first_name" class="error">{{ getErrors.first_name }}</p>
    </div>
    <div class="form-group">
        <input v-model="form.last_name" placeholder="Last name" required @blur="touched.last_name = true"/>
        <p v-if="touched.last_name && getErrors.last_name" class="error">{{ getErrors.last_name }}</p>
    </div>
    <div class="form-group">
        <input v-model="form.email" placeholder="Email" type="email" required @blur="touched.email = true"/>
        <p v-if="touched.email && getErrors.email" class="error">{{ getErrors.email }}</p>
    </div>
    <div class="form-group">
        <input v-model="form.password" type="password" placeholder="Password" required @blur="touched.password = true"/>
        <p v-if="touched.password && getErrors.password" class="error">{{ getErrors.password }}</p>
    </div>

    <div>
        <button @click="register" :disabled="loading || !isValid">
            {{ loading ? 'Opretter...' : 'Opret nu' }}
        </button>
    </div>
    <p>{{ message }}</p>

    <div>
        <p>Vent har du allerede en bruger? </p>
            <a class="link-create" to="/login">login her</a>

    </div>
  </div>
</div>
</template>

<style scoped>
.wrapper {
    font-family: segoe;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;
    margin: 40px;
}

.user-create-wrapper {
    background: hotpink;
    display: flex;
    flex-direction: column;
    width: 60%;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 50px;
    border-radius: 20px;
}

button {
    margin: 0;
    padding: 10px 20px;
    border-radius: 100px;
    cursor: pointer;
    background-color: #333;
    color: white;
    border: none;
    font-weight: bold;
    transition: all 0.3s ease;
}

button:hover:not(:disabled) {
    background-color: #555;
    transform: scale(1.05);
}

button:disabled {
    color: #999;
    cursor: not-allowed;
    opacity: 0.6;
}

.form-group {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.form-group input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.error {
    color: #d32f2f;
    font-size: 12px;
    margin: 4px 0 0 0;
    font-weight: bold;
}

.link-create {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

@media only screen and (max-width:980px) {
    .wrapper {
    font-family: segoe;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 20px;
    
}

.user-create-wrapper {
    background: hotpink;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 50px;
    border-radius: 20px;
}

}
</style>