<script setup>
const emit = defineEmits(['view'])

defineProps({
  database: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div v-for="volunteer in database" :key="volunteer.id" class="div-display-volunteer">
    <div class="div_volunteer_infos">
      <p>{{ volunteer.firstName }}</p>
      <p>{{ volunteer.lastName }}</p>
      <p class="city">{{ volunteer.cityName }}</p>
    </div>

    <div class="div_button">
      <button class="btn_modification" @click="emit('view', 'formModifVolunteer')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
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
          width="16"
          height="16"
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 3% auto;
  padding: 20px;
  border: 1px solid rgb(169, 169, 169);
  border-radius: 10px;
  gap: 20px;
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
  gap: 20%;
}

.btn_modification {
  color: #1e40af;
  border: none;
  border-radius: 5px;
  border: solid 1px #dbeafe;
  padding: 8px;
  background-color: #dbeafe;
}

.btn_delete {
  color: #b91c1c;
  border: none;
  border-radius: 5px;
  border: solid 1px #fee2e2;
  padding: 8px;
  background-color: #fee2e2;
}

.city {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-left: 5%;
}
</style>
