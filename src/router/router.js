import { createRouter, createWebHistory } from 'vue-router'
import ConnexionCompo from '@/components/ConnexionCompo.vue'
import AdminPage from '@/components/AdminPage.vue'
import VolunteerPage from '@/components/VolunteerPage.vue'

const routes = [
  { path: '/', component: ConnexionCompo },
  { path: '/admin', component: AdminPage },
  { path: '/volunteer', component: VolunteerPage },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
