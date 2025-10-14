<script setup>
import { reactive, watchEffect } from 'vue'
import { reactive, defineExpose } from 'vue'

const emit = defineEmits(['cancel'])

const props = defineProps({
  title: String,
  fields: Array,
  button1: String,
  button2: String,
  functionSubmitted: Function,
})

// Crée dynamiquement le formData selon les fields
const formData = reactive({})

// Dès que les props changent, on (ré)initialise formData
watchEffect(() => {
  props.fields.forEach((field) => {
    if (!(field.formElement in formData)) {
      formData[field.formElement] = ''
    }
  })
  fields: {
    type: Array,
    required: true,
  },
  button1: {
    type: String,
    required: true,
  },
  onButton1Click: { type: Function, required: false },
  button2: {
    type: String,
    required: true,
  },
  functionSubmitted: {
    type: Function,
    required: true,
  },
})

const URL = 'http://localhost:8080'

async function fillForm() {
  const response = await fetch(`${URL}/volunteer/infos`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const database = await response.json()
  console.log(database)
  Object.keys(formData).forEach((key) => {
    if (database[key] !== undefined) {
      formData[key] = database[key]
    }
  })
}

defineExpose({ fillForm })
</script>

<template>
  <h1>{{ title }}</h1>
  <form class="form-container" @submit.prevent="props.functionSubmitted(formData)">
    <div class="div_input_form" v-for="(field, index) in props.fields" :key="index">
      <label>
        {{ field.nameElement }} <br />
        <input v-model="formData[field.formElement]" :type="field.type" />
      </label>
    </div>
    <button
      class="button1"
      type="submit"
      @click="onButton1Click ? onButton1Click() : functionSubmitted(formData)"
    >
      {{ button1 }}
    </button>
    <button @click="emit('cancel')" class="button2" type="button">
      {{ button2 }}
    </button>
  </form>
</template>

<style scoped>
h1 {
  text-align: center;
  padding-top: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem;
}

input {
  margin-top: 2%;
  border: 1px solid var(--primary-color);
  width: 100%;
  height: 35px;
  outline: none;
  box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.1);
  border-radius: 0.3rem;
  background-color: white;
}
.button1,
.button2 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: 'Helvetica', sans-serif;
  font-size: 1rem;
  border-radius: 0.5rem;
  height: 50px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button1 {
  background-color: var(--primary-color);
  color: white;
  border: 1px solid var(--primary-color);
}

.button1:hover {
  background-color: #059669;
}

.button2 {
  background-color: var(--text-secondary);
  color: white;
  border: 1px solid var(--text-secondary);
}

.button2:hover {
  background-color: #4b5563;
}

.button1 svg,
.button2 svg {
  vertical-align: middle;
}

</style>
