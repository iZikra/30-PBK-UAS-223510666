<template>
  <div class="container">
    <div class="todo-app">
      <h1>Jadwal Kegiatan</h1>
      <div class="controls">
        <input type="text" v-model="newTask" placeholder="Ketik kegiatan">
        <button @click="addTask" class="add-button">ADD</button>
        <button @click="toggleView('todo')" :class="{ active: view === 'todo' }" class="view-button">Todo List</button>
        <button @click="toggleView('post')" :class="{ active: view === 'post' }" class="view-button">Tampilkan Postingan</button>
        <select v-if="view === 'post'" v-model="selectedUser" class="user-select">
          <option value="">Select User</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="list">
        <ul v-if="view === 'todo'" class="task-list">
          <li v-for="task in filteredTodos" :key="task.id" :class="{ checked: task.checked }">
            <span @click="toggleTask(task)">{{ task.text }}</span>
            <input v-if="task.editing" type="text" v-model="task.updatedText">
            <div class="task-buttons">
              <button @click.stop="editTask(task)" v-if="!task.editing" class="edit-button">Edit</button>
              <button @click.stop="updateTask(task)" v-else class="edit-button">Save</button>
              <button @click.stop="removeTask(task)" class="delete-button">Delete</button>
            </div>
          </li>
        </ul>
        <div v-else-if="view === 'post'" class="post-list">
          <div v-for="post in filteredPosts" :key="post.id" class="post-item">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
          </div>
        </div>
      </div>
      <button v-if="view === 'todo'" @click="toggleHideCompleted" class="hide-completed-button">{{ hideCompleted ? 'Tampilkan' : 'Sembunyikan' }} Selesai</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const view = ref('todo');
const selectedUser = ref('');
const users = ref([]);
const newTask = ref('');
const tasks = ref([]);
const hideCompleted = ref(false);

onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  users.value = data;
});

const posts = ref([]);
onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  posts.value = data;
});

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? tasks.value.filter(task => !task.checked)
    : tasks.value;
});

const filteredPosts = computed(() => {
  if (!selectedUser.value) return [];
  return posts.value.filter(post => post.userId === parseInt(selectedUser.value));
});

function toggleView(selectedView) {
  view.value = selectedView;
}

function toggleHideCompleted() {
  hideCompleted.value = !hideCompleted.value;
}

function addTask() {
  if (newTask.value.trim() === '') {
    alert("Isi terlebih dahulu!");
  } else {
    tasks.value.unshift({ id: Date.now(), text: newTask.value, checked: false, editing: false, updatedText: '' });
    newTask.value = '';
    saveData();
  }
}

function toggleTask(task) {
  task.checked = !task.checked;
  saveData();
}

function removeTask(task) {
  const index = tasks.value.findIndex(t => t.id === task.id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
    saveData();
  }
}

function editTask(task) {
  task.editing = true;
  task.updatedText = task.text;
}

function updateTask(task) {
  task.text = task.updatedText;
  task.editing = false;
  saveData();
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

function loadData() {
  const savedTasks = localStorage.getItem("tasks");
  tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
}

loadData();

document.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
</script>

<style>

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

input[type="text"] {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.user-select, .view-button, .add-button {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.view-button {
  background-color: #f0f0f0;
}

.view-button.active, .add-button {
  background-color: #333;
  color: white;
}

.list {
  flex: 1;
  overflow-y: auto;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  background: #f9f9f9;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-list li.checked span {
  text-decoration: line-through;
  color: gray;
  cursor: default;
}

.task-list span {
  cursor: default;
}

.task-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.post-list .post-item {
  background: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
}

.post-list .post-item h3 {
  margin-top: 0;
}

.post-list .post-item p {
  margin-bottom: 0;
}

.hide-completed-button {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.task-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.edit-button,
.delete-button {
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-button {
  background-color: #4CAF50;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
}
</style>
