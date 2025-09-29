<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" :for="selectId" class="mb-1 block text-sm font-medium text-slate-700">
      {{ label }}
      <span v-if="required" class="ms-1 text-red-500">*</span>
    </label>

    <!-- Select Container -->
    <div class="relative">
      <!-- Multi-select Display -->
      <div
        v-if="multi"
        :class="selectClasses"
        @click="toggleDropdown"
        @keydown.enter="toggleDropdown"
        @keydown.space.prevent="toggleDropdown"
        tabindex="0"
        role="combobox"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
      >
        <!-- Selected Items Display -->
        <div class="flex flex-wrap gap-1">
          <span
            v-for="(item, index) in selectedItems"
            :key="getItemValue(item)"
            class="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
          >
            {{ getItemLabel(item) }}
            <button
              type="button"
              @click.stop="removeItem(item)"
              class="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-600"
            >
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
          <span v-if="selectedItems.length === 0" class="text-slate-400">
            {{ placeholder }}
          </span>
        </div>

        <!-- Dropdown Arrow -->
        <div class="ml-auto flex-shrink-0">
          <svg
            class="h-5 w-5 text-slate-400 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <!-- Single Select Display -->
      <div
        v-else
        :class="selectClasses"
        @click="toggleDropdown"
        @keydown.enter="toggleDropdown"
        @keydown.space.prevent="toggleDropdown"
        tabindex="0"
        role="combobox"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
      >
        <span :class="displayTextClasses">
          {{ displayText }}
        </span>

        <!-- Dropdown Arrow -->
        <div class="ml-auto flex-shrink-0">
          <svg
            class="h-5 w-5 text-slate-400 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <!-- Dropdown Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isOpen"
          class="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg"
          role="listbox"
        >
          <!-- Search Input (if enabled) -->
          <div v-if="searchable" class="border-b border-slate-200 p-2">
            <div class="relative">
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none"
                @click.stop
              />
              <!-- Loading indicator -->
              <div v-if="loading" class="absolute top-1/2 right-3 -translate-y-1/2">
                <svg class="h-4 w-4 animate-spin text-slate-400" fill="none" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Options List -->
          <div class="max-h-60 overflow-auto">
            <label
              v-for="(option, index) in filteredOptions"
              :key="getItemValue(option)"
              :class="optionClasses(option)"
              @click="selectOption(option)"
              @keydown.enter="selectOption(option)"
              @keydown.space.prevent="selectOption(option)"
              tabindex="0"
              role="option"
              :aria-preferred="isSelected(option?.id)"
              :for="`#${option?.id}`"
            >
              <!-- Checkbox for multi-select -->
              <div v-if="multi" class="mr-3 flex-shrink-0">
                <input
                  :id="option[optionValue]"
                  type="checkbox"
                  :checked="isSelected(option)"
                  :value="option[optionValue]"
                  class="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
                  @click.stop
                  @change="handleCheckboxChange(option.id, $event)"
                />
              </div>

              <!-- Option Label -->
              <span class="block truncate">{{ getItemLabel(option) }}</span>
            </label>

            <!-- Loading State -->
            <div
              v-if="loading && filteredOptions.length === 0"
              class="px-4 py-3 text-center text-sm text-slate-500"
            >
              Loading...
            </div>

            <!-- No Options Message -->
            <div v-else-if="filteredOptions.length === 0" class="px-4 py-3 text-sm text-slate-500">
              {{ url && searchQuery ? 'No options found for your search' : 'No options available' }}
            </div>
          </div>
        </div>
      </Transition>

      <!-- Error Message -->
      <div v-if="error" class="mt-1 text-sm text-red-600">
        {{ error }}
      </div>

      <!-- Help Text -->
      <div v-if="helpText && !error" class="mt-1 text-sm text-slate-500">
        {{ helpText }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

// Types
interface SelectOption {
  [key: string]: any
}

interface ApiResponse {
  data?: any[]
  [key: string]: any
}

// Props Interface
interface Props {
  modelValue?: any
  multi?: boolean
  label?: string
  url?: string
  placeholder?: string
  options?: (SelectOption | string)[]
  optionLabel?: string
  optionValue?: string
  required?: boolean
  disabled?: boolean
  error?: string
  helpText?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined'
  searchable?: boolean
  clearable?: boolean
  searchField?: string // Field to search by (defaults to 'name')
  debounceMs?: number // Debounce delay in milliseconds
}

// Emits Interface
interface Emits {
  'update:modelValue': [value: any]
  change: [value: any]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  load: [data: any[]]
  error: [error: any]
}

const props = withDefaults(defineProps<Props>(), {
  multi: true,
  placeholder: 'Select an option...',
  options: () => [],
  optionLabel: 'name',
  optionValue: 'id',
  size: 'md',
  variant: 'default',
  searchable: true,
  clearable: false,
  searchField: 'name',
  debounceMs: 300,
})

const emit = defineEmits<Emits>()

// Reactive state
const isOpen = ref(false)
const searchQuery = ref('')
const selectId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)
const searchInput = ref<HTMLInputElement>()
const loading = ref(false)
const localOptions = ref<(SelectOption | string)[]>([])
const debounceTimer = ref<number | null>(null)

// Computed properties
const selectClasses = computed(() => {
  const baseClasses = [
    'relative flex w-full cursor-pointer items-center rounded-lg border transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500',
    'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-2.5 text-sm min-h-[40px]',
    lg: 'px-4 py-3 text-base min-h-[44px]',
  }

  // Variant classes
  const variantClasses = {
    default: 'border-slate-300 bg-white text-slate-900',
    filled: 'border-slate-200 bg-slate-50 text-slate-900',
    outlined: 'border-slate-300 bg-transparent text-slate-900',
  }

  // Error state
  const errorClasses = props.error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''

  // Hover state
  const hoverClasses = !props.disabled ? 'hover:border-slate-400' : ''

  return [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    errorClasses,
    hoverClasses,
  ].join(' ')
})

const displayTextClasses = computed(() => {
  const hasValue = props.multi
    ? selectedItems.value.length > 0
    : modelValue.value !== null && modelValue.value !== undefined
  return hasValue ? 'text-slate-900' : 'text-slate-400'
})

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const selectedItems = computed(() => {
  if (!props.multi) return []

  if (Array.isArray(modelValue.value)) {
    return modelValue.value.map(
      (val) => props.options.find((opt) => getItemValue(opt) === val) || val
    )
  }

  return []
})

const displayText = computed(() => {
  if (props.multi) {
    if (selectedItems.value.length === 0) return props.placeholder
    if (selectedItems.value.length === 1) return getItemLabel(selectedItems.value[0])
    return `${selectedItems.value.length} items selected`
  }

  if (modelValue.value === null || modelValue.value === undefined) {
    return props.placeholder
  }

  const selectedOption = props.options.find((opt) => getItemValue(opt) === modelValue.value)
  return selectedOption ? getItemLabel(selectedOption) : String(modelValue.value)
})

// Get the options array (from URL fetch or props)
const effectiveOptions = computed(() => {
  return props.url ? localOptions.value : props.options
})

const filteredOptions = computed(() => {
  let options = effectiveOptions.value

  // If URL-based and searchable, filtering is handled by API calls
  if (props.url && props.searchable) {
    return options
  }

  // Client-side filtering for local options
  if (props.searchable && searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    options = options.filter((option) => getItemLabel(option).toLowerCase().includes(query))
  }

  return options
})

// Helper functions
const getItemLabel = (item: SelectOption | string): string => {
  if (typeof item === 'string') return item
  return item[props.optionLabel] || String(item)
}

const getItemValue = (item: SelectOption | string): any => {
  if (typeof item === 'string') return item
  return item[props.optionValue] || item
}

const isSelected = (option: SelectOption | string): boolean => {
  const value = getItemValue(option)

  if (props.multi) {
    return Array.isArray(modelValue.value) && modelValue.value.includes(value)
  }

  return modelValue.value === value
}

const optionClasses = (option: SelectOption | string) => {
  const baseClasses = [
    'relative flex cursor-pointer items-center px-4 py-2 text-sm transition-colors duration-150 rounded-sm',
  ]

  const selected = isSelected(option)
  const selectedClasses = selected
    ? 'bg-slate-100 text-slate-900 font-medium'
    : 'text-slate-700 hover:bg-slate-50'

  return [...baseClasses, selectedClasses].join(' ')
}

// Data fetching functions
const fetchOptions = async (searchTerm = '') => {
  if (!props.url) return

  try {
    loading.value = true

    // Build URL with search params
    const url = new URL(props.url, 'http://localhost') // Base URL will be handled by $http
    if (searchTerm) {
      url.searchParams.set(`filter[${props.searchField}]`, searchTerm)
    }

    const response = await $http(props.url, {
      query: searchTerm ? { [`filter[${props.searchField}]`]: searchTerm } : {},
    })

    // Handle different response structures
    let data: any[]
    if (Array.isArray(response)) {
      data = response
    } else if (response.data && Array.isArray(response.data)) {
      data = response.data
    } else if (response.items && Array.isArray(response.items)) {
      data = response.items
    } else {
      console.warn('Unexpected API response structure:', response)
      data = []
    }

    localOptions.value = data
    emit('load', data)
  } catch (error) {
    console.error('Error fetching select options:', error)
    emit('error', error)
    localOptions.value = []
  } finally {
    loading.value = false
  }
}

// Debounced search function
const debouncedFetch = (searchTerm: string) => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }

  debounceTimer.value = setTimeout(() => {
    fetchOptions(searchTerm)
  }, props.debounceMs)
}

// Event handlers
const handleCheckboxChange = (option: SelectOption | string, event: Event) => {
  event.preventDefault()
  selectOption(option)
}

const toggleDropdown = () => {
  if (props.disabled) return

  isOpen.value = !isOpen.value

  // Fetch initial data when opening dropdown if URL is provided
  if (isOpen.value && props.url && localOptions.value.length === 0) {
    fetchOptions()
  }

  if (isOpen.value && props.searchable) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const selectOption = (option: SelectOption | string) => {
  const value = getItemValue(option)
  console.log('option', option)
  console.log('value', value)
  if (props.multi) {
    const currentValues = Array.isArray(modelValue.value) ? [...modelValue.value] : []

    if (isSelected(option)) {
      // Remove from selection
      const index = currentValues.indexOf(value)
      if (index > -1) {
        currentValues.splice(index, 1)
      }
    } else {
      // Add to selection
      currentValues.push(value)
    }

    modelValue.value = currentValues
  } else {
    modelValue.value = value
    isOpen.value = false
  }

  emit('change', modelValue.value)
}

const removeItem = (item: SelectOption | string) => {
  if (!props.multi) return

  const value = getItemValue(item)
  const currentValues = Array.isArray(modelValue.value) ? [...modelValue.value] : []
  const index = currentValues.indexOf(value)

  if (index > -1) {
    currentValues.splice(index, 1)
    modelValue.value = currentValues
    emit('change', modelValue.value)
  }
}

// Click outside handler
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  // Fetch initial data if URL is provided
  if (props.url) {
    fetchOptions()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)

  // Clear debounce timer
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
})

// Watchers
watch(searchQuery, (newValue) => {
  if (props.url && props.searchable) {
    debouncedFetch(newValue)
  }
})

watch(
  () => props.url,
  (newUrl) => {
    if (newUrl) {
      fetchOptions()
    } else {
      localOptions.value = []
    }
  }
)
</script>

<style scoped>
/* Custom scrollbar for dropdown */
:deep(.max-h-60) {
  scrollbar-width: thin;
  scrollbar-color: rgb(203 213 225) transparent;
}

:deep(.max-h-60::-webkit-scrollbar) {
  width: 6px;
}

:deep(.max-h-60::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.max-h-60::-webkit-scrollbar-thumb) {
  background-color: rgb(203 213 225);
  border-radius: 3px;
}

:deep(.max-h-60::-webkit-scrollbar-thumb:hover) {
  background-color: rgb(148 163 184);
}
</style>
