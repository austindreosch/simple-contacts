import AboutView from '@/views/AboutView.vue';
import AddContactView from '@/views/AddContactView.vue';
import AuthView from '@/views/AuthView.vue';
import HomeView from '@/views/HomeView.vue';
import ImportContactsView from '@/views/ImportContactsView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/import', name: 'Import Contacts', component: ImportContactsView },
  { path: '/add', name: 'Add Invidividual Contact', component: AddContactView },
  { path: '/auth', name: 'Authenticate User', component: AuthView },
  { path: '/about', name: 'About', component: AboutView },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router;