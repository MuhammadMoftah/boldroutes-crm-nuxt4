<template>
  <div>theme table ...</div>
</template>

<script lang="ts" setup>
// Define your columns
const columns = [
  {
    label: 'Name',
    field: 'name',
  },
  {
    label: 'Age',
    field: 'age',
    type: 'number',
  },
  {
    label: 'Created On',
    field: 'createdAt',
    type: 'date',
    dateInputFormat: 'yyyy-MM-dd',
    dateOutputFormat: 'MMM do yy',
  },
  {
    label: 'Percent',
    field: 'score',
    type: 'percentage',
  },
]

// Define your data
const rows = [
  { id: 1, name: 'John', age: 20, createdAt: '2023-10-31', score: 0.03343 },
  { id: 2, name: 'Jane', age: 24, createdAt: '2023-10-12', score: 0.03343 },
  { id: 3, name: 'Susan', age: 16, createdAt: '2023-01-23', score: 0.03343 },
  { id: 4, name: 'Chris', age: 55, createdAt: '2023-02-11', score: 0.03343 },
  { id: 5, name: 'Dan', age: 40, createdAt: '2023-02-11', score: 0.03343 },
]
</script>
