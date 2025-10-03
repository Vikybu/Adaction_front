<script setup>
import { ref } from 'vue'
import DisplayVolunteer from './DisplayVolunteer.vue'
import FormLayout from './FormLayout.vue'

import { formLayoutCreationVolunteer } from '@/assets/elements'

const currentView = ref('management')
</script>

<template>
  <div v-if="currentView === 'management'">
    <button @click="currentView = 'form'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-user-plus-icon lucide-user-plus"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" x2="19" y1="8" y2="14" />
        <line x1="22" x2="16" y1="11" y2="11" />
      </svg>
      Ajouter un bénévole
    </button>

    <input type="text" placeholder="Rechercher un.e bénévole" />
    <select>
      <option>Toutes les villes</option>
    </select>

    <DisplayVolunteer />
  </div>

  <div v-else-if="currentView === 'form'">
    <FormLayout
      :title="'Ajouter un.e bénévole'"
      :fields="formLayoutCreationVolunteer"
      :button1="'Ajouter'"
      :button2="'Annuler'"
      @cancel="currentView = 'management'"
    />
  </div>
</template>

<style scoped></style>
