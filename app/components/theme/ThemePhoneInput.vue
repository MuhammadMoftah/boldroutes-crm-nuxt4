<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="mb-1 block text-sm font-medium text-slate-700">
      {{ label }}
      <span v-if="required" class="ms-1 text-red-500">*</span>
    </label>

    <!-- Phone Input Container -->
    <div ref="phoneContainer" class="phone-input-container relative">
      <div
        class="flex rounded-lg border border-slate-300 bg-white transition-all duration-200 ease-in-out focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-500"
        :class="errorClasses"
      >
        <!-- Country Code Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:outline-none focus:ring-inset"
            @click="toggleDropdown"
            :disabled="disabled"
          >
            <span class="flag-emoji text-lg">{{ selectedCountry.flag }}</span>
            <span class="font-medium">{{ selectedCountry.code }}</span>
            <svg
              class="h-4 w-4 transition-transform duration-200"
              :class="{ 'rotate-180': isDropdownOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Country Dropdown -->
          <div
            v-if="isDropdownOpen"
            class="country-dropdown absolute top-full left-0 z-50 mt-1 max-h-60 w-64 overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg"
          >
            <!-- Search Input -->
            <div class="p-2">
              <input
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search countries..."
                class="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
                @click.stop
              />
            </div>

            <!-- Country List -->
            <div class="max-h-48 overflow-auto">
              <button
                v-for="country in filteredCountries"
                :key="country.code"
                type="button"
                class="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-slate-50"
                :class="{ 'bg-slate-100': country.code === selectedCountry.code }"
                @click="selectCountry(country)"
              >
                <span class="flag-emoji text-lg">{{ country.flag }}</span>
                <span class="flex-1 font-medium">{{ country.name }}</span>
                <span class="text-slate-500">{{ country.code }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Phone Number Input -->
        <input
          :id="inputId"
          ref="phoneInput"
          type="tel"
          :value="formattedPhoneNumber"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          class="flex-1 border-0 bg-transparent px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:ring-0 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
          @input="handleInput"
          @blur="handleBlur"
          @focus="handleFocus"
          @change="handleChange"
          @keydown="handleKeydown"
          @keyup="handleKeyup"
          v-bind="$attrs"
        />
      </div>

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
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'

// Country Interface
interface Country {
  code: string
  name: string
  flag: string
  dialCode: string
  pattern: RegExp
  placeholder: string
}

// Props Interface
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: string
  helpText?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined'
  defaultCountry?: string
  autocomplete?: string
  autofocus?: boolean
}

// Emits Interface
interface Emits {
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  change: [event: Event]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
  'country-change': [country: Country]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'default',
  defaultCountry: 'US',
  autocomplete: 'tel',
})

const emit = defineEmits<Emits>()

// Country Data
const countries: Country[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    dialCode: '+1',
    pattern: /^\+1[2-9]\d{2}[2-9]\d{2}\d{4}$/,
    placeholder: '(555) 123-4567',
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    dialCode: '+1',
    pattern: /^\+1[2-9]\d{2}[2-9]\d{2}\d{4}$/,
    placeholder: '(555) 123-4567',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    dialCode: '+44',
    pattern: /^\+44\d{10}$/,
    placeholder: '20 7946 0958',
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    dialCode: '+49',
    pattern: /^\+49\d{10,11}$/,
    placeholder: '30 12345678',
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    dialCode: '+33',
    pattern: /^\+33\d{9}$/,
    placeholder: '1 23 45 67 89',
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    dialCode: '+39',
    pattern: /^\+39\d{9,10}$/,
    placeholder: '312 345 6789',
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    dialCode: '+34',
    pattern: /^\+34\d{9}$/,
    placeholder: '612 345 678',
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    dialCode: '+61',
    pattern: /^\+61\d{9}$/,
    placeholder: '412 345 678',
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    dialCode: '+81',
    pattern: /^\+81\d{10,11}$/,
    placeholder: '90-1234-5678',
  },
  {
    code: 'CN',
    name: 'China',
    flag: '🇨🇳',
    dialCode: '+86',
    pattern: /^\+86\d{11}$/,
    placeholder: '138 0013 8000',
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    dialCode: '+91',
    pattern: /^\+91\d{10}$/,
    placeholder: '98765 43210',
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    dialCode: '+55',
    pattern: /^\+55\d{10,11}$/,
    placeholder: '(11) 99999-9999',
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    dialCode: '+52',
    pattern: /^\+52\d{10}$/,
    placeholder: '55 1234 5678',
  },
  {
    code: 'RU',
    name: 'Russia',
    flag: '🇷🇺',
    dialCode: '+7',
    pattern: /^\+7\d{10}$/,
    placeholder: '912 345-67-89',
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    dialCode: '+82',
    pattern: /^\+82\d{9,10}$/,
    placeholder: '10-1234-5678',
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    dialCode: '+65',
    pattern: /^\+65\d{8}$/,
    placeholder: '8123 4567',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    dialCode: '+971',
    pattern: /^\+971\d{9}$/,
    placeholder: '50 123 4567',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    dialCode: '+966',
    pattern: /^\+966\d{9}$/,
    placeholder: '50 123 4567',
  },
  {
    code: 'EG',
    name: 'Egypt',
    flag: '🇪🇬',
    dialCode: '+20',
    pattern: /^\+20\d{10}$/,
    placeholder: '10 1234 5678',
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    dialCode: '+27',
    pattern: /^\+27\d{9}$/,
    placeholder: '82 123 4567',
  },
]

// Reactive State
const inputId = ref(`phone-input-${Math.random().toString(36).substr(2, 9)}`)
const isDropdownOpen = ref(false)
const searchQuery = ref('')
const phoneInput = ref<HTMLInputElement>()
const searchInput = ref<HTMLInputElement>()
const phoneContainer = ref<HTMLDivElement>()

// Computed Properties
const selectedCountry = ref<Country>(
  (countries.find((c) => c.code === props.defaultCountry) || countries[0]) as Country
)

const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries
  return countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      country.dialCode.includes(searchQuery.value)
  )
})

const formattedPhoneNumber = computed(() => {
  if (!props.modelValue) return ''

  // Remove all non-digit characters except +
  const cleaned = props.modelValue.replace(/[^\d+]/g, '')

  // If it starts with the country code, format accordingly
  if (cleaned.startsWith(selectedCountry.value.dialCode)) {
    const number = cleaned.substring(selectedCountry.value.dialCode.length)
    return formatPhoneNumber(number, selectedCountry.value.code)
  }

  return cleaned
})

const errorClasses = computed(() => {
  return props.error ? 'border-red-300 focus-within:ring-red-500 focus-within:border-red-500' : ''
})

// Methods
const toggleDropdown = () => {
  if (props.disabled) return
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) {
    setTimeout(() => {
      searchInput.value?.focus()
    }, 100)
  }
}

const selectCountry = (country: Country) => {
  selectedCountry.value = country
  isDropdownOpen.value = false
  searchQuery.value = ''
  emit('country-change', country)

  // Focus back to phone input
  setTimeout(() => {
    phoneInput.value?.focus()
  }, 100)
}

const formatPhoneNumber = (number: string, countryCode: string): string => {
  const cleanNumber = number.replace(/\D/g, '')

  switch (countryCode) {
    case 'US':
    case 'CA':
      if (cleanNumber.length >= 6) {
        return `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6, 10)}`
      } else if (cleanNumber.length >= 3) {
        return `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(3)}`
      }
      return cleanNumber

    case 'GB':
      if (cleanNumber.length >= 4) {
        return `${cleanNumber.slice(0, 2)} ${cleanNumber.slice(2, 6)} ${cleanNumber.slice(6, 10)}`
      }
      return cleanNumber

    case 'DE':
      if (cleanNumber.length >= 4) {
        return `${cleanNumber.slice(0, 3)} ${cleanNumber.slice(3, 6)} ${cleanNumber.slice(6)}`
      }
      return cleanNumber

    case 'FR':
      if (cleanNumber.length >= 2) {
        return `${cleanNumber.slice(0, 1)} ${cleanNumber.slice(1, 3)} ${cleanNumber.slice(3, 5)} ${cleanNumber.slice(5, 7)} ${cleanNumber.slice(7, 9)}`
      }
      return cleanNumber

    default:
      return cleanNumber
  }
}

const parsePhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  return `${selectedCountry.value.dialCode}${cleaned}`
}

const validatePhoneNumber = (value: string): boolean => {
  if (!value) return !props.required
  return selectedCountry.value.pattern.test(value)
}

// Event Handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = parsePhoneNumber(target.value)
  emit('update:modelValue', formatted)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleChange = (event: Event) => {
  emit('change', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

// Click outside to close dropdown
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (phoneContainer.value && !phoneContainer.value.contains(target)) {
    isDropdownOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch for country changes
watch(selectedCountry, (newCountry) => {
  if (props.modelValue) {
    const currentNumber = props.modelValue.replace(selectedCountry.value.dialCode, '')
    const newFormatted = `${newCountry.dialCode}${currentNumber}`
    emit('update:modelValue', newFormatted)
  }
})
</script>

<style scoped>
/* Additional custom styles if needed */
.phone-input-container {
  position: relative;
}

/* Ensure flags display properly */
.flag-emoji {
  font-family:
    'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', 'Android Emoji', 'EmojiSymbols',
    'EmojiOne Mozilla', 'Twemoji Mozilla', 'Segoe UI Symbol', sans-serif;
  font-size: 1.2em;
  line-height: 1;
  display: inline-block;
}

/* Ensure dropdown is properly positioned */
.country-dropdown {
  z-index: 9999;
}
</style>
