<script setup>
import { ref, onMounted } from 'vue'
import PostCard from '../components/PostCard.vue'
import Nav from '../components/NavBar.vue'
import NavBar from '../components/NavBar.vue'
definePageMeta({ middleware: 'auth' })

const email = ref('')
const userId = ref(null)
const posts = ref([])
const loading = ref(true)
const username =ref('')

const newTitle = ref('')
const newContent = ref('')

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
  username.value = me.username
  userId.value = me.id
  await fetchPosts()
  loading.value = false
})
</script>

<template>
  <div v-if="loading">Loading...</div>

  <div v-else>

    <NavBar @refresh="fetchPosts" />

    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :currentUserId="userId"
      @deleted="handleDelete"
    />
  </div>
</template>

