<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  pass_word: '',
  city_id: '',
})

function cancelForm() {
  router.push('/admin/dashboard')
}

const URL = 'http://localhost:8080'

//Modification volunteers' information
async function modifyVolunteer(formData) {
  const dataToSend = { ...formData }

  if (!dataToSend.pass_word || dataToSend.pass_word.trim() === '') {
    delete dataToSend.pass_word
  }
  const response = await fetch(`${URL}/volunteer/modify`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  })

  const result = await response.json()
  console.log(result)
  router.push('/admin/dashboard')
  if (result.status === 'success') {
    alert(result.message)
  } else {
    alert(result.message)
  }
}

onMounted(async () => {
  const id = route.params.id
  const response = await fetch(`${URL}/volunteer/infos/${id}`, { method: 'GET' })
  const data = await response.json()
  Object.assign(form.value, data)
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-10 font-sans">
    <!-- Carte du formulaire -->
    <form
      class="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6"
      @submit.prevent="modifyVolunteer(form)"
    >
      <!-- Titre -->
      <h1 class="text-center text-2xl font-semibold text-gray-800">
        Modifier un·e bénévole
      </h1>

      <!-- Champs du formulaire -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="text-gray-700 font-medium mb-1">Prénom</label>
          <input
            v-model="form.firstName"
            type="text"
            placeholder="Prénom"
            class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-700 font-medium mb-1">Nom</label>
          <input
            v-model="form.lastName"
            type="text"
            placeholder="Nom"
            class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-700 font-medium mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="Adresse email"
            class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-700 font-medium mb-1">Mot de passe</label>
          <input
            v-model="form.pass_word"
            type="password"
            placeholder="Mot de passe"
            class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-700 font-medium mb-1">Localisation</label>
          <input
            v-model="form.city_id"
            type="text"
            placeholder="Ville ou commune"
            class="border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Boutons -->
      <div class="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2
                 rounded-lg shadow-md transition-colors duration-200"
        >
          Modifier
        </button>

        <button
          type="button"
          @click="cancelForm"
          class="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2
                 rounded-lg shadow-md transition-colors duration-200"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>
