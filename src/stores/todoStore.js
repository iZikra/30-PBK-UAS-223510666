import { defineStore } from 'pinia';
import { ref,computed, onMounted } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  const newTask = ref('');
  const tasks = ref([]);
  const hideCompleted = ref(false);

  const filteredTodos = computed(() => {
    return hideCompleted.value ? tasks.value.filter(task => !task.checked) : tasks.value;
  });

  const addTask = () => {
    if (newTask.value.trim() === '') {
      alert("Isi terlebih dahulu!");
    } else {
      tasks.value.unshift({
        id: Date.now(),
        text: newTask.value,
        checked: false,
        editing: false,
        updatedText: ''
      });
      newTask.value = '';
      saveData();
    }
  };

  const toggleTask = (task) => {
    task.checked = !task.checked;
    saveData();
  };

  const removeTask = (task) => {
    tasks.value = tasks.value.filter(t => t.id !== task.id);
    saveData();
  };

  const editTask = (task) => {
    task.editing = true;
    task.updatedText = task.text;
  };

  const updateTask = (task) => {
    task.text = task.updatedText;
    task.editing = false;
    saveData();
  };

  const toggleHideCompleted = () => {
    hideCompleted.value = !hideCompleted.value;
  };

  const saveData = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  };

  const loadData = () => {
    const savedTasks = localStorage.getItem("tasks");
    tasks.value = savedTasks ? JSON.parse(savedTasks) : [];
  };

  onMounted(loadData);

  return {
    newTask,
    tasks,
    hideCompleted,
    filteredTodos,
    addTask,
    toggleTask,
    removeTask,
    editTask,
    updateTask,
    toggleHideCompleted
  };
});
