<script setup>
import MenuCompo from './MenuCompo.vue'
import VolunteerManagement from './VolunteerManagement.vue'

import { menuItemAdmin } from '@/assets/elements'
</script>

<template>
  <div class="card-header">
    <MenuCompo
      v-for="item in menuItemAdmin"
      :key="item.id"
      :svg="item.svg"
      :nameElement="item.nameElement"
    />
  </div>
  <VolunteerManagement />
</template>

<style scoped>
.card-header {
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
