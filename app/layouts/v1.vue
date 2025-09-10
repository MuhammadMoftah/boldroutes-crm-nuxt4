<template>
  <main>
    <layoutsMainHeader @SidebarCollapsing="sidebarCollapse($event)" />

    <section
      class="flex transition-all duration-500 ease-out"
      :class="collapseStatus ? 'px-0' : 'px-[2rem]'"
    >
      <div
        class="transition-all duration-500 ease-out w-[255px]"
        :class="collapseStatus ? 'ml-[-255px]' : 'ml-[0px]'"
      >
        <layoutsSideBar :collapseStatus="collapseStatus" />
      </div>
      <div
        :style="{ width: collapseStatus ? '100%' : 'calc(100% - 255px)' }"
        class="pl-4 transition-all duration-500 ease-out"
      >
        <slot />
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";

// Define options
defineOptions({
  name: "v1",
});

// Composables
const auth = useAuth();

// Reactive data
const collapseStatus = ref(
  auth.$storage.getLocalStorage(`sideBarCollapse`) !== undefined
    ? auth.$storage.getLocalStorage(`sideBarCollapse`)
    : true
);

// Methods
const sidebarCollapse = () => {
  auth.$storage.setLocalStorage("sideBarCollapse", !collapseStatus.value);
  return (collapseStatus.value = !collapseStatus.value);
};

// Lifecycle hooks
onMounted(() => {
  // Note: These methods would need to be updated for Vue 3/Nuxt 4
  // this.$syncStorageVuex("LeadsFields")
  // this.$syncStorageVuex("DealsFields")
});
</script>

<style scoped>
.animate_fadeIn {
  opacity: 0;
  animation: fadeIn 300ms linear;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    width: 0;
  }
  100% {
    opacity: 1;
    width: 24rem;
  }
}
.animate_fadeOut {
  opacity: 1;
  animation: fadeOut 300ms linear;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
    width: 24rem;
  }
  100% {
    opacity: 0;
    width: 0;
  }
}
</style>
