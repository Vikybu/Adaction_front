<script setup>
import DisplayWaste from './DisplayWaste.vue'
import { onMounted, ref } from 'vue'
import { userStore } from '../stores/userStore'

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

const userName = ref('')

onMounted(async () => {
  userName.value = await getFirstname(userStore.id)
})

const actualDate = new Date()
const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]

const nbMonth = ref(actualDate.getMonth())
const nbYear = ref(actualDate.getFullYear())
const month = ref(months[nbMonth.value])
const year = ref(nbYear.value)

function addAMonth() {
  nbMonth.value++
  if (nbMonth.value > 11) {
    nbMonth.value = 0
    nbYear.value++
  }
  month.value = months[nbMonth.value]
  year.value = nbYear.value
}

function removeAMonth() {
  nbMonth.value--
  if (nbMonth.value < 0) {
    nbMonth.value = 11
    nbYear.value--
  }
  month.value = months[nbMonth.value]
  year.value = nbYear.value
}
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full mt-10 space-y-10 px-6">
    <!-- Titre -->
    <h1 class="text-center text-2xl sm:text-3xl font-semibold text-gray-800">
      Bonjour <span class="text-emerald-700">{{ userName }}</span>
    </h1>

    <!-- Sélecteur de mois -->
    <div
      class="flex items-center justify-between w-full max-w-md bg-emerald-50 px-8 py-5
             rounded-xl shadow-sm border border-emerald-100"
    >
      <button
        @click="removeAMonth"
        class="text-emerald-700 text-3xl font-bold hover:text-emerald-800 transition"
        aria-label="Mois précédent"
      >
        ‹
      </button>

      <p class="text-xl font-medium text-gray-700 text-center">
        {{ month }} {{ year }}
      </p>

      <button
        @click="addAMonth(nbMonth, nbYear)"
        class="text-emerald-700 text-3xl font-bold hover:text-emerald-800 transition"
        aria-label="Mois suivant"
      >
        ›
      </button>
    </div>

    <!-- Contenu (déchets) -->
    <div class="w-full max-w-md">
      <DisplayWaste />
    </div>
  </div>
</template>
