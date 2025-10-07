<script setup></script>

<template>
  <div class="div_display_waste">
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
      class="lucide lucide-cigarette-icon lucide-cigarette"
    >
      <path d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14" />
      <path d="M18 8c0-2.5-2-2.5-2-5" />
      <path d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M22 8c0-2.5-2-2.5-2-5" />
      <path d="M7 12v4" />
    </svg>
    <div class="waste">
      <p>Mégots de cigarette</p>
      <p>0 collecte</p>
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
