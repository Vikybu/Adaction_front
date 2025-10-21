<script setup>
const { svg, nameElement, page } = defineProps({
  svg: {
    type: String,
    required: true,
  },
  nameElement: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    :to="page"
    class="flex flex-col items-center justify-center w-fit
           sm:w-28 md:px-4 px-2 py-2 rounded-lg
           text-gray-600 hover:text-emerald-700 hover:bg-emerald-50
           transition-colors duration-200 mx-1 text-center"
    active-class="text-emerald-700 bg-emerald-100"
  >
    <span v-html="svg" class="w-5 h-5 mb-1"></span>
    <span class="text-sm font-medium">{{ nameElement }}</span>
  </RouterLink>
</template>

<style scoped>
svg {
  stroke: currentColor;
}
</style>
