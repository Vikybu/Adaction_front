<script setup>
import AssociationInfo from './AssociationInfo.vue'

defineProps({
  points: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <h1>Faire un don</h1>
  <p>Points collectés: {{ points }}</p>
  <AssociationInfo />
</template>

<style scoped></style>
