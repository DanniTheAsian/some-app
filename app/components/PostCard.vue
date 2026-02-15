<script setup>
import { ref, onMounted, watch } from 'vue'
import { api } from '~/utils/api.js'

const { post, currentUserId } = defineProps({
  post: Object,
  currentUserId: Number
})

const emit = defineEmits(['deleted'])

const likes = ref(0)
const liked = ref(false)
const comments = ref([])
const newComment = ref('')
const showDeleteModal = ref(false)

const fetchLikeCount = async () => {
  const res = await api(`/likes/count/${post.id}`)
  return res.likes
}

const fetchComments = async () => {
  return await api(`/comments/post/${post.id}`)
}

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

const deletePost = async () => {
  await api(`/posts/${post.id}`, {
    method: 'DELETE'
  })
  emit('deleted', post.id)
  showDeleteModal.value = false
}

const confirmDelete = () => {
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

const toggleLike = async () => {
  if (liked.value) {
    await api(`/likes/${post.id}`, { method: 'DELETE' })
    likes.value--
  } else {
    await api(`/likes/${post.id}`, { method: 'POST' })
    likes.value++
  }
  liked.value = !liked.value
}

const sendComment = async () => {
  if (!newComment.value.trim()) return

  const comment = await api('/comments', {
    method: 'POST',
    body: { post_id: post.id, content: newComment.value }
  })

  comments.value.push(comment)
  newComment.value = ''
}
</script>
<template>
  <div class="card">
    <div class="name-section">
      <div style="display: flex; flex-direction: row; gap: 20px;">
        <h4 class="user">@{{ post.username }}<span style="padding-left: 20px;">|</span></h4>
    <small>{{ new Date(post.created_at).toLocaleString() }}</small>
  </div>
  <button 
    v-if="post.user_id === currentUserId"
    class="delete"
    @click="confirmDelete"
  >X
  </button>
  </div>    
     <h3 style="font-size: 32px;">{{ post.title }}</h3>
     
    <p>{{ post.content }}</p>

    <div class="actions">
      <button  style="width: 10%;" @click="toggleLike">
        {{ liked ? '💔' : '❤️' }} {{ likes }}
      </button>
             <input
        v-model="newComment"
        placeholder="Skriv en kommentar..."
        @keyup.enter="sendComment"
      />
    </div>

    <div class="comments">
     
      <div v-for="c in comments" :key="c.id" class="comment">
        <b>@{{ c.username }}</b> {{ c.content }}
      </div>


    </div>

    <!-- Bekræftelsesmodal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Er du sikker?</h3>
        <p>Vil du slette dette indlæg?</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="cancelDelete">Annuller</button>
          <button class="btn-delete" @click="deletePost">Slet</button>
        </div>
      </div>
    </div>


  </div>
</template>


<style>

  h2 {
    margin: 0;
    padding: 0;
  }
  .card {
    background: hotpink;
    border-radius: 20px;
    padding: 20px;
    margin: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .user {
    font-weight: 500;
    font-size: 14px;
  }

  button{
    margin: 0;
    padding: 10px 20px;
    border-radius: 500px;
    
  }

  button:hover {
   background: rgb(166, 65, 116);
   transition: 0.2s;
   color: rgb(60, 16, 38);
}
  .title-delete-post {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  /* Modal stilarter */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    text-align: center;
  }

  .modal h3 {
    margin-top: 0;
    color: #333;
  }

  .modal p {
    color: #666;
    margin-bottom: 20px;
  }

  .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .btn-cancel, .btn-delete {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }

  .btn-cancel {
    background: #ddd;
    color: #333;
  }

  .btn-cancel:hover {
    background: #ccc;
  }

  .btn-delete {
    background: hotpink;
    color: white;
  }

  .btn-delete:hover {
    background: #ff5252;
  }

  .delete{
    font-size: 18px;
    border-radius: 500px;
    background: none;
    padding: 5px 10px;
    color: rgb(60, 16, 38);
  }
  .delete:hover {
    cursor: pointer;
    transition: 0.2s;
  }

  .name-section {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
  }
  .actions {
    display: flex;
    flex-direction: row;
    font-size:15px;
    gap: 20px;
  }
  .actions input {
    font-size: 14px;
  }
  .comment {
    padding: 8px 0;
    border-top: 2px solid rgba(0,0,0,0.1);
  }
  .comment:first-child {
    border-top: none;
  }
</style>