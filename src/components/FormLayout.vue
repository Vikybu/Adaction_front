<script setup>
const emit = defineEmits(['cancel'])

defineProps({
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
  },
  button1: {
    type: String,
    required: true,
  },
  button2: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1>{{ title }}</h1>
  <form class="form-container">
    <div class="div_input_form" v-for="(field, index) in fields" :key="index">
      <label>
        {{ field.nameElement }} <br />
        <input />
      </label>
    </div>
    <button class="button1" type="submit">{{ button1 }}</button>
    <button @click="emit('cancel')" class="button2" type="button">
      {{ button2 }}
    </button>
  </form>
</template>

<style scoped>
h1 {
  font-size: 1.3rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

input {
  margin-top: 2%;
  border: 1px solid var(--primary-color);
  width: 80%;
  height: 35px;
  outline: none;
  box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.1);
  border-radius: 0.3rem;
  background-color: white;
}

.button1 {
  font-family: 'Helvetica', 'sans-serif';
  color: white;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  height: 50px;
}

.button2 {
  font-family: 'Helvetica', 'sans-serif';
  color: white;
  font-size: 1rem;
  border: 1px solid var(--text-secondary);
  border-radius: 0.5rem;
  background-color: var(--text-secondary);
  height: 50px;
}
</style>
