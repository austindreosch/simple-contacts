import HomeView from '@/views/HomeView.vue';
import ImportContactsView from '@/views/ImportContactsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/import', name: 'Import Contacts', component: ImportContactsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;