<template>
  <div>
    <ClientOnly>
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

      <ThemePagination class="py-5" @current="$emit('current', $event)" :meta="meta" />
    </ClientOnly>
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

// const headers = [
//   { text: "PLAYER", value: "player" },
//   { text: "TEAM", value: "team" },
//   { text: "NUMBER", value: "number" },
//   { text: "POSITION", value: "position" },
//   { text: "HEIGHT", value: "indicator.height" },
//   { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true },
//   { text: "LAST ATTENDED", value: "lastAttended", width: 200 },
//   { text: "COUNTRY", value: "country" },
// ];
// const items = ref([
//   {
//     player: "محمد احمد",
//     team: "الاهلي",
//     number: 30,
//     position: "خط وسط",
//     indicator: { height: "6-2", weight: 185 },
//     lastAttended: "اي حاجة",
//     country: "مصر",
//   },
//   {
//     player: "Lebron James",
//     team: "LAL",
//     number: 6,
//     position: "F",
//     indicator: { height: "6-9", weight: 250 },
//     lastAttended: "St. Vincent-St. Mary HS (OH)",
//     country: "USA",
//   },
//   {
//     player: "Kevin Durant",
//     team: "BKN",
//     number: 7,
//     position: "F",
//     indicator: { height: "6-10", weight: 240 },
//     lastAttended: "Texas-Austin",
//     country: "USA",
//   },
//   {
//     player: "Giannis Antetokounmpo",
//     team: "MIL",
//     number: 34,
//     position: "F",
//     indicator: { height: "6-11", weight: 242 },
//     lastAttended: "Filathlitikos",
//     country: "Greece",
//   },
// ]);
</script>

<style scoped>
:deep(.vue3-easy-data-table__main) {
  overflow: unset;
  min-height: unset;
}
:deep(thead th) {
  @apply bg-slate-100 font-bold text-slate-900 !important;
}

:deep(tbody td) {
  @apply !border-red-500 font-medium text-slate-700 !important;
}

:deep(thead th:last-of-type) {
  border-right: 1px solid !important;
  @apply !border-slate-200;
}

:deep(tbody th),
:deep(tbody td) {
  direction: rtl !important;
  text-align: right !important;
}
:deep(tbody td) {
  border-right: 1px solid !important;
  @apply text-sm font-medium;
}

:deep(tbody td) {
  @apply !border-slate-200;
}

:global(:root) {
  /* --easy-table-border: 2px solid !important; */
}
</style>
