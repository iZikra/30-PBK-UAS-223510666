<template>
  <div class="container">
    <div class="todo-app">
      <h1>Jadwal Kegiatan</h1>
      <div class="controls">
        <button @click="toggleView('todo')" :class="{ active: view === 'todo' }" class="view-button">Todo List</button>
        <button @click="toggleView('post')" :class="{ active: view === 'post' }" class="view-button">Tampilkan Postingan</button>
      </div>
      <div class="list">
        <TodoList v-if="view === 'todo'" />
        <PostList v-else-if="view === 'post'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TodoList from './components/TodoList.vue';
import PostList from './components/PostList.vue';

const view = ref('todo');

function toggleView(selectedView) {
  view.value = selectedView;
}
</script>

<style>
/* Include the main styles here */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.container {
  width: 100%;
  max-width: 700px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.todo-app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.view-button {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.view-button.active {
  background-color: #333;
  color: white;
}

.list {
  flex: 1;
  overflow-y: auto;
}
</style>
