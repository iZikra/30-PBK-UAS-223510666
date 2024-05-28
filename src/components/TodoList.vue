<template>
    <div>
      <div class="controls">
        <input type="text" v-model="newTask" placeholder="Ketik kegiatan">
        <button @click="addTask" class="add-button">ADD</button>
      </div>
      <ul class="task-list">
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
      <button @click="toggleHideCompleted" class="hide-completed-button">{{ hideCompleted ? 'Tampilkan' : 'Sembunyikan' }} Selesai</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const newTask = ref('');
  const tasks = ref([]);
  const hideCompleted = ref(false);
  
  const filteredTodos = computed(() => {
    return hideCompleted.value
      ? tasks.value.filter(task => !task.checked)
      : tasks.value;
  });
  
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
  
  function toggleHideCompleted() {
    hideCompleted.value = !hideCompleted.value;
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
  
  <style scoped>
  /* Include the relevant styles for the todo list here */
  .task-list li.checked span {
    text-decoration: line-through;
    color: white;
    cursor: default;
    background-color: black;
  }
  
  .controls {
    display: flex;
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
  
  .add-button {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    background-color: #333;
    color: white;
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
    gap: 5px;
  }
  
  .edit-button {
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  