<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="mb-1 block text-sm font-medium text-slate-700">
      {{ label }}
      <span v-if="required" class="ms-1 text-red-500">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Text Input -->
      <input
        v-if="type !== 'textarea'"
        :id="inputId"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :minlength="minlength"
        :maxlength="maxlength"
        :pattern="pattern"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @change="handleChange"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
        v-bind="$attrs"
      />

      <!-- Textarea -->
      <textarea
        v-else
        :id="inputId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :minlength="minlength"
        :maxlength="maxlength"
        :rows="rows"
        :cols="cols"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :class="textareaClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @change="handleChange"
        @keydown="handleKeydown"
        @keyup="handleKeyup"
        v-bind="$attrs"
      ></textarea>

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
import { computed, ref } from 'vue'

// Input Types
type InputType = 'text' | 'number' | 'email' | 'password' | 'textarea' | 'tel'

// Props Interface
interface Props {
  modelValue?: string | number
  type?: InputType
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: string
  helpText?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined'

  // HTML Input Attributes
  min?: number | string
  max?: number | string
  step?: number | string
  minlength?: number
  maxlength?: number
  pattern?: string
  autocomplete?: string
  autofocus?: boolean

  // Textarea specific
  rows?: number
  cols?: number
}

// Emits Interface
interface Emits {
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  change: [event: Event]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  variant: 'default',
  rows: 3,
  cols: 50,
})

const emit = defineEmits<Emits>()

// Generate unique ID for accessibility
const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

// Computed input type for HTML input element
const inputType = computed(() => {
  if (props.type === 'textarea') return 'text'
  return props.type
})

// Computed classes for input
const inputClasses = computed(() => {
  const baseClasses = [
    'block w-full rounded-lg border transition-all duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500',
    'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
    'read-only:bg-slate-50 read-only:cursor-default',
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base',
  }

  // Variant classes
  const variantClasses = {
    default: 'border-slate-300 bg-white text-slate-900 placeholder-slate-400',
    filled: 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-500',
    outlined: 'border-slate-300 bg-transparent text-slate-900 placeholder-slate-400',
  }

  // Error state
  const errorClasses = props.error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''

  return [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    errorClasses,
  ].join(' ')
})

// Computed classes for textarea
const textareaClasses = computed(() => {
  const baseClasses = [
    'block w-full rounded-lg border transition-all duration-200 ease-in-out resize-vertical',
    'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500',
    'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
    'read-only:bg-slate-50 read-only:cursor-default',
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base',
  }

  // Variant classes
  const variantClasses = {
    default: 'border-slate-300 bg-white text-slate-900 placeholder-slate-400',
    filled: 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-500',
    outlined: 'border-slate-300 bg-transparent text-slate-900 placeholder-slate-400',
  }

  // Error state
  const errorClasses = props.error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''

  return [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    errorClasses,
  ].join(' ')
})

// Event Handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
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
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
