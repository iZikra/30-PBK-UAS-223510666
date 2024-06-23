import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layout/MainLayout.vue';
import TodoList from '../components/TodoList.vue';
import PostList from '../components/PostList.vue';
import Albums from '../components/Albums.vue';
import AlbumDetail from '../components/AlbumDetail.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        redirect: '/todos'
      },
      {
        path: 'todos',
        component: TodoList
      },
      {
        path: 'posts',
        component: PostList
      },
      {
        path: 'albums',
        component: Albums
      },
      {
        path: 'albums/:photoId',
        component: AlbumDetail
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
