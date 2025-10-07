<script setup>
const emit = defineEmits(['changeView'])

const goToAdmin = () => emit('changeView', 'admin')
const goToVolunteer = () => emit('changeView', 'volunteer')
</script>

<template>
  <div class="btn_connexion">
    <button @click="goToAdmin">Connexion Admin</button>
    <button @click="goToVolunteer">Connexion Bénévole</button>
  </div>
</template>

<style scoped>
.btn_connexion {
  margin-top: 2%;
  display: flex;
  flex-direction: row;
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
}
</style>
