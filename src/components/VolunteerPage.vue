<script setup>
import { menuItemVolunteer } from '@/assets/elements'

import MenuCompo from './MenuCompo.vue'
</script>

<template>
  <div class="card-header">
    <MenuCompo
      v-for="item in menuItemVolunteer"
      :key="item.id"
      :svg="item.svg"
      :nameElement="item.nameElement"
      :page="item.page"
    />
  </div>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
.card-header {
  font-size: 0.6rem;
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
