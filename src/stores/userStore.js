import { reactive } from 'vue'

// ✅ store global pour stocker l'ID utilisateur
export const userStore = reactive({
  id: null,
})
