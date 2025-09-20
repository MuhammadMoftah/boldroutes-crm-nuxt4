<template>
  <section>
    <ThemeDataTable
      :loading="projectsStore.loading"
      :rows-per-page="parseInt(route.query.perPage as string) || 15"
      :items="projectsStore.data"
      :headers="headers"
      :meta="projectsStore.meta"
    >
      <template #item-id="{ id }">
        <span class="badge badge-primary">{{ id }}</span>
      </template>

      <template #status="item">
        <span
          class="grid w-fit place-content-center rounded-[4px] px-3 py-1 text-xs font-semibold capitalize"
          :class="
            item.status == 'active'
              ? 'bg-red-100 text-red-800'
              : item.status == 'completed'
                ? 'bg-green-100 text-green-800'
                : item.status == 'on-hold'
                  ? 'bg-yellow-100 text-yellow-800'
                  : item.status == 'cancelled'
                    ? 'bg-indigo-100 text-indigo-800'
                    : item.status == 'pending'
                      ? 'bg-sky-100 text-sky-800'
                      : item.status == 'cancelled'
                        ? 'bg-cyan-100 text-cyan-800'
                        : 'bg-slate-100 text-slate-800'
          "
        >
          {{ item.status }}
        </span>
      </template>
      <template #item-actions="{ id }">
        <button class="btn btn-primary">View</button>
        <button class="btn btn-primary">Edit</button>
        <button class="btn btn-primary">Delete</button>
        <button class="btn btn-primary">View</button>
        <button class="btn btn-primary">Edit</button>
        <button class="btn btn-primary">Delete</button>
        <button class="btn btn-primary">View</button>
        <button class="btn btn-primary">Edit</button>
        <button class="btn btn-primary">Delete</button>
      </template>
    </ThemeDataTable>
    <!-- <ThemeDataTableExample /> -->
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'authenticated',
})

const projectsStore = useProjectsStore()
const route = useRoute()
const router = useRouter()

// Initialize pagination with default values
const initializePagination = async () => {
  const query = route.query

  // Set default values if not present in URL
  const defaultQuery = {
    page: query.page || '1',
    perPage: query.perPage || '15',
    include: query.include || projectsStore.includes,
  }

  // Update URL with default values if they're missing
  const needsUpdate = !query.page || !query.perPage || !query.include

  if (needsUpdate) {
    await router.replace({
      query: {
        ...route.query,
        ...defaultQuery,
      },
    })
  }
}

// Watch for query parameter changes and refetch data
watch(
  () => route.query,
  async () => {
    await projectsStore.getAll()
  },
  { deep: true }
)

onMounted(async () => {
  await initializePagination()
  await projectsStore.getAll()
})

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Developer', value: 'developer.name' },
  { text: 'Percentage', value: 'percentage' },
  { text: 'Location', value: 'location.name' },
  { text: 'Company', value: 'company.name' },
  { text: 'Status', value: 'status' },
  { text: 'Actions', value: 'actions' },
]
</script>

<style></style>
