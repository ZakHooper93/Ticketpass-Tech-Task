import { createRouter, createWebHistory } from 'vue-router';
import { EventDetails, HomeView } from '@/components';

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: EventDetails,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
