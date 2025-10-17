<template>
  <div class="max-auto mx-auto mt-6 font-sans bg-gray-100">
    <h2 class="text-center text-xl font-semibold mb-1">Fair un don</h2>
    <p class="text-center text-green-600 font-medium mb-4">
      💚 Points collectés : {{ userPoints }}
    </p>
    <div
      v-for="association in assos"
      :key="association.id"
        class="bg-white rounded-2xl shadow p-4 mb-4 border border-gray-200 mx-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-200"
    >
      <div class="flex items-start gap-2">
        <span class="text-2xl mr-2">{{ association.image }}</span>

        <div>
          <h3 class="font-bold text-gray-800">{{ association.name }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ association.description }}</p>
        </div>
      </div>

      <div class="flex items-center justify-between mt-2">
        <p class="text-green-700 font-medium">{{ association.point }} points</p>
        <button
          class="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:bg-gray-300"
          :disabled="userPoints < association.point"
          @click="faireDon(association)"
        >
          🤍 Faire un don
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const userPoints = ref(400)
const assos = ref([])
// Liste des associations récupérée depuis le backend

async function getAsso() {
  try {
    const response = await fetch('http://localhost:8080/association', {
      method: 'GET',
    })
    const data = await response.json()
     console.log('Réponse backend :', data)
    assos.value = data
    return assos
  } catch (err) {
    console.error('Erreur du fetch des viulles :', err)
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

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
