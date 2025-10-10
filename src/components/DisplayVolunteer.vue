<script setup>
const emit = defineEmits(['view'])

const props = defineProps({
  database: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div v-for="(item, index) in props.database" :key="index" class="div-display-volunteer">
    <div class="div_volunteer_infos">
      <p>{{ item.firstname }}</p>
      <p>{{ item.lastname }}</p>
      <p class="city">{{ item.city }}</p>
    </div>

    <div class="div_button">
      <button class="btn_modification" @click="emit('view', 'formModifVolunteer')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-pen-icon lucide-pen"
        >
          <path
            d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
          />
        </svg>
      </button>
      <button class="btn_delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-trash2-icon lucide-trash-2"
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.div-display-volunteer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
}

.div_volunteer_infos {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3%;
}

.div_button {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2%;
}

.btn_modification {
  color: blue;
  border: none;
  border-radius: 5px;
}

.btn_delete {
  color: red;
  border: none;
  border-radius: 5px;
}

.city {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-left: 5%;
}
</style>
