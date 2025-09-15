<template>
  <section>
    <ThemePageTitle text="Projects" />
    <ThemeDataTable />
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'authenticated',
})
</script>

<style></style>
