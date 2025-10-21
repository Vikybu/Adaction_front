<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-10 font-sans">
    <!-- Carte alignée sur le premier composant -->
    <div class="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 flex flex-col mx-auto">

      <!-- Titre -->
      <div class="text-center space-y-1 mb-4">
        <h2 class="text-2xl font-semibold text-gray-800">Faire un don</h2>
        <p class="text-emerald-600 font-medium">
          Points collectés : <span class="font-semibold">{{ userPoints }}</span>
        </p>
      </div>

      <!-- Liste des associations -->
      <div
        v-for="association in assos"
        :key="association.id"
        class="bg-white rounded-xl shadow p-5 border border-gray-200
               transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-200 mb-4"
      >
        <div class="flex items-start gap-3">
          <!-- Icône ou emoji -->
          <span class="text-3xl">{{ association.image }}</span>

          <!-- Infos association -->
          <div class="flex-1">
            <h3 class="font-bold text-gray-800">{{ association.name }}</h3>
            <p class="text-sm text-gray-600 mb-2 leading-snug">
              {{ association.description }}
            </p>
          </div>
        </div>

        <!-- Points & bouton -->
        <div class="flex items-center justify-between mt-4">
          <p class="text-emerald-600 font-medium">
            {{ association.point }} points
          </p>
          <button
            class="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium
                   hover:bg-emerald-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            :disabled="userPoints < association.point"
            @click="faireDon(association)"
          >
            🤍 Faire un don
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const userPoints = ref(400)
const assos = ref([])

// Récupération des associations
async function getAsso() {
  try {
    const response = await fetch('http://localhost:8080/association', { method: 'GET' })
    const data = await response.json()
    console.log('Réponse backend :', data)
    assos.value = data
  } catch (err) {
    console.error('Erreur du fetch des associations :', err)
  }
}

onMounted(() => {
  getAsso()
})

// Gestion du don
function faireDon(association) {
  if (userPoints.value >= association.point) {
    userPoints.value -= association.point
    alert(`Merci pour votre don à ${association.name} 💚`)
  }
}
</script>
