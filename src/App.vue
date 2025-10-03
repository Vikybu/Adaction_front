<script setup>
//import { ref, computed } from 'vue'
import MenuCompo from './components/MenuCompo.vue'
import { menuItemVolunteer } from './assets/elements'
//import Collect from './Collect.vue'
//import Donation from './Daonation.vue'
//import Profil from './Profil.vue'

//const currentPath = ref(window.location.hash)

//window.addEventListener('hashchange', () => {
//  currentPath.value = window.location.hash
//})

//const currentView = computed(() => {
//  return routes[currentPath.value.slice(1) || '/'] || NotFound
//})
</script>

<template>
  <div class="card-header">
    <MenuCompo
      v-for="item in menuItemVolunteer"
      :key="item.id"
      :svg="item.svg"
      :menuElement="item.nameElement"
    />
  </div>
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
}
</style>
