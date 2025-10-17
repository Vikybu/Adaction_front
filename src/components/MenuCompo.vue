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
  :to="props.page"
  class="flex flex-col items-center justify-center w-28 px-1.5 py-2 rounded-lg
         text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors duration-200
         mx-1 sm:mx-2 text-center"
  active-class="text-emerald-700 bg-emerald-100"
>
  <span v-html="props.svg" class="w-5 h-5"></span>
  <span class="text-sm font-medium mt-1">{{ props.nameElement }}</span>
</RouterLink>

</template>

<style scoped>
svg {
  stroke: currentColor;
}
</style>
