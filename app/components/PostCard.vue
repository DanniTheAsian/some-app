<script setup>
const { post, currentUserId } = defineProps({
  post: Object,
  currentUserId: Number
})

const emit = defineEmits(['deleted'])

const deletePost = async () => {
  await $fetch(`/api/posts/${post.id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  emit('deleted', post.id)
}
</script>

<template>
  <div class="card">
    <h4 class="user">@{{ post.username }}</h4>
    <h3>{{ post.title }}</h3>
    <p>{{ post.content }}</p>
    <small>{{ new Date(post.created_at).toLocaleString() }}</small>

    <button 
      v-if="post.user_id === currentUserId"
      class="delete"
      @click="deletePost"
    >
      Slet
    </button>
  </div>
</template>


<style scoped>
.card {
  background: #ffff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
}
.delete {
  margin-top: 8px;
  background: crimson;
}
</style>
