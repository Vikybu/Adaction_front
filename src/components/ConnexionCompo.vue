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
      credentials: 'include',
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
  <form class="form_connexion" @submit.prevent="connexion(dataConnexion)">
    <div class="div_connexion">
      <label
        >Email de connexion
        <input type="text" v-model="dataConnexion.email" />
      </label>
      <label>
        Mot de passe
        <input type="password" v-model="dataConnexion.pass_word" />
      </label>
      <button type="submit">Se connecter</button>
    </div>
  </form>
</template>

<style scoped>
.div_connexion {
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5%;
}

button {
  font-family: 'Helvetica', 'sans-serif';
  color: white;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  padding: 1%;
  margin-top: 3%;
}
</style>
