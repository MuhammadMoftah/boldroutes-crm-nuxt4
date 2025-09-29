<template>
  <div>
    <aside class="mb-2 flex items-center gap-2">
      <ThemePageTitle text="Projects Overview" />
      <span class="text-sm font-semibold text-slate-500">
        ({{ useProjectsStore().meta.total }})
      </span>
    </aside>
    <!-- <pre dir="ltr" class="text-xs">{{ headers }}</pre> -->
    <EasyDataTable
      :headers="headers"
      hide-footer
      border-cell
      alternating
      :items="items"
      :loading="loading"
      :show-index="showIndex"
      :rows-per-page="rowsPerPage"
    >
      <template v-for="(header, index) in headers" :key="index" #[`item-${header.value}`]="item">
        <slot :name="header.value" v-bind="item">
          {{ getCellValue(header, item) }}
        </slot>
      </template>
    </EasyDataTable>

    <ThemePagination class="py-5" :meta="meta" />
  </div>
</template>

<script lang="ts" setup>
// defineProps(["headers", "items", "loading", "meta", "rowsPerPage"]);
const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: Object,
    default: () => ({}),
  },
  rowsPerPage: {
    type: Number,
    // default: 10,
  },
  showIndex: {
    type: Boolean,
    default: false,
  },
})

const getCellValue = (header, item) => {
  return header.value.split('.').reduce((obj, key) => {
    if (!obj[key]) {
      return '--------'
    }
    return obj[key]
  }, item)
}
</script>

<style scoped>
@reference "tailwindcss";
:deep(.vue3-easy-data-table__main) {
  overflow: unset;
  min-height: unset;
}
:deep(thead th) {
  @apply !bg-slate-100 !font-bold !text-slate-900;
}

:deep(tbody td) {
  @apply !border-red-500 !font-medium !text-slate-700;
}

:deep(thead th:last-of-type) {
  border-right: 1px solid !important;
  @apply !border-slate-200;
}

:deep(tbody td) {
  @apply text-sm font-medium;
}

:deep(tbody td) {
  @apply !border-slate-200;
}

:global(:root) {
  /* --easy-table-border: 2px solid !important; */
}
</style>
