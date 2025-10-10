<script setup>
import FooterCompo from './components/FooterCompo.vue'
import NavbarCompo from './components/NavbarCompo.vue'

//import { ref, computed } from 'vue'
//import Collect from './Collect.vue'
//import Donation from './Daonation.vue'
//import Profil from './Profil.vue'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const handleChangeView = (view) => {
  router.push(`/${view}`)
}

onMounted(() => {
  if (route.path === '/' || route.path === '') {
    router.push('/')
  }
})
</script>

<template>
  <header>
    <NavbarCompo />
  </header>

  <router-view @changeView="handleChangeView" />

  <FooterCompo />
</template>

<style scoped>
.card-header {
  font-size: 0.8rem;
  color: var(--text-secondary);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5%;
  margin-top: 2%;
}
</style>
