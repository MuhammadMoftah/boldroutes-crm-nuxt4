export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on server
  // if (import.meta.server) return;
  const { status } = useAuth()
  console.log('global middleware working ...')

  if (status.value == 'unauthenticated') {
    return navigateTo('/auth/login')
  }
})
