<script setup>
import MenuCompo from './MenuCompo.vue'
import VolunteerManagement from './VolunteerManagement.vue'

import { menuItemAdmin } from '@/assets/elements'

/*
const currentView = ref('connexion')

const handleChangeView = (view) => {
  currentView.value = view
}
  */
</script>

<template>
  <div class="card-header">
    <MenuCompo
      v-for="item in menuItemAdmin"
      :key="item.id"
      :svg="item.svg"
      :nameElement="item.nameElement"
    />
    <VolunteerManagement />
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
  margin-top: 2%;
}
</style>
