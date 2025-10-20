<script setup>
import { onMounted, ref } from 'vue'

const volunteers = ref([])

const URL = 'http://localhost:8080'
async function getTop5Volunteer() {
  const response = await fetch(`${URL}/leaderboard`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json()
  console.log(data)
  volunteers.value = data
  return volunteers
}

onMounted(() => {
  getTop5Volunteer()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-10 font-sans">
    <div class="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 flex flex-col">
      <h1 class="flex items-center justify-center font-semibold text-gray-800 mb-5 text-lg">
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
          class="lucide lucide-trophy-icon lucide-trophy"
        >
          <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
          <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
          <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
          <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
        </svg>
        Leaderboard global
      </h1>
      <div
        v-for="volunteer in volunteers"
        :key="volunteer.id"
        class="flex justify-center items-start font-sans"
      >
        <div class="flex flex-row items-center justify-center mb-3 gap-5">
          <p>{{ volunteer.firstName }}</p>
          <p>{{ volunteer.lastName }}</p>
          <p class="city">Nombre de collecte : {{ volunteer.collect_number }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
