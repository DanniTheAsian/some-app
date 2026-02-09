<script setup>
import { ref, onMounted } from 'vue'
import PostCard from '../components/PostCard.vue'

definePageMeta({ middleware: 'auth' })

const email = ref('')
const userId = ref(null)
const posts = ref([])
const loading = ref(true)

const newTitle = ref('')
const newContent = ref('')

const logout = async () => {
  await $fetch('/api/logout', {
    method: 'POST',
    credentials: 'include'
  })
  await navigateTo('/login')
}

const fetchPosts = async () => {
  posts.value = await $fetch('/api/posts', {
    credentials: 'include'
  })
}

const createPost = async () => {
  if (!newTitle.value || !newContent.value) return

  await $fetch('/api/posts', {
    method: 'POST',
    body: {
      title: newTitle.value,
      content: newContent.value
    },
    credentials: 'include'
  })

  newTitle.value = ''
  newContent.value = ''
  await fetchPosts()
}

const handleDelete = (id) => {
  posts.value = posts.value.filter(p => p.id !== id)
}

onMounted(async () => {
  const me = await $fetch('/api/me', { credentials: 'include' })
  email.value = me.email
  userId.value = me.id
  await fetchPosts()
  loading.value = false
})
</script>

<template>
  <div v-if="loading">Loading...</div>

  <div v-else>
    <div class="topbar">
      <h1>Velkommen {{ email }}</h1>
      <button class="logout" @click="logout">Log ud</button>
    </div>

    <div class="create">
      <input v-model="newTitle" placeholder="Titel" />
      <textarea v-model="newContent" placeholder="Skriv noget..." />
      <button @click="createPost">Post</button>
    </div>

    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :currentUserId="userId"
      @deleted="handleDelete"
    />
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout {
  background: #444;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
}

.create {
  margin: 20px 0;
}
</style>
