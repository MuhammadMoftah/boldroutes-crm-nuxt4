<template>
  <div class="rounded-lg bg-white p-6 shadow-md">
    <div class="mb-6">
      <ThemePageTitle text="Projects Overview" />
    </div>

    <!-- Search and Filter Controls -->
    <div class="mb-6 flex flex-wrap gap-4">
      <div class="min-w-64 flex-1">
        <input
          v-model="searchValue"
          type="text"
          placeholder="Search projects..."
          class="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div class="flex gap-2">
        <select
          v-model="statusFilter"
          class="rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          v-model="priorityFilter"
          class="rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>

    <!-- Data Table -->
    <EasyDataTable
      :headers="headers"
      :items="filteredItems"
      :rows-per-page="10"
      :rows-per-page-options="[5, 10, 20, 50]"
      :loading="loading"
      alternating
      border-cell
      buttons-pagination
      searchable
      :search-value="searchValue"
      table-class-name="customize-table"
      header-text-direction="left"
      body-text-direction="left"
      show-index
      @click-row="handleRowClick"
    >
      <!-- Custom template for status column -->
      <template #item-status="{ status }">
        <span
          :class="{
            'bg-green-100 text-green-800': status === 'active',
            'bg-blue-100 text-blue-800': status === 'completed',
            'bg-yellow-100 text-yellow-800': status === 'on-hold',
            'bg-red-100 text-red-800': status === 'cancelled',
          }"
          class="rounded-full px-2 py-1 text-xs font-medium capitalize"
        >
          {{ status }}
        </span>
      </template>

      <!-- Custom template for priority column -->
      <template #item-priority="{ priority }">
        <span
          :class="{
            'bg-red-100 text-red-800': priority === 'high',
            'bg-yellow-100 text-yellow-800': priority === 'medium',
            'bg-green-100 text-green-800': priority === 'low',
          }"
          class="rounded-full px-2 py-1 text-xs font-medium capitalize"
        >
          {{ priority }}
        </span>
      </template>

      <!-- Custom template for progress column -->
      <template #item-progress="{ progress }">
        <div class="h-2 w-full rounded-full bg-slate-200">
          <div
            class="h-2 rounded-full bg-blue-600 transition-all duration-300"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <span class="mt-1 text-xs text-slate-600">{{ progress }}%</span>
      </template>

      <!-- Custom template for budget column -->
      <template #item-budget="{ budget }">
        <span class="font-medium text-green-600">${{ budget.toLocaleString() }}</span>
      </template>

      <!-- Custom template for actions column -->
      <template #item-actions="{ id }">
        <div class="flex gap-2">
          <button
            @click.stop="editProject(id)"
            class="rounded bg-blue-500 px-3 py-1 text-xs text-white transition-colors hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            @click.stop="viewProject(id)"
            class="rounded bg-slate-500 px-3 py-1 text-xs text-white transition-colors hover:bg-slate-600"
          >
            View
          </button>
          <button
            @click.stop="deleteProject(id)"
            class="rounded bg-red-500 px-3 py-1 text-xs text-white transition-colors hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </template>
    </EasyDataTable>

    <!-- Summary Stats -->
    <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      <div class="rounded-lg bg-blue-50 p-4">
        <div class="text-2xl font-bold text-blue-600">{{ stats.total }}</div>
        <div class="text-sm text-blue-800">Total Projects</div>
      </div>
      <div class="rounded-lg bg-green-50 p-4">
        <div class="text-2xl font-bold text-green-600">{{ stats.active }}</div>
        <div class="text-sm text-green-800">Active Projects</div>
      </div>
      <div class="rounded-lg bg-yellow-50 p-4">
        <div class="text-2xl font-bold text-yellow-600">{{ stats.completed }}</div>
        <div class="text-sm text-yellow-800">Completed</div>
      </div>
      <div class="rounded-lg bg-purple-50 p-4">
        <div class="text-2xl font-bold text-purple-600">
          ${{ stats.totalBudget.toLocaleString() }}
        </div>
        <div class="text-sm text-purple-800">Total Budget</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

// Loading state
const loading = ref(false)

// Search and filter values
const searchValue = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')

// Define table headers
const headers = [
  {
    text: 'Project Name',
    value: 'name',
    sortable: true,
    width: 200,
  },
  {
    text: 'Client',
    value: 'client',
    sortable: true,
    width: 150,
  },
  {
    text: 'Status',
    value: 'status',
    sortable: true,
    width: 120,
  },
  {
    text: 'Priority',
    value: 'priority',
    sortable: true,
    width: 100,
  },
  {
    text: 'Progress',
    value: 'progress',
    sortable: true,
    width: 150,
  },
  {
    text: 'Budget',
    value: 'budget',
    sortable: true,
    width: 120,
  },
  {
    text: 'Start Date',
    value: 'startDate',
    sortable: true,
    width: 120,
  },
  {
    text: 'End Date',
    value: 'endDate',
    sortable: true,
    width: 120,
  },
  {
    text: 'Team Lead',
    value: 'teamLead',
    sortable: true,
    width: 150,
  },
  {
    text: 'Actions',
    value: 'actions',
    sortable: false,
    width: 150,
  },
]

// Sample project data
const items = ref([
  {
    id: 1,
    name: 'E-commerce Platform Redesign',
    client: 'TechCorp Inc.',
    status: 'active',
    priority: 'high',
    progress: 75,
    budget: 125000,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    teamLead: 'Sarah Johnson',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    client: 'StartupXYZ',
    status: 'active',
    priority: 'medium',
    progress: 45,
    budget: 85000,
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    teamLead: 'Mike Chen',
  },
  {
    id: 3,
    name: 'Data Analytics Dashboard',
    client: 'FinanceCorp',
    status: 'completed',
    priority: 'high',
    progress: 100,
    budget: 95000,
    startDate: '2023-11-01',
    endDate: '2024-01-31',
    teamLead: 'Emily Davis',
  },
  {
    id: 4,
    name: 'Cloud Migration Project',
    client: 'Enterprise Ltd.',
    status: 'on-hold',
    priority: 'medium',
    progress: 30,
    budget: 200000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    teamLead: 'David Wilson',
  },
  {
    id: 5,
    name: 'AI Chatbot Integration',
    client: 'ServiceCo',
    status: 'active',
    priority: 'low',
    progress: 20,
    budget: 45000,
    startDate: '2024-03-01',
    endDate: '2024-07-01',
    teamLead: 'Lisa Anderson',
  },
  {
    id: 6,
    name: 'Security Audit & Compliance',
    client: 'BankCorp',
    status: 'completed',
    priority: 'high',
    progress: 100,
    budget: 150000,
    startDate: '2023-09-01',
    endDate: '2023-12-31',
    teamLead: 'Robert Taylor',
  },
  {
    id: 7,
    name: 'API Gateway Implementation',
    client: 'TechStart',
    status: 'active',
    priority: 'medium',
    progress: 60,
    budget: 75000,
    startDate: '2024-01-15',
    endDate: '2024-05-30',
    teamLead: 'Jennifer Lee',
  },
  {
    id: 8,
    name: 'Legacy System Modernization',
    client: 'OldCorp',
    status: 'cancelled',
    priority: 'low',
    progress: 15,
    budget: 300000,
    startDate: '2023-06-01',
    endDate: '2024-06-01',
    teamLead: 'Michael Brown',
  },
  {
    id: 9,
    name: 'DevOps Pipeline Setup',
    client: 'DevCorp',
    status: 'active',
    priority: 'high',
    progress: 85,
    budget: 60000,
    startDate: '2024-02-15',
    endDate: '2024-04-30',
    teamLead: 'Alex Rodriguez',
  },
  {
    id: 10,
    name: 'Customer Portal Enhancement',
    client: 'RetailMax',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    budget: 110000,
    startDate: '2023-10-01',
    endDate: '2024-01-15',
    teamLead: 'Amanda White',
  },
])

// Computed properties for filtering and stats
const filteredItems = computed(() => {
  let filtered = items.value

  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter((item) => item.status === statusFilter.value)
  }

  // Apply priority filter
  if (priorityFilter.value) {
    filtered = filtered.filter((item) => item.priority === priorityFilter.value)
  }

  return filtered
})

const stats = computed(() => {
  const total = items.value.length
  const active = items.value.filter((item) => item.status === 'active').length
  const completed = items.value.filter((item) => item.status === 'completed').length
  const totalBudget = items.value.reduce((sum, item) => sum + item.budget, 0)

  return {
    total,
    active,
    completed,
    totalBudget,
  }
})

// Event handlers
const handleRowClick = (item: any) => {
  console.log('Row clicked:', item)
  // You can navigate to project details or show a modal
}

const editProject = (id: number) => {
  console.log('Edit project:', id)
  // Implement edit functionality
}

const viewProject = (id: number) => {
  console.log('View project:', id)
  // Implement view functionality
}

const deleteProject = (id: number) => {
  console.log('Delete project:', id)
  // Implement delete functionality with confirmation
  if (confirm('Are you sure you want to delete this project?')) {
    const index = items.value.findIndex((item) => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.customize-table {
  --easy-table-border: 1px solid #e5e7eb;
  --easy-table-row-border: 1px solid #e5e7eb;
  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #374151;
  --easy-table-header-background-color: #f9fafb;
  --easy-table-body-even-row-font-color: #374151;
  --easy-table-body-even-row-background-color: #ffffff;
  --easy-table-body-odd-row-font-color: #374151;
  --easy-table-body-odd-row-background-color: #f9fafb;
  --easy-table-body-row-font-size: 14px;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-hover-font-color: #374151;
  --easy-table-body-row-hover-background-color: #f3f4f6;
  --easy-table-body-scrollbar-track-color: #f1f1f1;
  --easy-table-body-scrollbar-color: #c1c1c1;
  --easy-table-body-scrollbar-thumb-color: #a1a1a1;
  --easy-table-body-scrollbar-corner-color: #f1f1f1;
  --easy-table-border-radius: 8px;
  --easy-table-scrollbar-width: 6px;
  --easy-table-scrollbar-color: #c1c1c1;
  --easy-table-scrollbar-track-color: #f1f1f1;
}
</style>
