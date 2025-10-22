<script>
export default {
  name: 'DisplayWaste',
  props: {
    waste: {
      type: Object,
      required: false,
      default: () => ({ icone: '', name: '', total_quantity: 0 }),
    },
  },
}
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between mb-3 border rounded-xl p-3 transition-all duration-300 bg-white hover:shadow-lg hover:-translate-y-1 cursor-pointer border-gray-300 pl-5 pr-1"
    >
      <div class="flex items-center gap-3">
        <img :src="waste.icone" :alt="`Icône ${waste.name}`" class="w-7 h-7" />
        <span class="font-medium text-gray-800">{{ waste.name }}</span>
      </div>
      <p class="text-gray-700 font-semibold mr-2">{{ waste.total_quantity }}</p>
    </div>
  </div>
</template>


<style scoped>
.div_display_waste {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8%;
  border: solid 1px var(--text-secondary);
  border-radius: 10px;
  padding: 4%;
}

svg {
  margin-left: 5%;
}

.waste {
  display: flex;
  flex-direction: column;
}

.waste p {
  margin: 0;
  line-height: 1.5;
}
</style>
