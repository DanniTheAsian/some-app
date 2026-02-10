<script setup>
import { ref, onMounted, watch } from 'vue'

const { post, currentUserId } = defineProps({
  post: Object,
  currentUserId: Number
})

const emit = defineEmits(['deleted'])

const likes = ref(0)
const liked = ref(false)
const comments = ref([])
const newComment = ref('')

/* 🔄 Init data når post ændrer sig */
watch(
  () => post,
  async (p) => {
    likes.value = p.likes ?? await fetchLikeCount()
    comments.value = p.comments ?? await fetchComments()
    liked.value = p.liked_by_me ?? false
  },
  { immediate: true }
)

const fetchLikeCount = async () => {
  const res = await $fetch(`/api/likes/count/${post.id}`)
  return res.likes
}

const fetchComments = async () => {
  return await $fetch(`/api/comments/post/${post.id}`)
}

const deletePost = async () => {
  await $fetch(`/api/posts/${post.id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  emit('deleted', post.id)
}

const toggleLike = async () => {
  if (liked.value) {
    await $fetch(`/api/likes/${post.id}`, { method: 'DELETE' })
    likes.value--
  } else {
    await $fetch(`/api/likes/${post.id}`, { method: 'POST' })
    likes.value++
  }
  liked.value = !liked.value
}

const sendComment = async () => {
  if (!newComment.value.trim()) return

  const comment = await $fetch('/api/comments', {
    method: 'POST',
    body: { post_id: post.id, content: newComment.value }
  })

  comments.value.push(comment)
  newComment.value = ''
}
</script>
<template>
  <div class="card">
    <h4 class="user">@{{ post.username }}</h4>
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>
    <small>{{ new Date(post.created_at).toLocaleString() }}</small>

    <div class="actions">
      <button @click="toggleLike">
        {{ liked ? '💔' : '❤️' }} {{ likes }}
      </button>
    </div>

    <div class="comments">
      <div v-for="c in comments" :key="c.id" class="comment">
        <b>@{{ c.username }}</b> {{ c.content }}
      </div>

      <input
        v-model="newComment"
        placeholder="Skriv en kommentar..."
        @keyup.enter="sendComment"
      />
    </div>

    <button 
      v-if="post.user_id === currentUserId"
      class="delete"
      @click="deletePost"
    >
      Slet
    </button>
  </div>
</template>
