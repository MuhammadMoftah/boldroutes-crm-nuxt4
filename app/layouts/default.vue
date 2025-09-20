<template>
  <div class="bg-slate-50">
    <ThemeMainHeader />

    <section
      class="flex transition-all duration-500 ease-out"
      :class="isHidden ? 'px-0' : 'px-[2rem]'"
    >
      <!-- Sidebar wrapper -->
      <div
        class="w-[255px] transition-all duration-500 ease-out"
        :class="isHidden ? 'ml-[-255px]' : 'ml-[0px]'"
      >
        <!-- Use your real SideBar component here -->
        <SideBar :collapseStatus="isHidden" />
      </div> <!-- ✅ this was missing -->

      <!-- Main content -->
      <div
        :style="{ width: isHidden ? '100%' : 'calc(100% - 255px)' }"
        class="px-4 transition-all duration-500 ease-out"
      >
        <slot />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SideBar from '~/components/theme/SideBar.vue'

const isHidden = ref(false)
</script>
