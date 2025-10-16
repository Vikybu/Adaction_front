<script setup>
import { nextTick, ref } from 'vue'
import DisplayVolunteer from './DisplayVolunteer.vue'
import CreateVolunteerCompo from './CreateVolunteerCompo.vue'
import ModifVolunteerCompo from './ModifVolunteerCompo.vue'

const currentView = ref('management')
const formRef = ref(null)

//Change the view
function handleViewChange(newView, volunteerId) {
  currentView.value = newView
  if (newView === 'formModifVolunteer') {
    nextTick(() => {
      if (formRef.value && formRef.value.fillForm) {
        formRef.value.fillForm(volunteerId)
      } else {
        console.warn('formRef ou fillForm non disponible')
      }
    })
  }
}
</script>

<template>
  <div v-if="currentView === 'management'">
    <button class="btn_add_volunteer" @click="currentView = 'formAddVolunteer'">
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
    <div class="div_volunteer_city_filter">
      <input type="text" placeholder="Rechercher un.e bénévole" />
      <select class="city_selector">
        <option>Toutes les villes</option>
      </select>
    </div>

    <DisplayVolunteer @view="handleViewChange" />
  </div>

  <div v-else-if="currentView === 'formAddVolunteer'">
    <CreateVolunteerCompo @viewChange="currentView = $event" @cancel="currentView = 'management'" />
  </div>

  <div v-else-if="currentView === 'formModifVolunteer'">
    <ModifVolunteerCompo
      ref="formRef"
      @viewChange="currentView = $event"
      @cancel="currentView = 'management'"
    />
  </div>
</template>

<style scoped>
.btn_add_volunteer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: 'Helvetica', 'sans-serif';
  color: white;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  height: 50px;
  width: 90%;

  margin: auto;
}

.div_volunteer_city_filter {
  margin-top: 4%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3%;
}

input[type='text'],
select {
  width: 40%;
}
</style>
