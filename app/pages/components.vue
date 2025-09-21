<template>
  <div class="min-h-screen bg-slate-50 py-8">
    <div class="mx-auto max-w-4xl px-4">
      <h1 class="mb-8 text-3xl font-bold text-slate-900">Theme Input Components</h1>

      <div class="space-y-8">
        <!-- Basic Input Types -->
        <section class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-semibold text-slate-800">Basic Input Types</h2>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ThemeInput
              v-model="formData.text"
              type="text"
              label="Text Input"
              placeholder="Enter your name"
              required
            />

            <ThemeInput
              v-model="formData.email"
              type="email"
              label="Email Address"
              placeholder="your@email.com"
              required
            />

            <ThemeInput
              v-model="formData.password"
              type="password"
              label="Password"
              placeholder="Enter password"
              required
            />

            <ThemeInput
              v-model="formData.number"
              type="number"
              label="Age"
              placeholder="Enter your age"
              :min="0"
              :max="120"
            />

            <ThemeInput
              v-model="formData.textarea"
              type="textarea"
              label="Message"
              placeholder="Enter your message here..."
              :rows="4"
              required
            />
          </div>
        </section>

        <!-- Input Sizes -->
        <section class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-semibold text-slate-800">Input Sizes</h2>
          <div class="space-y-4">
            <ThemeInput
              v-model="formData.small"
              type="text"
              label="Small Input"
              placeholder="Small size"
              size="sm"
            />

            <ThemeInput
              v-model="formData.medium"
              type="text"
              label="Medium Input (Default)"
              placeholder="Medium size"
              size="md"
            />

            <ThemeInput
              v-model="formData.large"
              type="text"
              label="Large Input"
              placeholder="Large size"
              size="lg"
            />
          </div>
        </section>

        <!-- Input Variants -->
        <section class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-semibold text-slate-800">Input Variants</h2>
          <div class="space-y-4">
            <ThemeInput
              v-model="formData.default"
              type="text"
              label="Default Variant"
              placeholder="Default styling"
              variant="default"
            />

            <ThemeInput
              v-model="formData.filled"
              type="text"
              label="Filled Variant"
              placeholder="Filled background"
              variant="filled"
            />

            <ThemeInput
              v-model="formData.outlined"
              type="text"
              label="Outlined Variant"
              placeholder="Outlined border"
              variant="outlined"
            />
          </div>
        </section>

        <!-- Input States -->
        <section class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-semibold text-slate-800">Input States</h2>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <ThemeInput
              v-model="formData.normal"
              type="text"
              label="Normal State"
              placeholder="Normal input"
            />

            <ThemeInput
              v-model="formData.disabled"
              type="text"
              label="Disabled State"
              placeholder="Disabled input"
              disabled
            />

            <ThemeInput
              v-model="formData.readonly"
              type="text"
              label="Readonly State"
              placeholder="Readonly input"
              readonly
            />

            <ThemeInput
              v-model="formData.error"
              type="text"
              label="Error State"
              placeholder="Input with error"
              error="This field is required"
            />
          </div>
        </section>

        <!-- Input with Help Text -->
        <section class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-semibold text-slate-800">Input with Help Text</h2>
          <div class="space-y-4">
            <ThemeInput
              v-model="formData.username"
              type="text"
              label="Username"
              placeholder="Enter username"
              help-text="Username must be at least 3 characters long"
              :minlength="3"
            />

            <ThemeInput
              v-model="formData.phone"
              type="tel"
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              help-text="Include country code for international numbers"
              pattern="[0-9+\-\s\(\)]+"
            />
          </div>
        </section>

        <!-- Phone Input Component -->
        <section class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-semibold text-slate-800">Phone Input Component</h2>
          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ThemePhoneInput
                v-model="formData.phoneUS"
                label="US Phone Number"
                placeholder="(555) 123-4567"
                default-country="US"
                required
                help-text="Enter your US phone number"
              />

              <ThemePhoneInput
                v-model="formData.phoneUK"
                label="UK Phone Number"
                placeholder="20 7946 0958"
                default-country="GB"
                help-text="Enter your UK phone number"
              />

              <ThemePhoneInput
                v-model="formData.phoneDE"
                label="German Phone Number"
                placeholder="30 12345678"
                default-country="DE"
                help-text="Enter your German phone number"
              />

              <ThemePhoneInput
                v-model="formData.phoneFR"
                label="French Phone Number"
                placeholder="1 23 45 67 89"
                default-country="FR"
                help-text="Enter your French phone number"
              />
            </div>

            <div class="space-y-4">
              <ThemePhoneInput
                v-model="formData.phoneInternational"
                label="International Phone Number"
                placeholder="Select country and enter number"
                help-text="Choose any country and enter the phone number"
                @country-change="onCountryChange"
              />

              <ThemePhoneInput
                v-model="formData.phoneError"
                label="Phone with Error"
                placeholder="(555) 123-4567"
                default-country="US"
                error="Please enter a valid phone number"
              />

              <ThemePhoneInput
                v-model="formData.phoneDisabled"
                label="Disabled Phone Input"
                placeholder="(555) 123-4567"
                default-country="US"
                disabled
              />
            </div>
          </div>
        </section>

        <!-- Form Data Display -->
        <section class="rounded-lg bg-white p-6 shadow-sm">
          <h2 class="mb-6 text-xl font-semibold text-slate-800">Form Data</h2>
          <pre class="overflow-auto rounded-lg bg-slate-100 p-4 text-sm text-slate-700">{{
            JSON.stringify(formData, null, 2)
          }}</pre>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

// Form data for testing
const formData = reactive({
  text: '',
  email: '',
  password: '',
  number: undefined as number | undefined,
  textarea: '',
  small: '',
  medium: '',
  large: '',
  default: '',
  filled: '',
  outlined: '',
  normal: '',
  disabled: 'This is disabled',
  readonly: 'This is readonly',
  error: '',
  username: '',
  phone: '',
  phoneUS: '',
  phoneUK: '',
  phoneDE: '',
  phoneFR: '',
  phoneInternational: '',
  phoneError: '',
  phoneDisabled: '+1 (555) 123-4567',
})

// Country change handler
const onCountryChange = (country: any) => {
  console.log('Country changed to:', country.name, country.code)
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
