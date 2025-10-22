<script setup>
import DisplayWaste from './DisplayWaste.vue'
import { onMounted, ref } from 'vue'
import { userStore } from '../stores/userStore'

const wastes = ref([])
const URL = 'http://localhost:8080'

async function getFirstname(userId) {
  const response = await fetch(`${URL}/volunteer/dashboard/userId`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: userId }),
  })
  const dataFirstname = await response.text()
  return dataFirstname
}

async function getWaste(userId, month, year) {
  try {
    const response = await fetch(`http://localhost:8080/waste/${userId}/${month}/${year}`, {
      method: 'GET',
    })
    const data = await response.json()
    wastes.value = data
    console.log(wastes)
    return wastes
  } catch (err) {
    console.error('Erreur du fetch :', err)
  }
}

const userName = ref('')

onMounted(async () => {
  if (!userStore.id) {
    console.error('userStore.id non défini')
    return
  }

  userName.value = await getFirstname(userStore.id)
  getWaste(userStore.id, nbMonth.value + 1, nbYear.value)
})

const actualDate = new Date()
const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

const nbMonth = ref(actualDate.getMonth())
const nbYear = ref(actualDate.getFullYear())
const month = ref(months[nbMonth.value])
const year = ref(nbYear.value)

function addAMonth(userId) {
  nbMonth.value++
  if (nbMonth.value > 11) {
    nbMonth.value = 0
    nbYear.value++
  }
  month.value = months[nbMonth.value]
  year.value = nbYear.value
  getWaste(userId, nbMonth.value + 1, nbYear.value)
}

function removeAMonth(userId) {
  nbMonth.value--
  if (nbMonth.value < 0) {
    nbMonth.value = 11
    nbYear.value--
  }
  month.value = months[nbMonth.value]
  year.value = nbYear.value
  getWaste(userId, nbMonth.value + 1, nbYear.value)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-10 font-sans">
    <!-- Carte du formulaire -->
    <div class="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
      <!-- Titre -->
      <h1 class="text-center font-semibold text-gray-800 mb-5 text-2xl">
        Bonjour <span class="text-emerald-700">{{ userName }}</span>
      </h1>

      <!-- Sélecteur de mois -->
      <div
        class="flex items-center justify-between w-full max-w-md bg-emerald-50 px-8 py-5 rounded-xl shadow-sm border border-emerald-100 text-3xl"
      >
        <button
          @click="removeAMonth(userStore.id)"
          class="text-emerald-700 font-bold hover:text-emerald-800 transition"
          aria-label="Mois précédent"
        >
          ‹
        </button>

        <p class="text-xl font-medium text-gray-700 text-center">{{ month }} {{ year }}</p>

        <button
          @click="addAMonth(userStore.id)"
          class="text-emerald-700 text-3xl font-bold hover:text-emerald-800 transition"
          aria-label="Mois suivant"
        >
          ›
        </button>
      </div>

      <!-- Contenu (déchets) -->
      <div class="w-full max-w-md">
        <label class="block mb-2 text-m mt-3 font-medium text-gray-600 border-gray-300 py-2 pl-5"
          >Type de déchet : </label
        >
      </div>
      <DisplayWaste v-for="waste in wastes" :key="waste.wasteId" :waste="waste" />
    </div>
  </div>
</template>
