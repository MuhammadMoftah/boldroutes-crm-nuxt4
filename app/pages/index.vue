<template>
  <div>welcome {{ data.data.name }}</div>
</template>

<script lang="ts" setup>
const {
  status,
  data,
  lastRefreshedAt,
  token,
  getSession,
  signUp,
  signIn,
  signOut,
} = useAuth();
</script>

<style></style>
