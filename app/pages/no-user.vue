<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="mb-2 text-4xl font-bold text-gray-800 dark:text-white">
          Welcome to BoldRoutes CRM
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          Your comprehensive customer relationship management solution
        </p>
      </div>

      <!-- Main Content -->
      <div class="mx-auto max-w-4xl">
        <!-- User Status Card -->
        <div class="mb-8 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <div v-if="data?.data" class="text-center">
            <!-- Welcome Message for Logged In User -->
            <div class="mb-6">
              <div
                class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <span class="text-2xl font-bold text-white">
                  {{ getUserInitials(data?.data) }}
                </span>
              </div>
              <h2 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                Welcome back, {{ getUserDisplayName(data?.data) }}! 👋
              </h2>
              <p class="mb-4 text-gray-600 dark:text-gray-300">
                You're successfully logged in and ready to manage your leads and customers.
              </p>
            </div>

            <!-- User Info -->
            <div class="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
              <div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div>
                  <span class="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                  <span class="ml-2 text-gray-600 dark:text-gray-400">{{ data?.data?.email }}</span>
                </div>
                <div v-if="data?.data?.role">
                  <span class="font-medium text-gray-700 dark:text-gray-300">Role:</span>
                  <span class="ml-2 text-gray-600 capitalize dark:text-gray-400">{{
                    data?.data?.role
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="flex flex-wrap justify-center gap-4">
              <NuxtLink
                to="/leads"
                class="btn btn-primary hover:btn-primary-focus transition-all duration-200"
              >
                <IconsUsersIcon class="mr-2 h-5 w-5" />
                Manage Leads
              </NuxtLink>
              <button
                @click="logout"
                class="btn btn-outline hover:btn-outline-focus transition-all duration-200"
              >
                <IconsLogoutIcon class="mr-2 h-5 w-5" />
                Logout
              </button>
            </div>
          </div>

          <!-- No User Logged In -->
          <div v-else class="text-center">
            <div class="mb-6">
              <div
                class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600"
              >
                <IconsUserIcon class="h-10 w-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                No user logged in yet
              </h2>
              <p class="mb-4 text-gray-600 dark:text-gray-300">
                Please log in to access your CRM dashboard and manage your leads.
              </p>
            </div>

            <!-- Login Actions -->
            <div class="flex flex-wrap justify-center gap-4">
              <NuxtLink
                to="/login"
                class="btn btn-primary hover:btn-primary-focus transition-all duration-200"
              >
                <IconsLoginIcon class="mr-2 h-5 w-5" />
                Login to Your Account
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div class="rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-800">
            <IconsChartBarIcon class="mx-auto mb-3 h-8 w-8 text-blue-500" />
            <h3 class="mb-2 font-semibold text-gray-800 dark:text-white">Analytics</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Track your sales performance and customer insights
            </p>
          </div>
          <div class="rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-800">
            <IconsUsersIcon class="mx-auto mb-3 h-8 w-8 text-green-500" />
            <h3 class="mb-2 font-semibold text-gray-800 dark:text-white">Lead Management</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Organize and follow up with your potential customers
            </p>
          </div>
          <div class="rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-800">
            <IconsCogIcon class="mx-auto mb-3 h-8 w-8 text-purple-500" />
            <h3 class="mb-2 font-semibold text-gray-800 dark:text-white">Settings</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Customize your CRM experience and preferences
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'authenticated',
})

const { data } = useAuth()
console.log('auth data =>', data)

// Helper function to get user initials
const getUserInitials = (user: any) => {
  if (!user) return '?'

  const firstName = user.firstName || user.first_name || user.name?.split(' ')[0] || ''
  const lastName = user.lastName || user.last_name || user.name?.split(' ')[1] || ''

  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U'
}

// Helper function to get user display name
const getUserDisplayName = (user: any) => {
  if (!user) return 'User'

  // Try different possible name fields
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`
  }
  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`
  }
  if (user.name) {
    return user.name
  }
  if (user.firstName) {
    return user.firstName
  }
  if (user.first_name) {
    return user.first_name
  }

  return user.email?.split('@')[0] || 'User'
}

// Logout function
const logout = async () => {
  try {
    const { signOut } = useAuth()
    await signOut()
    useToast().showSuccess('Logged out successfully')
    await navigateTo('/login')
  } catch (error) {
    console.error('Logout error:', error)
    useToast().showError('Error logging out')
  }
}
</script>

<style scoped>
/* Custom animations */
.btn {
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  transform: translateY(-1px);
}

/* Gradient text effect */
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Card hover effects */
.bg-white:hover,
.dark\\:bg-gray-800:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .text-4xl {
    font-size: 2rem;
  }

  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>
