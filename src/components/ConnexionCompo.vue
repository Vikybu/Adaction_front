<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../stores/userStore'

const router = useRouter()

let dataConnexion = reactive({
  email: '',
  pass_word: '',
})

const URL = 'http://localhost:8080'

async function connexion(dataConnexion) {
  try {
    const response = await fetch(`${URL}/adaction/connexion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      //credentials: 'include', utile lorsqu'on fait du localstorage/cookie a etudier pour prochaine fois
      body: JSON.stringify(dataConnexion),
    })

    if (!response.ok) {
      console.error('Erreur serveur :', response.status, await response.text())
      return
    }
    const result = await response.json()
    userStore.id = result.id

    if (dataConnexion.email === 'admin@admin.fr') {
      router.push('/admin/dashboard')
    } else {
      router.push('/volunteer/dashboard')
    }
  } catch (error) {
    console.error('Erreur fetch :', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start py-10 font-sans">
    <form
      class="w-full max-w-sm bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center gap-6"
      @submit.prevent="connexion(dataConnexion)"
    >
      <!-- Titre -->
      <h1 class="text-2xl font-semibold text-gray-800 text-center">
        Connexion
      </h1>

      <!-- Email -->
      <div class="w-full flex flex-col gap-1">
        <label for="email" class="text-gray-700 font-medium">Email de connexion</label>
        <input
          id="email"
          type="email"
          v-model="dataConnexion.email"
          placeholder="Votre email"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <!-- Mot de passe -->
      <div class="w-full flex flex-col gap-1">
        <label for="password" class="text-gray-700 font-medium">Mot de passe</label>
        <input
          id="password"
          type="password"
          v-model="dataConnexion.pass_word"
          placeholder="Votre mot de passe"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700
                 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <!-- Bouton -->
      <button
        type="submit"
        class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2
               rounded-lg shadow-md transition-colors duration-200"
      >
        Se connecter
      </button>
    </form>
  </div>
</template>

