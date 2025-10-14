<script setup>
import DisplayWaste from './DisplayWaste.vue'
import { ref } from 'vue'

/*
const URL = 'http://localhost:8080'
async function getFirstname(userId) {
  const response = await fetch(`${URL}/volunteer/dashboard/userId`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: { userId },
  })
  const dataFirstname = await response.json()
  return dataFirstname
}
getFirstname(userId)
*/
let actualDate = new Date()

var arrayMonth = new Array(
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
)

let nbMonth = ref(actualDate.getMonth())
let nbYear = ref(actualDate.getFullYear())

const month = ref(arrayMonth[nbMonth.value])
let year = ref(nbYear.value)

function addAMonth() {
  nbMonth.value++

  if (nbMonth.value > 11) {
    nbMonth.value = 0
    nbYear.value++
  }
  month.value = arrayMonth[nbMonth.value]
  year.value = nbYear.value
}

function removeAMonth() {
  nbMonth.value--

  if (nbMonth.value < 0) {
    nbMonth.value = 11
    nbYear.value--
  }

  month.value = arrayMonth[nbMonth.value]
  year.value = nbYear.value
}
</script>

<template>
  <h1>Bonjour {{ userId }} !</h1>
  <div class="div_date_choice">
    <button @click="removeAMonth">&lt;</button>
    <p>{{ month }} {{ year }}</p>
    <button @click="addAMonth(nbMonth, nbYear)">></button>
  </div>
  <DisplayWaste />
</template>

<style scoped>
h1 {
  font-size: 1.3rem;
  text-align: center;
}

.div_date_choice {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8%;
}

button,
p {
  border: none;
  font-size: 1.2rem;
}
</style>
