<script setup>
import FooterCompo from './FooterCompo.vue'
import NavbarCompo from './NavbarCompo.vue'
import MenuCompo from './components/MenuCompo.vue'

//import { ref, computed } from 'vue'

//import { menuItemVolunteer } from './assets/elements'
import { menuItemAdmin } from './assets/elements'

import VolunteerManagement from './components/VolunteerManagement.vue'
import ConnexionCompo from './components/ConnexionCompo.vue'
</script>

<template>
  <header>
    <NavbarCompo />
  </header>
  <ConnexionCompo />
  <div class="card-header">
    <MenuCompo
      v-for="item in menuItemAdmin"
      :key="item.id"
      :svg="item.svg"
      :nameElement="item.nameElement"
    />
  </div>
  <VolunteerManagement />

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
