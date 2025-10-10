<script setup>
defineProps({
  titleAssociation: {
    type: String,
    required: true,
  },
  descriptionAssociation: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div>
    <div class="div_info_association">
      <h2>{{ titleAssociation }}</h2>
      <p>{{ descriptionAssociation }}</p>
    </div>

    <hr />

    <div class="div_donate">
      <p>100 points</p>
      <button>Faire un don</button>
    </div>
  </div>
</template>

<style scoped></style>
