<script setup>
import FooterCompo from './components/FooterCompo.vue'
import NavbarCompo from './components/NavbarCompo.vue'

import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (route.path === '/' || route.path === '') {
    router.push('/')
  }
})
</script>

<template>
  <header class="m-0 p-0">
    <NavbarCompo />
  </header>

  <router-view />

  <FooterCompo />
</template>

<style scoped>


body {
  margin: 0;
  padding: 0;
}


</style>
