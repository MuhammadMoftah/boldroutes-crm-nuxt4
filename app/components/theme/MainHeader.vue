<template>
  <header class="py-3">
    <div class="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Left Section: Logo and Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink
              to="/"
              class="text-blue-grey-600 nuxt-link-exact-active nuxt-link-active flex cursor-pointer items-center justify-start text-xl font-semibold capitalize"
              aria-current="page"
            >
              <IconsBoldRoutesLogo class="w-40" />
            </NuxtLink>
          </div>

          <!-- Main Navigation -->
          <nav class="hidden items-center text-slate-400 md:flex">
            <NuxtLink
              to="/projects"
              class="px-3 py-2 text-sm font-medium transition-colors hover:text-slate-900"
            >
              Projects
            </NuxtLink>
            <NuxtLink
              to="/leads"
              class="px-3 py-2 text-sm font-medium transition-colors hover:text-slate-900"
            >
              Leads
            </NuxtLink>
            <NuxtLink
              to="/activities"
              class="px-3 py-2 text-sm font-medium transition-colors hover:text-slate-900"
            >
              Activities
            </NuxtLink>
            <NuxtLink
              to="/cils"
              class="px-3 py-2 text-sm font-medium transition-colors hover:text-slate-900"
            >
              CILS
            </NuxtLink>
            <NuxtLink
              to="/deals"
              class="px-3 py-2 text-sm font-medium transition-colors hover:text-slate-900"
            >
              Deals
            </NuxtLink>
          </nav>
        </div>

        <!-- Middle Section: Availability Map and Utility Icons -->
        <div class="flex items-center space-x-4">
          <!-- Availability Map Button -->
          <div class="relative">
            <button
              class="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <IconsLocationPinIcon class="h-4 w-4" />
              <span class="text-sm font-medium">Availability Map</span>
            </button>
            <span
              class="absolute -top-2 -right-2 rounded-full bg-green-500 px-2 py-0.5 text-xs text-white"
            >
              New
            </span>
          </div>

          <!-- Utility Icons -->
          <div class="flex items-center space-x-3">
            <!-- Messages -->
            <button
              class="btn btn-ghost btn-sm rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <IconsEnvelopeIcon class="h-5 w-5" />
            </button>

            <!-- Notifications -->
            <div class="relative">
              <button
                class="btn btn-ghost btn-sm rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <IconsBellIcon class="h-5 w-5" />
              </button>
              <span
                class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                >+99</span
              >
            </div>

            <!-- Rocket -->
            <button
              class="btn btn-ghost btn-sm rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <IconsRocketIcon class="h-5 w-5" />
            </button>

            <!-- Checklist -->
            <button
              class="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <IconsChecklistIcon class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Right Section: User Profile Dropdown -->
        <div class="flex items-center">
          <div class="relative" ref="dropdownRef">
            <button
              @click="toggleDropdown"
              class="flex cursor-pointer items-center space-x-3 rounded-xl border-none bg-slate-100 p-2 duration-300 hover:bg-slate-200"
            >
              <div class="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900">
                <span class="text-xs font-medium text-white">
                  {{ getUserInitials(data.data) }}
                </span>
              </div>
              <div class="text-left">
                <div class="text-xs text-slate-500">Welcome</div>
                <div class="text-sm font-semibold text-slate-600">
                  {{ getUserDisplayName(data.data) }}
                </div>
              </div>
              <IconsChevronDownIcon
                class="h-4 w-4 text-slate-500 transition-transform"
                :class="{ 'rotate-180': isDropdownOpen }"
              />
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg"
            >
              <div class="py-2">
                <NuxtLink
                  to="/account"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Account Information</span>
                </NuxtLink>

                <NuxtLink
                  to="/calendar"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Calendar</span>
                </NuxtLink>

                <NuxtLink
                  to="/todo"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <span>My Todo</span>
                </NuxtLink>

                <NuxtLink
                  to="/lists"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  <span>My Lists</span>
                </NuxtLink>

                <NuxtLink
                  to="/tree"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>My Tree</span>
                </NuxtLink>

                <NuxtLink
                  to="/ecard"
                  class="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span>My E-Card</span>
                </NuxtLink>

                <div class="my-1 border-t border-slate-200"></div>

                <button
                  @click="handleSignOut"
                  class="flex w-full items-center space-x-3 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Auth hook
const { status, data, lastRefreshedAt, token, getSession, signUp, signIn, signOut } = useAuth()

// Dropdown state
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

// Helper function to get user initials
const getUserInitials = (user: any) => {
  if (!user) return 'U'

  const firstName = user.firstName || user.first_name || user.name?.split(' ')[0] || ''
  const lastName = user.lastName || user.last_name || user.name?.split(' ')[1] || ''

  return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U'
}

// Helper function to get user display name
const getUserDisplayName = (user: any) => {
  if (!user) return 'User'

  if (user.name) {
    return user.name.split(' ')[0]
  }
  return user.email?.split('@')[0] || 'User'
}

// Toggle dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Handle sign out
const handleSignOut = async () => {
  try {
    await signOut({ redirect: true, callbackUrl: '/login' })
    useToast().showSuccess('Signed out successfully')
    await navigateTo('/login')
  } catch (error) {
    console.error('Sign out error:', error)
    useToast().errorHandler(new Error('Error signing out'))
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
/* Custom styles for smooth transitions */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Ensure dropdown appears above other content */
.z-50 {
  z-index: 50;
}

/* Smooth hover transitions */
.transition-colors {
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out;
}
@reference "tailwindcss";

.router-link-exact-active,
.router-link-active {
  @apply font-semibold text-slate-700 duration-300;
}
</style>
