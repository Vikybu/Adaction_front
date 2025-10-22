<template><div class="min-h-screen bg-gray-100 flex justify-center items-start py-10 font-sans">
    <!-- Carte du formulaire -->
    <form
      class="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-6"
      @submit.prevent="modifyVolunteer(form)"
    >
      <!-- Titre -->
      <h1 class="text-center text-2xl font-semibold text-gray-800">
        Modification profil
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

  <button
          type="submit"
          @click="handleSignup"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <span v-html="button1"></span>
          <span>Mise à jour</span>
        </button>

        <button
          type="button"
          @click="handleLogout"
          class="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <span v-html="button2"></span>
          <span>Déconnexion</span>
        </button>

    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/userStore'
import { onMounted, ref} from 'vue'

const router = useRouter()

// Données du formulaire
/* const formData = ref({
  firstName: '',
  lastName: '',
  city_id: '',
}) */

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  pass_word: '',
  city_id: '',
})


// Champs dynamiques
/* const fields = [
  { nameElement: 'Prénom', formElement: 'firstName', type: 'text' },
  { nameElement: 'Nom', formElement: 'lastName', type: 'text' },
  { nameElement: 'Ville', formElement: 'cityName', type: 'text' },
] */
const URL = 'http://localhost:8080'

// Fonction d’envoi
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
  alert("Bénévole modifié avec succès.")
}

async function getInfoVolunteer(id){
  const response = await fetch(`http://localhost:8080/volunteer/infos/${id}`, { method: 'GET' })
  const data = await response.json()
  Object.assign(form.value, data)
}

onMounted(() => {
  getInfoVolunteer(userStore.id)

})

// Déconnexion
const handleLogout = () => {
  userStore.id = null
  router.push('/')
}

// Icônes SVG
const button1 = `
  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'
    fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
    <path d='M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z'/>
    <path d='M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7'/>
    <path d='M7 3v4a1 1 0 0 0 1 1h7'/>
  </svg>
`

const button2 = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m16 17 5-5-5-5"/>
    <path d="M21 12H9"/>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
  </svg>
`
</script>
