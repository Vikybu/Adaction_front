<script setup>
import MenuCompo from './MenuCompo.vue'
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
  <router-view />
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

.btn_add_volunteer {
  margin: 20px auto;
  display: block;
  font-family: 'Helvetica', sans-serif;
  color: white;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  padding: 10px 20px;
}
</style>
