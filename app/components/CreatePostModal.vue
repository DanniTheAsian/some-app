<script setup>
import { ref } from 'vue'
import { api } from '~/utils/api.js'

const emit = defineEmits(['close', 'created'])

const title = ref('')
const content = ref('')

const createPost = async () => {
  if (!title.value || !content.value) return

  await api('/posts/', {
    method: 'POST',
    body: { title: title.value, content: content.value }
  })

  emit('created')
  emit('close')
}
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal">
      <h2>Opret post</h2>
      <input v-model="title" placeholder="Titel" />
      <textarea v-model="content" placeholder="Skriv noget..." rows="5"></textarea>
      <button @click="createPost">Post</button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  display: flex;
  gap:20px;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
}
textarea {
  width: 100%;
  max-height: 200px;
  resize: none;
  font-family: inherit;
}
</style>
