<template>
  <!-- Fond gris sur toute la page -->
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-10 font-sans">
    <!-- Carte du formulaire -->
    <div class="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6">
      <!-- Titre -->
      <h1 class="text-center font-semibold text-gray-800 mb-5 text-lg">
        <span class="inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
          Enregistrer une collecte
        </span>
      </h1>

      <!-- Champ Date -->
      <label class="block mb-1 text-sm font-medium text-gray-600">Date *</label>
      <input
        type="date"
        v-model="date"
        class="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      />

      <!-- Localisation -->
      <label class="block mb-1 text-sm font-medium text-gray-600 border-gray-300">Localisation *</label>
      <div class="flex items-center mb-4 border border-gray-300 rounded-lg px-2 bg-white focus-within:ring-2 focus-within:ring-emerald-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 11c.828 0 1.5-.672 1.5-1.5S12.828 8 12 8s-1.5.672-1.5 1.5S11.172 11 12 11z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 2c4.418 0 8 3.134 8 7 0 4.97-8 13-8 13S4 13.97 4 9c0-3.866 3.582-7 8-7z" />
        </svg>
        <select
          v-model="city"
          class="flex-1 p-2 focus:outline-none bg-transparent text-gray-700"
        >
          <option value="">Sélectionnez une ville</option>
          <option v-for="(c, index) in cityes" :key="index" :value="c">{{ c }}</option>
        </select>
      </div>

      <!-- Type de déchets -->
      <label class="block mb-2 text-sm font-medium text-gray-600 border-gray-300">Type de déchet *</label>

      <div
        v-for="(waste, index) in wastes"
        :key="waste.id"
        class="flex items-center justify-between mb-3 border rounded-xl p-2 hover:bg-gray-50 transition border-gray-300"
      >
        <div class="flex items-center gap-3">
          <img :src="waste.icone" :alt="`Icône ${waste.name}`" class="w-7 h-7" />
          <span class="text-gray-700 text-sm">{{ waste.name }}</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="decrementQuantity(index)"
            :disabled="waste.quantity_waste === 0"
            class="px-2 py-1 border rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 border-gray-300"
          >
            −
          </button>
          <span class="w-6 text-center font-medium text-gray-800">{{ waste.quantity_waste }}</span>
          <button
            @click="incrementQuantity(index)"
            class="px-2 py-1 border rounded-lg text-gray-600 hover:bg-gray-100 border-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <!-- Bouton Enregistrer -->
      <button
        @click="postCollect"
        class="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Enregistrer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const date = ref('')
const city = ref('')
const cityes = ref([])
const wastes = ref([])

async function getCity() {
  try {
    const response = await fetch('http://localhost:8080/city')
    const data = await response.json()
    cityes.value = data
  } catch (err) {
    console.error('Erreur du fetch des villes :', err)
  }
}

async function getWaste() {
  try {
    const response = await fetch('http://localhost:8080/waste')
    const data = await response.json()
    wastes.value = data
  } catch (err) {
    console.error('Erreur du fetch des déchets :', err)
  }
}

onMounted(() => {
  getCity()
  getWaste()
})

function incrementQuantity(index) {
  wastes.value[index].quantity_waste++
}

function decrementQuantity(index) {
  if (wastes.value[index].quantity_waste > 0) wastes.value[index].quantity_waste--
}

async function postCollect() {
  try {
    const wastesMap = {}
    wastes.value.forEach(w => {
      if (w.quantity_waste > 0) wastesMap[w.id] = w.quantity_waste
    })

    const addCollect = {
      created_at: date.value,
      city_id: city.value,
      wasteTypeAndQuantity: wastesMap,
    }

    console.log('Payload envoyé :', addCollect)

    await fetch('http://localhost:8080/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addCollect),
    })
  } catch (err) {
    console.error('Erreur du POST collect :', err)
  }
}
</script>
