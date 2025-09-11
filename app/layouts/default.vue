<template>
  <div class="bg-slate-50">
    <ThemeMainHeader />

    <section
      class="flex transition-all duration-500 ease-out"
      :class="isHidden ? 'px-0' : 'px-[2rem]'"
    >
      <div
        class="w-[255px] transition-all duration-500 ease-out"
        :class="isHidden ? 'ml-[-255px]' : 'ml-[0px]'"
      >
        <aside
          class="mt-4 grid h-[calc(100vh-100px)] place-items-center rounded-lg bg-slate-200 text-lg font-bold text-slate-600"
        >
          Sidebar here ...
        </aside>
      </div>
      <div
        :style="{ width: isHidden ? '100%' : 'calc(100% - 255px)' }"
        class="px-4 transition-all duration-500 ease-out"
      >
        <slot />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const isHidden = ref(false)

// const toggleSidebar = () => {
//   isHidden.value = !isHidden.value
// }
</script>

<style></style>
