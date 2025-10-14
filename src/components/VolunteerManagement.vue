<script setup>
import { onMounted, ref } from 'vue'
import DisplayVolunteer from './DisplayVolunteer.vue'
import FormLayout from './FormLayout.vue'

import { formLayoutCreationVolunteer } from '@/assets/elements'

const currentView = ref('management')
const volunteers = ref([])

const URL = 'http://localhost:8080'

async function handleSubmit(formData) {
  const jsonData = JSON.stringify(formData)
  console.log('JSON du formulaire :', jsonData)
  const response = await fetch(`${URL}/volunteer/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonData,
  })

  if (response.status === 200) {
    Object.keys(formData).forEach((key) => {
      formData[key] = key === 'points' ? 0 : ''
    })
    setTimeout(function () {
      alert('Bénévole ajouté avec succès !')
    }, 2000)
    currentView.value = 'management'
  } else {
    console.log('Something went wrong 🤔')
    setTimeout(function () {
      alert(`Le bénévole n' pas pu $etre enregistré !`)
    }, 2000)
  }

  const database = await response.text()
  console.log(database)
}

async function getVolunteer() {
  const response = await fetch(`${URL}/volunteer/display`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const database = await response.json()
  console.log(database)
  return database
}
function handleViewChange(newView) {
  currentView.value = newView
}
async function fetchVolunteers() {
  volunteers.value = await getVolunteer()
  console.log('Volunteers côté front :', volunteers.value)
}

onMounted(() => {
  fetchVolunteers()
})
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

    <DisplayVolunteer :database="volunteers" @view="handleViewChange" />
  </div>

  <div v-else-if="currentView === 'formAddVolunteer'">
    <FormLayout
      :functionSubmitted="handleSubmit"
      :title="'Ajouter un.e bénévole'"
      :fields="formLayoutCreationVolunteer"
      :button1="'Ajouter'"
      :button2="'Annuler'"
      @cancel="currentView = 'management'"
    />
  </div>

  <div v-else-if="currentView === 'formModifVolunteer'">
    <FormLayout
      :functionSubmitted="displayInfos"
      :title="'Modifier un.e bénévole'"
      :fields="formLayoutCreationVolunteer"
      :button1="'Modifier'"
      :onButton1Click="() => fillForm(data)"
      :button2="'Annuler'"
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
