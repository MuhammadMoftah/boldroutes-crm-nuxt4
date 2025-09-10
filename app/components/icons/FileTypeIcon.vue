
<template>
  <!-- pdf  -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    class="iconify iconify--mdi"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
    v-if="type.includes('pdf')"
  >
    <path
      d="M13 9h5.5L13 3.5V9M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m4.1 9.4c-.02.04-.29 1.76-2.1 4.69c0 0-3.5 1.82-2.67 3.18c.67 1.08 2.32-.04 3.74-2.68c0 0 1.82-.64 4.24-.82c0 0 3.86 1.73 4.39-.11c.52-1.86-3.06-1.44-3.7-1.25c0 0-2-1.35-2.5-3.21c0 0 1.14-3.95-.61-3.9c-1.75.05-1.09 3.13-.79 4.1m.81 1.04c.03.01.47 1.21 1.89 2.46c0 0-2.33.46-3.39.9c0 0 1-1.73 1.5-3.36m3.93 2.72c.58-.16 2.33.15 2.26.48c-.06.33-2.26-.48-2.26-.48M7.77 17c-.53 1.24-1.44 2-1.67 2c-.23 0 .7-1.6 1.67-2m3.14-6.93c0-.07-.36-2.2 0-2.15c.54.08 0 2.08 0 2.15z"
      fill="currentColor"
    />
  </svg>

  <!-- word  -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    class="iconify iconify--mdi"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
    v-else-if="type.includes('spreadsheetml.sheet')"
  >
    <path
      fill="currentColor"
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m1.2 18h-1.4L12 13.2L10.2 20H8.8l-2.2-9h1.5l1.4 6.8l1.8-6.8h1.3l1.8 6.8l1.4-6.8h1.5l-2.1 9M13 9V3.5L18.5 9H13Z"
    />
  </svg>

  <!-- excel  -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    class="iconify iconify--mdi"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
    v-else-if="type.includes('wordprocessingml.document')"
  >
    <path
      fill="currentColor"
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m1.8 18H14l-2-3.4l-2 3.4H8.2l2.9-4.5L8.2 11H10l2 3.4l2-3.4h1.8l-2.9 4.5l2.9 4.5M13 9V3.5L18.5 9H13Z"
    />
  </svg>

  <!-- image  -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    class="iconify iconify--mdi"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
    v-else-if="type.includes('image')"
  >
    <path
      fill="currentColor"
      d="m8.5 13.5l2.5 3l3.5-4.5l4.5 6H5m16 1V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Z"
    />
  </svg>

  <!-- plain text  -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    class="iconify iconify--ph"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 256 256"
    v-else-if="type.includes('text/plain')"
  >
    <path
      fill="currentColor"
      d="m213.7 82.3l-56-56A8.1 8.1 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8.1 8.1 0 0 0-2.3-5.7ZM160 176H96a8 8 0 0 1 0-16h64a8 8 0 0 1 0 16Zm0-32H96a8 8 0 0 1 0-16h64a8 8 0 0 1 0 16Zm-8-56V44l44 44Z"
    />
  </svg>

  <!-- other  -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    v-else
  >
    <path
      fill="currentColor"
      d="M11.5 22q-2.3 0-3.9-1.6T6 16.5V6q0-1.65 1.175-2.825Q8.35 2 10 2q1.65 0 2.825 1.175Q14 4.35 14 6v9.5q0 1.05-.725 1.775Q12.55 18 11.5 18q-1.05 0-1.775-.725Q9 16.55 9 15.5V6h1.5v9.5q0 .425.288.712q.287.288.712.288t.713-.288q.287-.287.287-.712V6q0-1.05-.725-1.775Q11.05 3.5 10 3.5q-1.05 0-1.775.725Q7.5 4.95 7.5 6v10.5q0 1.65 1.175 2.825Q9.85 20.5 11.5 20.5q1.65 0 2.825-1.175Q15.5 18.15 15.5 16.5V6H17v10.5q0 2.3-1.6 3.9T11.5 22Z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    type: {
      default: "",
    },
  },
};
</script>