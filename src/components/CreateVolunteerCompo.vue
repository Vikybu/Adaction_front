<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

function cancelForm() {
  router.push('/admin/dashboard')
}

const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  pass_word: '',
  cityName: '',
})

const URL = 'http://localhost:8080'

//Create a new volunteer
async function createVolunteer(form) {
  const jsonData = JSON.stringify(form)
  console.log('JSON du formulaire :', jsonData)
  const response = await fetch(`${URL}/volunteer/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: jsonData,
  })

  if (response.ok) {
    Object.keys(form).forEach((key) => {
      form[key] = key === 'points' ? 0 : ''
    })
    alert('Bénévole ajouté avec succès !')
    router.push('/admin/dashboard')
  } else {
    console.log('Something went wrong')
    alert(`Le bénévole n' pas pu $etre enregistré !`)
  }

  const database = await response.text()
  console.log(database)
}
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-10 font-sans">
    <!-- Carte du formulaire -->
    <form
      class="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6"
      @submit.prevent="createVolunteer(form)"
    >
      <!-- Titre -->
      <h1 class="text-center text-2xl font-semibold text-gray-800">
        Ajouter un·e bénévole
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
            v-model="form.cityName"
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
          Ajouter
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
