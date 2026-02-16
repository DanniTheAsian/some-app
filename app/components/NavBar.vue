<script setup>
import { ref, onMounted } from 'vue'
import CreatePostModal from './CreatePostModal.vue'
import { api } from '~/utils/api.js'


const username = ref('')
const showModal = ref(false)

const fetchMe = async () => {
  try {
    const me = await api('/me')
    username.value = me.username
  } catch (err) {
    console.log("Not logged in")
  } finally {
    loading.value = false
  }
}


const logout = async () => {
  await api('/logout', { method: 'POST', credentials: 'include' })
  await navigateTo('/login')
}

onMounted(fetchMe)
</script>
<template>
    <nav class="navbar">
        <div class="log">DINGDONG</div>

        <div class="name-and-logout-wrapper">
            <div v-if="!loading && username" class="user">
                Velkommen {{ username }}!
            </div>
            <button @click="showModal =true">Opret post</button>
            <button @click="logout">Log ud</button>
        </div>

    <CreatePostModal
      v-if="showModal"
      @close="showModal = false"
      @created="$emit('refresh')"
    />
    </nav>

</template>

<style scoped>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 15px;
        background: rgb(60, 16, 38);
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        border-bottom: hotpink 2px solid;
    }
    .name-and-logout-wrapper {
        display: flex;
        flex-direction: row;
        column-gap: 20px;
        align-items: center;
    }

    button {
        padding: 5px 10px;
        background: hotpink;
        color: rgb(29, 29, 29);
        font-size: 14px;
    }

    button:hover {
         background: rgb(153, 67, 110);
         color:white;
         transition: 0.2s;
    }
</style>