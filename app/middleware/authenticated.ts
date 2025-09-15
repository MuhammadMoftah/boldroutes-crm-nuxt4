export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on server
  // if (import.meta.server) return;
  const { status } = useAuth()
  console.log('authenticated middleware working ...')

  if (status.value == 'unauthenticated') {
    return navigateTo('/login')
  }
})
