<template>
  <FormLayout
    title="Mon profil"
    :fields="fieldsSignup"
    :functionSubmitted="handleSignup"
    @cancel="handleCancel"
    :button1="svgButtonSave"
    :button2="svgButtonDeconnexion"
  />
</template>

<script setup>
import FormLayout from './FormLayout.vue'

const svgButtonSave = `
  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24'
       fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
    <path d='M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z'/>
    <path d='M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7'/>
    <path d='M7 3v4a1 1 0 0 0 1 1h7'/>
  </svg>
  Mise à jour
`

const svgButtonDeconnexion = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg> Déconnexion`

const handleSignup = (data) => {
  console.log('Formulaire soumis :', data)
}

const handleCancel = () => {
  console.log('Annulation')
}

const fieldsSignup = [
  { nameElement: 'Prénom', formElement: 'firstName', type: 'text' },
  { nameElement: 'Nom', formElement: 'lastName', type: 'text' },
  { nameElement: 'Ville', formElement: 'city_id', type: 'text' },
]
</script>
