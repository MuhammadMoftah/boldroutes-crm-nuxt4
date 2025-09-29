<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-300 ease-in"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-black opacity-70 backdrop-blur-sm"
        @click="closeDrawer"
      ></div>
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div v-if="isOpen" class="fixed top-0 right-0 z-50 h-full w-96 bg-white shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-300 p-3">
          <h3 class="text-lg font-semibold text-slate-800">Drawer Title</h3>
          <button
            @click="closeDrawer"
            class="text-slate-400 transition-colors hover:text-slate-600"
          >
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="overflow-auto p-4">
          <p class="text-slate-600">This is the drawer content. You can put any content here.</p>

          <!-- Example content -->
          <div class="mt-4 space-y-3 bg-red-100">
            <div class="rounded-lg bg-slate-50 p-3">
              <h4 class="font-medium text-slate-900">Item 1</h4>
              <p class="text-sm text-slate-600">Description for item 1</p>
            </div>
            <div class="rounded-lg bg-slate-50 p-3" v-for="i in 15" :key="i">
              <h4 class="font-medium text-slate-900">Item 2</h4>
              <p class="text-sm text-slate-600">Description for item 2</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="absolute right-0 bottom-0 left-0 border-t border-slate-300 bg-white p-4">
          <div class="flex">
            <!-- <button @click="closeDrawer" class="btn btn-ghost w-full">Cancel</button> -->
            <button @click="handleSave" class="theme-btn btn w-full">Save</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
const globalStore = useGlobalStore()

const isOpen = computed(() => globalStore.drawer === 'global-drawer')

// Prevent body scroll when drawer is open
watch(isOpen, (newValue) => {
  if (typeof window !== 'undefined') {
    if (newValue) {
      // Store current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.body.style.overflow = ''
  }
})

const closeDrawer = () => {
  globalStore.drawer = ''
}

const handleSave = () => {
  // Add your save logic here
  console.log('Save clicked')
  closeDrawer()
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
