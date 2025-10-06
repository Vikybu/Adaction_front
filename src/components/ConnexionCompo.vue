<script setup>
const emit = defineEmits(['changeView'])

const goToAdmin = () => emit('changeView', 'admin')
const goToVolunteer = () => emit('changeView', 'volunteer')
</script>

<template>
  <button @click="goToAdmin">Connexion Admin</button>
  <button @click="goToVolunteer">Connexion Bénévole</button>
</template>

<style scoped></style>
