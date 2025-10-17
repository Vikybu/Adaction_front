<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-2xl font-semibold text-center mb-6 text-gray-800">
        Mon profil
      </h1>

      <form class="space-y-4" @submit.prevent="handleSignup">
        <div v-for="(field, index) in fields" :key="index" class="flex flex-col">
          <label class="text-gray-700 font-medium mb-1">
            {{ field.nameElement }}
          </label>
          <input
            v-model="formData[field.formElement]"
            :type="field.type"
            :placeholder="'Votre ' + field.nameElement.toLowerCase()"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
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
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { userStore } from '@/stores/userStore'
import { reactive } from 'vue'

const router = useRouter()

// Données du formulaire
const formData = reactive({
  firstName: '',
  lastName: '',
  cityName: ''
})

// Champs dynamiques
const fields = [
  { nameElement: 'Prénom', formElement: 'firstName', type: 'text' },
  { nameElement: 'Nom', formElement: 'lastName', type: 'text' },
  { nameElement: 'Ville', formElement: 'cityName', type: 'text' },
]

// Fonction d’envoi
const handleSignup = async () => {
  try {
    const response = await fetch(`http://localhost:8080/volunteer/update/${userStore.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const errText = await response.text()
      throw new Error(`Erreur serveur (${response.status}) : ${errText}`)
    }

    const data = await response.json()
    console.log('Profil mis à jour côté serveur :', data)
    alert('Profil mis à jour avec succès')
  } catch (error) {
    console.error('Erreur :', error)
    alert('Une erreur est survenue : ' + error.message)
  }
}

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
