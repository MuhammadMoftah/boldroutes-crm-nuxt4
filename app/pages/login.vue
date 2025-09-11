<template>
  <div class="space-y-6">
    <form class="flex w-full flex-col space-y-6" @submit.prevent="login">
      <h3 class="text-center">Login to your account</h3>
      <input
        type="email"
        placeholder="Enter your email address"
        v-model="form.email"
        class="input input-bordered w-full"
      />
      <input
        type="password"
        placeholder="Enter your password"
        v-model="form.password"
        class="input input-bordered w-full"
      />
      <button type="submit" class="btn btn-primary w-full" v-auto-animate>
        <IconsSpinnerIcon v-if="loading" classes="w-5 h-5" />
        Login
      </button>
    </form>

    <div class="flex items-center justify-center space-x-2 text-xs">
      <div class="text-xs">
        <p>Can’t login ?</p>
      </div>
      <div>
        <IconsDotIcon />
      </div>
      <div class="text-xs">
        <NuxtLink class="hover:text-black-600" to="/forgot-password">Reset your password</NuxtLink>
      </div>
    </div>

    <div
      class="mt-2 flex items-center justify-center gap-2 border-t border-zinc-800 pt-2 text-zinc-600"
    >
      <a
        target="_blank"
        href="https://play.google.com/store/apps/details?id=com.boldroutes.app"
        class="btn btn-sm btn-circle btn-ghost hover:bg-zinc-800"
      >
        <IconsAndriodIcon class="h-6 w-6" />
      </a>
      <a
        target="_blank"
        href="https://apps.apple.com/eg/app/your-bold-routes/id6450875094"
        class="btn btn-sm btn-circle btn-ghost hover:bg-zinc-800"
      >
        <IconsAppleIcon class="h-6 w-6" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const form = reactive({
  email: 'mohamed.selim@boldroutes.com',
  password: 'password',
})

const router = useRouter()
const loading = ref(false)
const { signIn } = useAuth()
const login = async () => {
  loading.value = true
  try {
    await signIn(
      {
        ...form,
      },
      {
        redirect: true,
        callbackUrl: '/',
      }
    )
    useToast().showSuccess('Login successful')
    loading.value = false
  } catch (err) {
    loading.value = false
    if (err?.response?.status == 403) useToast().errorHandler(err)
  }
}
</script>

<style scoped>
/* If you want to customize input styles beyond Tailwind's defaults, add here */
</style>
