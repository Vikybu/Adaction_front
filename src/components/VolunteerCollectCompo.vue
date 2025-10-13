<template>
  <div class="max-w-sm mx-auto p-6 bg-white shadow rounded-2xl">
    <!-- Titre -->
    <h1 class="text-center font-semibold text-gray-700 mb-4">
      <span class="inline-flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
        Enregistrer une collecte
      </span>
    </h1>

    <!-- Date -->
    <label class="block mb-2 text-sm font-medium text-gray-600">Date *</label>
    <input
      type="date"
      v-model="date"
      class="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
    />

    <!-- Localisation -->
    <label class="block mb-2 text-sm font-medium text-gray-600">Localisation</label>
    <div class="flex items-center mb-4 border rounded-lg px-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 11c.828 0 1.5-.672 1.5-1.5S12.828 8 12 8s-1.5.672-1.5 1.5S11.172 11 12 11z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 2c4.418 0 8 3.134 8 7 0 4.97-8 13-8 13S4 13.97 4 9c0-3.866 3.582-7 8-7z"
        />
      </svg>
      <select v-model="city" class="flex-1 p-2 focus:outline-none bg-transparent">
        <option value="">Sélectionnez une ville</option>
        <option v-for="(c, index) in cityes" :key="index" :value="c">{{ c }}</option>
      </select>
    </div>

    <!-- Types de déchets -->
  <label class="block mb-2 text-sm font-medium text-gray-600">Type de déchet *</label>
  <div
    v-for="(waste, index) in wastes"
    :key="waste.id"
    class="flex items-center justify-between mb-3 border rounded-lg p-2"
  >
    <div class="flex items-center gap-2">
      <img
        :src="waste.icone"
        :alt="`Icône ${waste.name}`"
        class="w-7 h-7"
      />
      <span>{{ waste.name }}</span>
    </div>
    <div class="flex items-center gap-2">
      <button
        @click="decrementQuantity(index)"
        :disabled="waste.quantity_waste === 0"
        class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
      >
        -
      </button>
      <span class="w-6 text-center">{{ waste.quantity_waste }}</span>
      <button
        @click="incrementQuantity(index)"
        class="px-2 py-1 border rounded hover:bg-gray-100"
      >
        +
      </button>
    </div>
  </div>

    <!-- Bouton -->
    <button
      @click="postCollect"
      class="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      Enregistrer
    </button>
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
    const response = await fetch('http://localhost:8080/city', {
      method: 'GET',
    })
    const data = await response.json()
    console.log('Réponse API city:', data)
    cityes.value = data
    console.log('Réponse brute de l’API city:', data)
    return cityes

  } catch (err) {
    console.error('Erreur du fetch des viulles :', err)
  }
}
onMounted(() => {
  getCity()
})



async function getWaste() {
  try {
    const response = await fetch('http://localhost:8080/waste', {
      method: 'GET',
    })
    const data = await response.json()
    wastes.value = data
    return wastes

  } catch (err) {
    console.error('Erreur du fetch des viulles :', err)
  }
}

onMounted(() => {
  getWaste()
})

function incrementQuantity(index) {
  wastes.value[index].quantity_waste++
}

function decrementQuantity(index) {
  if (wastes.value[index].quantity_waste > 0) {
    wastes.value[index].quantity_waste--
  }
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
  wasteTypeAndQuantity: wastesMap
}

    console.log('Payload envoyé :', addCollect)

    await fetch('http://localhost:8080/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addCollect),
    })
    console.log(addCollect)
  } catch (err) {
    console.error('Erreur du fetch du POST collect :', err)
  }

}

async function test() {
  try {
    const response = await fetch('http://localhost:8080/test', {
      method: 'GET',
    })
    const data = await response.json()
   console.log(data)

  } catch (err) {
    console.error('Erreur du fetch des viulles :', err)
  }
}

onMounted(() => {
  test()
})


</script>
