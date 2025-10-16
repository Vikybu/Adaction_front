<script setup>
import { ref, defineExpose } from 'vue'

const emit = defineEmits(['cancel'])

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  pass_word: '',
  city_id: '',
})

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

  if (result.status === 'success') {
    alert(result.message)
    emit('viewChange', 'management')
  } else {
    alert(result.message)
  }
}

//Pré-remplissage des champs du formulaire pour la modification
async function fillForm(id) {
  const response = await fetch(`${URL}/volunteer/infos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id),
  })
  const database = await response.json()
  console.log('Données reçues :', database)
  Object.keys(form.value).forEach((key) => {
    if (database[key] !== undefined) {
      form.value[key] = database[key]
    }
  })
  form.value.id = id
}

defineExpose({ fillForm })
</script>

<template>
  <h1>Modifier un.e bénévole</h1>
  <form class="form-container" @submit.prevent="modifyVolunteer(form)">
    <div class="div_input_form">
      <label>
        Prénom<br />
        <input v-model="form.firstName" type="text" />
      </label>
      <label>
        Nom<br />
        <input v-model="form.lastName" type="text" />
      </label>
      <label>
        Email<br />
        <input v-model="form.email" type="email" />
      </label>
      <label>
        Mot de passe<br />
        <input v-model="form.pass_word" type="text" />
      </label>
      <label>
        Localisation<br />
        <input v-model="form.city_id" type="text" />
      </label>
    </div>
    <button class="button1" type="submit">Modifier</button>
    <button @click="emit('cancel')" class="button2" type="button">Annuler</button>
  </form>
</template>

<style scoped>
h1 {
  text-align: center;
  padding-top: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem;
}

input {
  margin-top: 2%;
  border: 1px solid var(--primary-color);
  width: 100%;
  height: 35px;
  outline: none;
  box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.1);
  border-radius: 0.3rem;
  background-color: white;
}
.button1,
.button2 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Helvetica', sans-serif;
  font-size: 1rem;
  border-radius: 0.5rem;
  height: 50px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button1 {
  background-color: var(--primary-color);
  color: white;
  border: 1px solid var(--primary-color);
}

.button1:hover {
  background-color: #059669;
}

.button2 {
  background-color: var(--text-secondary);
  color: white;
  border: 1px solid var(--text-secondary);
}

.button2:hover {
  background-color: #4b5563;
}

.button1 svg,
.button2 svg {
  vertical-align: middle;
}
</style>
