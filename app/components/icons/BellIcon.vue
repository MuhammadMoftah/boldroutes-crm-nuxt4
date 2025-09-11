<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    :class="classes"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13.73 21a2 2 0 01-3.46 0"
    />
  </svg>
</template>

<script lang="ts" setup>
defineProps<{
  classes?: string;
}>();
</script>
