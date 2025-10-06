<script setup>
defineProps({
  svg: {
    type: String,
    required: true,
  },
  nameElement: {
    type: String,
    required: true,
  },
  hrefElement: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="div_menu_choice">
    <a :href="hrefElement">
      <span v-html="svg"></span>
      {{ nameElement }}
    </a>
  </div>
</template>

<style scoped>
a span {
  vertical-align: middle;
}

a {
  font-size: 1rem;
  font-family: Helvetica, sans-serif;
}

.div_menu_choice :hover {
  color: var(--primary-color);
  cursor: pointer;
  margin-top: 3%;
}
</style>
