import { createRouter, createWebHistory } from 'vue-router'
import ConnexionCompo from '@/components/ConnexionCompo.vue'
import AdminPage from '@/components/AdminPage.vue'
import VolunteerPage from '@/components/VolunteerPage.vue'
import VolunteerDonation from '@/components/VolunteerDonation.vue'
import VolunteerDashboard from '@/components/VolunteerDashboard.vue'
import VolunteerCollectCompo from '@/components/VolunteerCollectCompo.vue'
import VolunteerManagementVueVolunteer from '@/components/VolunteerManagementVueVolunteer.vue'

const routes = [
  { path: '/', component: ConnexionCompo },
  { path: '/admin', component: AdminPage },
  {
    path: '/volunteer',
    component: VolunteerPage,
    redirect: '/volunteer/dashboard',
    children: [
      { path: 'dashboard', component: VolunteerDashboard },
      { path: 'donation', component: VolunteerDonation },
      { path: 'collect', component: VolunteerCollectCompo},
      { path: 'profile', component: VolunteerManagementVueVolunteer}

    ],
  },

]

export default createRouter({
  history: createWebHistory(),
  routes,
})
