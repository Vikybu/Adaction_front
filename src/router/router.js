import { createRouter, createWebHistory } from 'vue-router'
import ConnexionCompo from '@/components/ConnexionCompo.vue'
import AdminPage from '@/components/AdminPage.vue'
import VolunteerPage from '@/components/VolunteerPage.vue'
import VolunteerDonation from '@/components/VolunteerDonation.vue'
import VolunteerDashboard from '@/components/VolunteerDashboard.vue'
import VolunteerCollectCompo from '@/components/VolunteerCollectCompo.vue'

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
    ],
  },
  { path: '/volunteer/donation', component: VolunteerDonation },
  { path: '/volunteer/dashboard', component: VolunteerDashboard },

  { path: '/volunteer/collect', component: VolunteerCollectCompo}
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
