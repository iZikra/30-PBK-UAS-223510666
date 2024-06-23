<template>
    <q-page class="q-pa-xl">
      <q-spinner v-if="isLoading" size="lg" color="primary" />
      <div v-else class="photo-grid">
        <div v-for="photo in photos" :key="photo.id" class="photo-card cursor-pointer" @click="selectPhoto(photo.id)">
          <q-img :src="photo.thumbnailUrl" :alt="photo.title" style="width: 100%; height: auto;" />
          <div class="photo-title">{{ photo.title }}</div>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const photos = ref([]);
  const isLoading = ref(false);
  
  const fetchPhotos = async (albumId = 1) => {
    try {
      isLoading.value = true;
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      const data = await response.json();
      photos.value = data.map((photo) => ({
        id: photo.id,
        thumbnailUrl: photo.thumbnailUrl,
        url: photo.url,
        title: photo.title,
      }));
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const selectPhoto = (photoId) => {
    router.push({ path: `/albums/${photoId}` });
  };
  
  onMounted(() => {
    fetchPhotos();
  });
  </script>
  
  <style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  
  .photo-grid {
    column-count: 4;
    column-gap: 15px;
  }
  
  .photo-card {
    display: inline-block;
    width: 100%;
    margin-bottom: 15px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .photo-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
  
  .photo-title {
    padding: 10px;
    font-size: 1rem;
    text-align: center;
  }
</style>
  