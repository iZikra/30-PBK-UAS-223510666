<template>
    <q-layout view="hHh lpR fff">
      <q-header elevated class="bg-black text-white">
        <q-toolbar>
          <q-toolbar-title align="left">Zikrallah Al-Hady WebApp</q-toolbar-title>
        </q-toolbar>
      </q-header>
  
      <q-page-container>
        <div class="container">
          <div class="todo-app">
            <h1><b>Jadwal Kegiatan</b></h1>
            <div class="controls">
              <button @click="toggleView('todo')" :class="{ active: isActive('todo') }" class="view-button">Todo List</button>
              <button @click="toggleView('post')" :class="{ active: isActive('post') }" class="view-button">Tampilkan Postingan</button>
              <button @click="toggleView('albums')" :class="{ active: isActive('albums') }" class="view-button">Albums</button>
            </div>
            <div class="list">
              <router-view />
            </div>
          </div>
        </div>
      </q-page-container>
  
      <q-footer  class="bg-primary text-black" >
        <q-toolbar>
          <q-toolbar-title align="center">
            <div>223510666</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </template>
  
  <script setup>
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  
  const toggleView = (selectedView) => {
    if (selectedView === 'todo') {
      router.push('/todos');
    } else if (selectedView === 'post') {
      router.push('/posts');
    } else if (selectedView === 'albums') {
      router.push('/albums');
    }
  };
  
  const isActive = (view) => {
    return (view === 'todo' && route.path === '/todos') || 
           (view === 'post' && route.path === '/posts') ||
           (view === 'albums' && route.path === '/albums');
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
  }
  
  .container {
    width: 100% !important;
    max-width: 700px !important;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 90vh;
  }
  
  .todo-app {
    display: flex !important;
    flex-direction: column;
    height: 100% !important;
  }
  
  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px !important;
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
    flex: 1 !important;
    overflow-y: auto;
  }
</style>
  