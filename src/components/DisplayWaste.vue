<script setup></script>

<template>
  <label class="block mb-2 text-sm font-medium text-gray-600">Type de déchet *</label>

  <div
    v-for="waste in wastes"
    :key="waste.id"
    class="flex items-center justify-between mb-3 border rounded-xl p-3 transition-all duration-300 bg-white hover:shadow-lg hover:-translate-y-1 cursor-pointer"
  >
    <div class="flex items-center gap-3">
      <!-- Image SVG -->
      <img
        :src="waste.icone"
        :alt="`Icône ${waste.name}`"
        class="w-7 h-7"
      />
      <!-- Nom du déchet -->
      <span class="font-medium text-gray-800">{{ waste.name }}</span>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
const wastes = ref([])

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
</script>

<style scoped>
.div_display_waste {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8%;
  border: solid 1px var(--text-secondary);
  border-radius: 10px;
  padding: 4%;
}

svg {
  margin-left: 5%;
}

.waste {
  display: flex;
  flex-direction: column;
}

.waste p {
  margin: 0;
  line-height: 1.5;
}
</style>
