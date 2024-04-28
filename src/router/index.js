import AddContactView from '@/views/AddContactView.vue';
import HomeView from '@/views/HomeView.vue';
import ImportContactsView from '@/views/ImportContactsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/import', name: 'Import Contacts', component: ImportContactsView },
  { path: '/add', name: 'Add Invidividual Contact', component: AddContactView },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;