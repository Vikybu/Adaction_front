<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const cities = ref([])
const selectedCity = ref(null)

import { onMounted, ref, watch } from 'vue'

const showModal = ref(false)
const volunteerToDelete = ref(null)
const volunteers = ref([])

function goToCreateVolunteer() {
  router.push('/admin/add')
}

function openModal(volunteer) {
  volunteerToDelete.value = volunteer.id
  showModal.value = true
}
const URL = 'http://localhost:8080'

//Get the city for the select
async function getCities() {
  try {
    const response = await fetch(`${URL}/city/cities`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    cities.value = data
  } catch (error) {
    console.error('Error fetching cities:', error)
  }
}

//Display volunteer from the city
async function getVolunteerByCity(id) {
  try {
    const response = await fetch(`${URL}/volunteer/city/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const dataVolunteerByCity = await response.json()
    volunteers.value = dataVolunteerByCity
  } catch (error) {
    volunteers.value = []
    console.error(error)
  }
}

//Get volunteer informations for the display
async function getVolunteer() {
  const response = await fetch(`${URL}/volunteer/display-with-city`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const database = await response.json()
  return database
}

//Get the list of volunteer for the displayvolunteer
async function fetchVolunteers() {
  volunteers.value = await getVolunteer()
}

onMounted(() => {
  fetchVolunteers()
  getCities()
})

//Delete a volunteer
async function deleteVolunteer() {
  if (!volunteerToDelete.value) return

  try {
    const response = await fetch(`${URL}/volunteer/delete/${volunteerToDelete.value}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    const result = await response.json()
    console.log(result)

    showModal.value = false
    volunteerToDelete.value = null

    fetchVolunteers()
  } catch (error) {
    console.error(error)
  }
}

function handleCityChange(city) {
  console.log('Ville sélectionnée :', city)
  getVolunteerByCity(city.id)
}

watch(selectedCity, (newCity) => {
  if (newCity) {
    handleCityChange(newCity)
  } else {
    fetchVolunteers()
  }
})
</script>

<template>
  <div>
    <button class="btn_add_volunteer" @click="goToCreateVolunteer">
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
      <select v-model="selectedCity" class="city_selector" placeholder="Choisir une ville">
        <option value="">Choisir une ville</option>
        <option v-for="city in cities" :key="city.id" :value="city">
          {{ city.city }}
        </option>
      </select>
    </div>
  </div>

  <div v-for="volunteer in volunteers" :key="volunteer.id" class="div-display-volunteer">
    <div class="div_volunteer_infos">
      <p>{{ volunteer.firstName }}</p>
      <p>{{ volunteer.lastName }}</p>
      <p class="city">{{ volunteer.cityName }}</p>
    </div>

    <div class="div_button">
      <button
        class="btn_modification"
        @click="router.push({ name: 'ModifVolunteer', params: { id: volunteer.id } })"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-pen-icon lucide-pen"
        >
          <path
            d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
          />
        </svg>
      </button>
      <div>
        <button class="btn_delete" @click="openModal(volunteer)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-trash2-icon lucide-trash-2"
          >
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
        <div v-if="showModal" class="modal-overlay">
          <div class="modal-content">
            <p>Êtes-vous sûr de vouloir supprimer ce bénévole ?</p>
            <button @click="deleteVolunteer" class="btn-yes">Oui</button>
            <button @click="showModal = false" class="btn-no">Non</button>
          </div>
        </div>
      </div>
    </div>
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

.div-display-volunteer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 3% auto;
  padding: 20px;
  border: 1px solid rgb(169, 169, 169);
  border-radius: 10px;
  gap: 20px;
}

.div_volunteer_infos {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3%;
}

.div_button {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 20%;
}

.btn_modification {
  color: #1e40af;
  border: none;
  border-radius: 5px;
  border: solid 1px #dbeafe;
  padding: 8px;
  background-color: #dbeafe;
}

.btn_delete {
  color: #b91c1c;
  border: none;
  border-radius: 5px;
  border: solid 1px #fee2e2;
  padding: 8px;
  background-color: #fee2e2;
}

.city {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-left: 5%;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.btn-yes {
  background-color: #e74c3c;
  color: white;
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-no {
  background-color: #95a5a6;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
