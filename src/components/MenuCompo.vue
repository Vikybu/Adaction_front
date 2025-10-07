<script setup>
const props = defineProps({
  svg: {
    type: String,
  },
  nameElement: {
    type: String,
  },
  page: {
    type: String,
  },
})
</script>

<template>
  <div class="div_menu_choice">
    <RouterLink :to="props.page" class="menu-link">
      <span v-html="props.svg"></span>
      {{ props.nameElement }}
    </RouterLink>
  </div>
</template>

<style scoped>
a span {
  vertical-align: middle;
}

a {
  display: flex;
  flex-direction: row;
  font-size: 1rem;
  font-family: Helvetica, sans-serif;
}

.div_menu_choice :hover {
  color: var(--primary-color);
  cursor: pointer;
  margin-top: 3%;
}
</style>
