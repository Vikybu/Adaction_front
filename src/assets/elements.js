export let menuItemAdmin = [
  {
    svg: `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-sprout-icon lucide-sprout"
      >
        <path
          d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"
        />
        <path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" />
        <path d="M5 21h14" />
      </svg>`,
    nameElement: 'Gestion des bénévoles',
    hrefElement: '#/gestionBene',
  },
  {
    svg: `<svg xmlns="http://www.w3.org/2000/svg"
      width="20" height="20"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-trophy-icon lucide-trophy">
      <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>
      <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>
      <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>
      <path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
      <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>
    </svg>`,
    nameElement: 'Leaderboard',
    hrefElement: '#/leaderboard',
  },
]

export let menuItemVolunteer = [
  {
    svg: `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-sprout-icon lucide-sprout"
      >
        <path
          d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"
        />
        <path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4" />
        <path d="M5 21h14" />
      </svg>`,
    nameElement: 'Dashboard',
    page: '/volunteer/dashboard',
  },
  {
    svg: `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-package-icon lucide-package"
      >
        <path
          d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"
        />
        <path d="M12 22V12" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <path d="m7.5 4.27 9 5.15" />
      </svg>`,
    nameElement: 'Collectes',
    page: '/volunteer/collect',
  },
  {
    svg: `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-heart-icon lucide-heart"
      >
        <path
          d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
        />
      </svg>`,
    nameElement: 'Dons',
    page: '/volunteer/donation',
  },
  {
    svg: `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-user-icon lucide-user"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>`,
    nameElement: 'Profil',
    page: '/volunteer/profile',
  },
]



export let formLayoutCreationVolunteer = [
  { nameElement: 'Prénom', formElement: 'firstName', type: 'text' },
  { nameElement: 'Nom', formElement: 'lastName', type: 'text' },
  { nameElement: 'Email', formElement: 'email', type: 'email' },
  { nameElement: 'Mot de Passe', formElement: 'pass_word', type: 'text' },
  { nameElement: 'Localisation', formElement: 'city_id', type: 'text' },
]

export let formLayoutModificationVolunteer = [
  { nameElement: 'Prénom', formElement: 'firstName', type: 'text' },
  { nameElement: 'Nom', formElement: 'lastName', type: 'text' },
  { nameElement: 'Email', formElement: 'email', type: 'email' },
  { nameElement: 'Mot de Passe', formElement: 'pass_word', type: 'text' },
  { nameElement: 'Localisation', formElement: 'city_id', type: 'text' },
]
