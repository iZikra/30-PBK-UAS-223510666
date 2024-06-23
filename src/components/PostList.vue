<template>
  <div>
    <div class="controls">
      <select v-model="selectedUser" class="user-select">
        <option value="">Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
    </div>
    <div class="post-list">
      <div v-for="post in filteredPosts" :key="post.id" class="post-item">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore.js';
import { storeToRefs } from 'pinia';

const postStore = usePostStore();
const { selectedUser, users, filteredPosts } = storeToRefs(postStore);
</script>

<style scoped>
/* Include the relevant styles for the post list here */
h3{
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    unicode-bidi: isolate;
}

.controls {
  margin-bottom: 20px;
}

.user-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.post-list .post-item {
  background: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
}

.post-list .post-item h3 {
  margin-top: 0;
  color: black;
  font-style: italic;
}

.post-list .post-item p {
  margin-bottom: 0;
  color: black;
}
</style>
