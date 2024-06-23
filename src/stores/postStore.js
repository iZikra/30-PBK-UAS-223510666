import { defineStore } from 'pinia';
import { ref, onMounted, computed } from 'vue';

export const usePostStore = defineStore('post', () => {
  const selectedUser = ref('');
  const users = ref([]);
  const posts = ref([]);

  const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await response.json();
  };

  const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    posts.value = await response.json();
  };

  onMounted(() => {
    fetchUsers();
    fetchPosts();
  });

  const filteredPosts = computed(() => {
    return selectedUser.value ? posts.value.filter(post => post.userId === parseInt(selectedUser.value)) : [];
  });

  return {
    selectedUser,
    users,
    posts,
    filteredPosts
  };
});
