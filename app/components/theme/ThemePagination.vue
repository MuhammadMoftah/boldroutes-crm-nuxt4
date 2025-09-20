<template>
  <div class="flex justify-center">
    <div class="join">
      <!-- Previous button -->
      <button
        class="join-item btn btn-outline"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Previous
      </button>

      <!-- Page numbers -->
      <template v-for="page in visiblePages" :key="page">
        <button
          v-if="page !== '...'"
          class="join-item btn btn-outline"
          :class="{ 'btn-active': page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <span v-else class="join-item btn btn-disabled">...</span>
      </template>

      <!-- Next button -->
      <button
        class="join-item btn btn-outline"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface PaginationMeta {
  current_page?: number
  last_page?: number
  per_page?: number
  total?: number
  from?: number
  to?: number
}

interface Props {
  meta: PaginationMeta
  class?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  current: [page: number]
}>()

const route = useRoute()
const router = useRouter()

// Computed properties for pagination
const currentPage = computed(() => props.meta.current_page || 1)
const totalPages = computed(() => props.meta.last_page || 1)
const perPage = computed(() => props.meta.per_page || 15)
const total = computed(() => props.meta.total || 0)

// Calculate visible page numbers
const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const current = currentPage.value
  const total = totalPages.value

  if (total <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (current <= 4) {
      // Show first 5 pages + ellipsis + last page
      for (let i = 2; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      // Show first page + ellipsis + last 5 pages
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

// Function to handle page changes
const goToPage = async (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return
  }

  // Update query parameters
  await router.push({
    query: {
      ...route.query,
      page: page.toString(),
    },
  })

  // Emit the current page change event
  emit('current', page)
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>

