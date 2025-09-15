<template>
  <div>welcome {{ (data as any)?.data?.name || (data as any)?.data?.email || 'User' }}</div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'authenticated',
})

const { data } = useAuth()
</script>

<style></style>
