<template>
  <svg
    :width="iconWidth"
    :height="iconHeight"
    viewBox="0 0 10 10"
    :fill="$colorMode.value === 'light' ? light : dark"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.70002 5.29995H1.3C1.1344 5.29995 1 5.16555 1 4.99995C1 4.83435 1.1344 4.69995 1.3 4.69995H8.70002C8.86563 4.69995 9.00002 4.83435 9.00002 4.99995C9.00002 5.16555 8.86563 5.29995 8.70002 5.29995Z"
      stroke-width="0.5"
    />
    <path
      d="M4.9997 9.00002C4.83411 9.00002 4.69971 8.86563 4.69971 8.70002V1.3C4.69971 1.1344 4.83411 1 4.9997 1C5.1653 1 5.2997 1.1344 5.2997 1.3V8.70002C5.2997 8.86563 5.1653 9.00002 4.9997 9.00002Z"
      stroke-width="0.5"
    />
  </svg>
</template>

<script>
export default {
  name: "PlusIcon",
  props: {
    iconWidth: {
      type: String,
      default: "10",
    },
    iconHeight: {
      type: String,
      default: "10",
    },
    light: {
      type: String,
      default: "#1A1919",
    },
    dark: {
      type: String,
      default: "#8D8D8D",
    },
  },
};
</script>

<style scoped>
</style>
