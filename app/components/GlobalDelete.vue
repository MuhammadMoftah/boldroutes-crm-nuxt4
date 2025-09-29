<template>
  <ThemeModal>
    <template #modal-title> Global Modal</template>

    <template #modal-body>
      <section class="grid gap-2">
        <p class="py-5 text-sm font-semibold text-slate-600">
          You are about to Delete
          <span class="font-bold"> Name Here</span>
        </p>
      </section>
    </template>

    <template #modal-footer>
      <footer class="modal-action gap-2">
        <!-- :disabled="!title || loading" -->
        <button class="btn btn-theme h-9" @click="submit()">
          <span v-if="loading" class="loading loading-spinner"></span>
          Submit
        </button>
        <button @click="$modal.value = ''" class="btn btn-ghost h-9 font-medium text-slate-700">
          Close
        </button>
      </footer>
    </template>
  </ThemeModal>
</template>

<script lang="ts" setup>
const props = defineProps(['activeData'])
const date = ref('')
const user = ref({})
const time = ref('')
const dateTime = computed(() => date.value + ' ' + time.value)
const loading = ref(false)

const submit = () => {
  loading.value = true
  $http('/admin/general-test', {
    method: 'post',
    body: {
      user_id: props.activeData.id,
      date: dateTime.value,
      committee_id: user.value?.id,
    },
  })
    .then(() => {
      loading.value = false
      // useStudentStore().fetchData()
      useToast().showSuccess('Operation completed successfully')
      useNuxtApp().$closeModal()
    })
    .catch((err) => {
      loading.value = false
      useToast().errorHandler(err)
    })
}
</script>
<style scoped>
:deep(.modal-box) {
  overflow: visible;
}
</style>
