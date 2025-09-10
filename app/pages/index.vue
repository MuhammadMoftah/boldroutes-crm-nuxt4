<template>
  <div>welcome {{ data.data.name }}</div>
</template>

<script lang="ts" setup>
const {
  status,
  data,
  lastRefreshedAt,
  token,
  refreshToken,
  getSession,
  signUp,
  signIn,
  signOut,
  refresh,
} = useAuth();
</script>

<style></style>
