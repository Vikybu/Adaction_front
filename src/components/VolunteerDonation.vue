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
  <AssociationInfo />
</template>

<style scoped></style>
