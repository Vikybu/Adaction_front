<template>
  <div class="min-h-screen w-full bg-gray-100 flex justify-center items-start py-10 font-sans">
    <!-- Carte principale -->
    <div class="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 flex flex-col mx-auto">
      <!-- Bouton d'ajout -->
      <button
        @click="goToCreateVolunteer"
        class="flex items-center justify-center gap-2 bg-emerald-600 text-white font-medium rounded-lg py-3 w-full shadow hover:bg-emerald-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-user-plus"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" x2="19" y1="8" y2="14" />
          <line x1="22" x2="16" y1="11" y2="11" />
        </svg>
        Ajouter un·e bénévole
      </button>

      <!-- Barre de recherche + filtre -->
      <div class="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4 w-full">
        <input
          v-model="searchInput"
          type="text"
          placeholder="Rechercher un·e bénévole"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <select
          v-model="selectedCity"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          <option value="">Toutes les villes</option>
          <option v-for="city in cities" :key="city.id" :value="city">{{ city.city }}</option>
        </select>
      </div>

      <!-- Liste des bénévoles -->
      <div v-if="volunteers.length > 0" class="mt-6 w-full flex flex-col gap-4">
        <div
          v-for="volunteer in volunteers"
          :key="volunteer.id"
          class="flex justify-between items-center border border-gray-300 rounded-lg w-full p-4 bg-white shadow-sm hover:shadow-md transition"
        >
          <div class="flex flex-wrap items-center gap-2">
            <p class="font-semibold text-gray-600">{{ volunteer.firstName }}</p>
            <p class="text-gray-700">{{ volunteer.lastName }}</p>
            <p class="text-sm text-gray-500 italic">{{ volunteer.cityName }}</p>
          </div>

          <div class="flex items-center gap-2">
            <button
              class="bg-blue-100 text-blue-800 p-2 rounded-md border border-blue-200 hover:bg-blue-200 transition"
              @click="router.push({ name: 'ModifVolunteer', params: { id: volunteer.id } })"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-pen"
              >
                <path
                  d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                />
              </svg>
            </button>

            <button
              class="bg-red-100 text-red-700 p-2 rounded-md border border-red-200 hover:bg-red-200 transition"
              @click="openModal(volunteer)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-trash-2"
              >
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Aucun bénévole -->
      <p v-else class="text-gray-500 text-sm mt-6 italic text-center">Aucun·e bénévole trouvé·e</p>

      <!-- Modal suppression -->
      <div
        v-if="showModal"
        class="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50"
      >
        <div class="bg-white rounded-lg p-6 shadow-lg text-center w-[90%] max-w-sm">
          <p class="text-gray-800 mb-4">Êtes-vous sûr·e de vouloir supprimer ce·tte bénévole ?</p>
          <div class="flex justify-center gap-4">
            <button
              @click="deleteVolunteer"
              class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Oui
            </button>
            <button
              @click="showModal = false"
              class="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
            >
              Non
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'

const router = useRouter()
const cities = ref([])
const selectedCity = ref(null)
const searchInput = ref('')
const showModal = ref(false)
const volunteerToDelete = ref(null)
const volunteers = ref([])

const URL = 'http://localhost:8080'

function goToCreateVolunteer() {
  router.push('/admin/add')
}

function openModal(volunteer) {
  volunteerToDelete.value = volunteer.id
  showModal.value = true
}

async function getCities() {
  try {
    const response = await fetch(`${URL}/city/cities`)
    cities.value = await response.json()
  } catch (error) {
    console.error('Erreur chargement villes :', error)
  }
}

async function getVolunteer() {
  const response = await fetch(`${URL}/volunteer/display-with-city`)
  return (volunteers.value = await response.json()) //recupere la liste envoyé par le back
}


async function filterVolunteer(letter, cityId) {
  try {
    const urlLetter = letter ?? 'all'
    const urlCity = cityId ?? 'all'
    const response = await fetch(`${URL}/volunteer/filter/${urlLetter}/${urlCity}`)
    volunteers.value = await response.json()
  } catch (error) {
    volunteers.value = []
    console.error(error)
  }
}

async function deleteVolunteer() {
  if (!volunteerToDelete.value) return
  try {
    await fetch(`${URL}/volunteer/delete/${volunteerToDelete.value}`, { method: 'DELETE' })
    showModal.value = false
    volunteerToDelete.value = null
    getVolunteer()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getVolunteer()
  getCities()
})

watch([searchInput, selectedCity], ([newVal, newCity]) => {
  const letter = newVal?.trim() || null
  const cityId = newCity?.id || null
  if (letter || cityId) {
    filterVolunteer(letter, cityId)
  } else {
    getVolunteer()
  }
})
</script>
