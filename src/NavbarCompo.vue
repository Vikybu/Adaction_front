<template>
  <header class="navbar">
    <div class="logo">
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
        class="lucide lucide-recycle-icon lucide-recycle"
      >
        <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
        <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
        <path d="m14 16-3 3 3 3" />
        <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
        <path
          d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"
        />
        <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
      </svg>
      <span class="title">Adaction</span>
    </div>
    <p class="slogan">Agir pour un environnement plus propre</p>
  </header>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

.navbar {
  background-color: rgb(39, 150, 100);
  color: white;
  padding: 1rem;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding-top: 0.5rem;
}

.title {
  font-weight: bold;
  font-size: 1.2rem;
}

.slogan {
  margin-top: 0.3rem;
  font-size: 0.9rem;
}
</style>
